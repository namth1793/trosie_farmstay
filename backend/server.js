import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDB } from './db/init.js';
import roomsRouter from './routes/rooms.js';
import bookingsRouter from './routes/bookings.js';
import contactsRouter from './routes/contacts.js';
import blogRouter from './routes/blog.js';
import productsRouter from './routes/products.js';
import adminRouter from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 5023;

const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:5174', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) return cb(null, true);
    cb(new Error('CORS: origin not allowed'));
  },
}));
app.use(express.json());

initDB();

app.use('/api/rooms', roomsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/products', productsRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`🌿 Chay Lap Farmstay API: http://localhost:${PORT}`);
});
