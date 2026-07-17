import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB } from './db.js';

// Route imports
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import buildRoutes from './routes/builds.js';
import achievementRoutes from './routes/achievements.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', // Vite dev server
  credentials: true,
}));
app.use(express.json());

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
// The component catalog and quizzes live in the frontend code, so there are no
// /api/components or /api/quiz endpoints — the database only stores users,
// their saved builds, and their progress/achievements.
app.use('/api/auth',         authRoutes);
app.use('/api/users',        userRoutes);
app.use('/api/builds',       buildRoutes);
app.use('/api/achievements', achievementRoutes);

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ─── Start ─────────────────────────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀  PC Simulator API running on http://localhost:${PORT}`);
  });
});
