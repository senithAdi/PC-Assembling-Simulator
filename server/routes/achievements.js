import express from 'express';
import pool from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// ─── GET /api/achievements ───────────────────────────────────────────────────
// Returns all achievement definitions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM Achievements ORDER BY xp_reward DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get achievements error:', err);
    res.status(500).json({ error: 'Failed to fetch achievements.' });
  }
});

// ─── GET /api/achievements/:userId ──────────────────────────────────────────
// Returns achievements unlocked by a specific student
router.get('/:userId', authenticate, async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (req.user.userId !== userId) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  try {
    const result = await pool.query(
      `SELECT a.achievement_id, a.title, a.description, a.xp_reward,
              a.badge_image, ua.unlocked_at
       FROM Achievements a
       JOIN UserAchievements ua ON a.achievement_id = ua.achievement_id
       WHERE ua.user_id = $1
       ORDER BY ua.unlocked_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Get user achievements error:', err);
    res.status(500).json({ error: 'Failed to fetch achievements.' });
  }
});

// ─── POST /api/achievements/unlock ──────────────────────────────────────────
// Unlocks an achievement for a student (called by the server after a build)
router.post('/unlock', authenticate, async (req, res) => {
  const { achievement_id } = req.body;
  const userId = req.user.userId;

  if (!achievement_id) {
    return res.status(400).json({ error: 'achievement_id is required.' });
  }

  try {
    // Use INSERT ... ON CONFLICT DO NOTHING to prevent duplicate unlocks
    await pool.query(
      `INSERT INTO UserAchievements (user_id, achievement_id)
       VALUES ($1, $2)
       ON CONFLICT ON CONSTRAINT unique_user_achievement DO NOTHING`,
      [userId, achievement_id]
    );

    // Get achievement details and award its XP
    const achievement = await pool.query(
      'SELECT * FROM Achievements WHERE achievement_id = $1',
      [achievement_id]
    );

    if (achievement.rows.length > 0) {
      await pool.query(
        'UPDATE Users SET xp = xp + $1, total_points = total_points + $1 WHERE user_id = $2',
        [achievement.rows[0].xp_reward, userId]
      );
    }

    res.json({ unlocked: true, achievement: achievement.rows[0] || null });
  } catch (err) {
    console.error('Unlock achievement error:', err);
    res.status(500).json({ error: 'Failed to unlock achievement.' });
  }
});

export default router;
