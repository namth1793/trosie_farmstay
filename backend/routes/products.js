import express from 'express';
import { getDB } from '../db/init.js';

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM products ORDER BY id').all();
  rows.forEach(p => { try { p.tags = JSON.parse(p.tags); } catch { p.tags = []; } });
  res.json(rows);
});

router.get('/:slug', (req, res) => {
  const db = getDB();
  const p = db.prepare('SELECT * FROM products WHERE slug = ?').get(req.params.slug);
  if (!p) return res.status(404).json({ error: 'Not found' });
  try { p.tags = JSON.parse(p.tags); } catch { p.tags = []; }
  res.json(p);
});

export default router;
