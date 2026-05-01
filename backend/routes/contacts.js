import express from 'express';
import { getDB } from '../db/init.js';

const router = express.Router();

router.post('/', (req, res) => {
  const db = getDB();
  const { full_name, email, phone, subject, message } = req.body;
  if (!full_name || !email || !message)
    return res.status(400).json({ error: 'Vui long dien day du thong tin bat buoc' });

  db.prepare(`
    INSERT INTO contacts (full_name,email,phone,subject,message)
    VALUES (?,?,?,?,?)
  `).run(full_name, email, phone||null, subject||null, message);

  res.status(201).json({ success: true, message: 'Tin nhan da duoc gui! Chung toi se phan hoi trong 24 gio.' });
});

router.get('/', (req, res) => {
  const db = getDB();
  res.json(db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all());
});

export default router;
