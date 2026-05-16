import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';
import { getDB } from '../db/init.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function slugify(text) {
  return text
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'trosie-blog', resource_type: 'image' },
      (err, result) => err ? reject(err) : resolve(result.secure_url)
    );
    stream.end(buffer);
  });
}

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password !== (process.env.ADMIN_PASSWORD || 'trosie2025'))
    return res.status(401).json({ error: 'Sai mật khẩu' });
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'trosie_secret', { expiresIn: '7d' });
  res.json({ token });
});

// GET /api/admin/blog
router.get('/blog', requireAuth, (req, res) => {
  const db = getDB();
  res.json(db.prepare('SELECT * FROM blog_posts ORDER BY published_at DESC').all());
});

// POST /api/admin/blog
router.post('/blog', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const db = getDB();
    const { title, excerpt, content, category, author } = req.body;
    let slug = req.body.slug?.trim() || slugify(title);
    if (!slug) slug = 'bai-viet-' + Date.now();

    const exists = db.prepare('SELECT id FROM blog_posts WHERE slug=?').get(slug);
    if (exists) slug = slug + '-' + Date.now();

    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const result = db.prepare(`
      INSERT INTO blog_posts (title, slug, excerpt, content, image, category, author, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).run(title, slug, excerpt || '', content || '', imageUrl,
           category || 'Tin tức', author || 'Trosie Garden');

    res.json({ id: result.lastInsertRowid, slug });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/blog/:id
router.put('/blog/:id', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const db = getDB();
    const post = db.prepare('SELECT * FROM blog_posts WHERE id=?').get(req.params.id);
    if (!post) return res.status(404).json({ error: 'Không tìm thấy bài viết' });

    const { title, excerpt, content, category, author } = req.body;
    const slug = req.body.slug?.trim() || post.slug;

    let imageUrl = post.image;
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    db.prepare(`
      UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, image=?, category=?, author=? WHERE id=?
    `).run(title, slug, excerpt || '', content || '', imageUrl,
           category || post.category, author || post.author, req.params.id);

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/blog/:id
router.delete('/blog/:id', requireAuth, (req, res) => {
  getDB().prepare('DELETE FROM blog_posts WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

// ── CONTACTS ─────────────────────────────────────────

// GET /api/admin/contacts
router.get('/contacts', requireAuth, (req, res) => {
  res.json(getDB().prepare('SELECT * FROM contacts ORDER BY is_read ASC, created_at DESC').all());
});

// PATCH /api/admin/contacts/:id/read
router.patch('/contacts/:id/read', requireAuth, (req, res) => {
  getDB().prepare('UPDATE contacts SET is_read=1 WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

// DELETE /api/admin/contacts/:id
router.delete('/contacts/:id', requireAuth, (req, res) => {
  getDB().prepare('DELETE FROM contacts WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

// ── BOOKINGS ─────────────────────────────────────────

// GET /api/admin/bookings
router.get('/bookings', requireAuth, (req, res) => {
  res.json(getDB().prepare('SELECT * FROM bookings ORDER BY created_at DESC').all());
});

// PATCH /api/admin/bookings/:id/status
router.patch('/bookings/:id/status', requireAuth, (req, res) => {
  const { status } = req.body;
  if (!['pending', 'confirmed', 'cancelled'].includes(status))
    return res.status(400).json({ error: 'Trạng thái không hợp lệ' });
  getDB().prepare('UPDATE bookings SET status=? WHERE id=?').run(status, req.params.id);
  res.json({ ok: true });
});

// DELETE /api/admin/bookings/:id
router.delete('/bookings/:id', requireAuth, (req, res) => {
  getDB().prepare('DELETE FROM bookings WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

// ── SITE CONTENT ─────────────────────────────────

// GET /api/admin/content?lang=vi
router.get('/content', requireAuth, (req, res) => {
  const lang = req.query.lang || 'vi';
  const rows = getDB().prepare(
    'SELECT section, key, value FROM site_content WHERE lang=?'
  ).all(lang);
  const result = {};
  for (const { section, key, value } of rows) {
    if (!result[section]) result[section] = {};
    result[section][key] = value;
  }
  res.json(result);
});

// PUT /api/admin/content/:section
router.put('/content/:section', requireAuth, (req, res) => {
  const db = getDB();
  const { section } = req.params;
  const { lang = 'vi', updates } = req.body;
  if (!updates || typeof updates !== 'object')
    return res.status(400).json({ error: 'updates required' });

  const upsert = db.prepare(`
    INSERT INTO site_content (section, key, lang, value) VALUES (?,?,?,?)
    ON CONFLICT(section,key,lang) DO UPDATE SET value=excluded.value
  `);

  const runAll = db.transaction(() => {
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === undefined) continue;
      const v = typeof value === 'string' ? value : JSON.stringify(value);
      upsert.run(section, key, lang, v);
    }
  });
  runAll();
  res.json({ ok: true });
});

export default router;
