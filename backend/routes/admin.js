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

export default router;
