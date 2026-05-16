import express from 'express';
import { getDB } from '../db/init.js';

const router = express.Router();

// GET /api/content?lang=vi  — public, returns all DB overrides
router.get('/', (req, res) => {
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

export default router;
