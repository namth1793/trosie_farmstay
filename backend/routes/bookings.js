import express from 'express';
import { getDB } from '../db/init.js';

const router = express.Router();

router.post('/', (req, res) => {
  const db = getDB();
  const { room_id, room_name, full_name, email, phone, check_in, check_out, guests, special_requests } = req.body;
  if (!full_name || !email || !check_in || !check_out)
    return res.status(400).json({ error: 'Vui long dien day du thong tin bat buoc' });

  const result = db.prepare(`
    INSERT INTO bookings (room_id,room_name,full_name,email,phone,check_in,check_out,guests,special_requests)
    VALUES (?,?,?,?,?,?,?,?,?)
  `).run(room_id||null, room_name||null, full_name, email, phone||null, check_in, check_out, guests||2, special_requests||null);

  res.status(201).json({
    success: true,
    booking_id: result.lastInsertRowid,
    message: 'Yeu cau dat phong da duoc ghi nhan. Chung toi se lien he xac nhan som nhat!'
  });
});

router.get('/', (req, res) => {
  const db = getDB();
  res.json(db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all());
});

export default router;
