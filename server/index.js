import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Route imports
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import buildRoutes from './routes/builds.js';
import componentRoutes from './routes/components.js';
import quizRoutes from './routes/quiz.js';
import achievementRoutes from './routes/achievements.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true,
}));
app.use(express.json());

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',         authRoutes);
app.use('/api/users',        userRoutes);
app.use('/api/builds',       buildRoutes);
app.use('/api/components',   componentRoutes);
app.use('/api/quiz',         quizRoutes);
app.use('/api/achievements', achievementRoutes);

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  PC Simulator API running on http://localhost:${PORT}`);
});
