import express from 'express';
import { getDB } from '../db/init.js';

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDB();
  const rooms = db.prepare('SELECT * FROM rooms WHERE available=1 ORDER BY price DESC').all();
  rooms.forEach(r => {
    r.amenities = JSON.parse(r.amenities || '[]');
    r.images = JSON.parse(r.images || '[]');
  });
  res.json(rooms);
});

router.get('/:slug', (req, res) => {
  const db = getDB();
  const room = db.prepare('SELECT * FROM rooms WHERE slug=?').get(req.params.slug);
  if (!room) return res.status(404).json({ error: 'Khong tim thay phong' });
  room.amenities = JSON.parse(room.amenities || '[]');
  room.images = JSON.parse(room.images || '[]');
  res.json(room);
});

export default router;
