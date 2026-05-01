import express from 'express';
import cors from 'cors';
import { initDB } from './db/init.js';
import roomsRouter from './routes/rooms.js';
import bookingsRouter from './routes/bookings.js';
import contactsRouter from './routes/contacts.js';
import blogRouter from './routes/blog.js';

const app = express();
const PORT = 5023;

app.use(cors());
app.use(express.json());

initDB();

app.use('/api/rooms', roomsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/blog', blogRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`🌿 Chay Lap Farmstay API: http://localhost:${PORT}`);
});
