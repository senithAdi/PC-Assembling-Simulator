import express from 'express';
import pool from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// ─── GET /api/users/:id ──────────────────────────────────────────────────────
// Returns the full profile of a student including XP, level, and points
router.get('/:id', authenticate, async (req, res) => {
  const userId = parseInt(req.params.id);

  if (req.user.userId !== userId) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  try {
    const result = await pool.query(
      `SELECT user_id, username, email, level, xp, total_points, created_at
       FROM Users WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
});

// ─── PATCH /api/users/:id/xp ─────────────────────────────────────────────────
// Awards XP and automatically levels up the student
router.patch('/:id/xp', authenticate, async (req, res) => {
  const userId = parseInt(req.params.id);
  const { xp_to_add } = req.body;

  if (req.user.userId !== userId) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  try {
    // Get current XP
    const current = await pool.query(
      'SELECT xp, level FROM Users WHERE user_id = $1',
      [userId]
    );

    if (current.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const { xp, level } = current.rows[0];
    const newXp = xp + (xp_to_add || 0);

    // Level up threshold: every 500 XP = 1 level
    const newLevel = Math.floor(newXp / 500) + 1;

    const result = await pool.query(
      `UPDATE Users SET xp = $1, level = $2, total_points = total_points + $3
       WHERE user_id = $4
       RETURNING user_id, username, level, xp, total_points`,
      [newXp, newLevel, xp_to_add || 0, userId]
    );

    res.json({
      user: result.rows[0],
      leveledUp: newLevel > level,
    });
  } catch (err) {
    console.error('XP update error:', err);
    res.status(500).json({ error: 'Failed to update XP.' });
  }
});

export default router;
