import express from 'express';
import { getDB } from '../db/init.js';

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDB();
  const { category, limit } = req.query;
  let sql = 'SELECT id,title,slug,excerpt,image,category,author,published_at FROM blog_posts';
  const params = [];
  if (category) { sql += ' WHERE category=?'; params.push(category); }
  sql += ' ORDER BY published_at DESC';
  if (limit) { sql += ' LIMIT ?'; params.push(parseInt(limit)); }
  res.json(db.prepare(sql).all(...params));
});

router.get('/:slug', (req, res) => {
  const db = getDB();
  const post = db.prepare('SELECT * FROM blog_posts WHERE slug=?').get(req.params.slug);
  if (!post) return res.status(404).json({ error: 'Khong tim thay bai viet' });
  const related = db.prepare('SELECT id,title,slug,image,category,published_at FROM blog_posts WHERE slug!=? LIMIT 3').all(req.params.slug);
  res.json({ ...post, related });
});

export default router;
