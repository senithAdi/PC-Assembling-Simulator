import express from 'express';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';
import { ACHIEVEMENTS, ACHIEVEMENTS_BY_CODE } from '../data/achievements.js';

const router = express.Router();

// ─── GET /api/achievements ───────────────────────────────────────────────────
// Returns all achievement definitions (fixed reference data, from code).
router.get('/', (req, res) => {
  res.json(
    ACHIEVEMENTS.map((a) => ({
      achievement_id: a.code,
      title: a.title,
      description: a.description,
      xp_reward: a.xp_reward,
      badge_image: a.badge_image,
    }))
  );
});

// ─── GET /api/achievements/:userId ──────────────────────────────────────────
// Returns achievements unlocked by a specific student.
router.get('/:userId', authenticate, async (req, res) => {
  if (req.user.userId !== req.params.userId) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const unlocked = user.achievements
      .slice()
      .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
      .map((a) => ({
        achievement_id: a.code,
        title: a.title,
        description: a.description,
        xp_reward: a.xpReward,
        badge_image: null,
        unlocked_at: a.unlockedAt,
      }));

    res.json(unlocked);
  } catch (err) {
    console.error('Get user achievements error:', err);
    res.status(500).json({ error: 'Failed to fetch achievements.' });
  }
});

// ─── POST /api/achievements/unlock ──────────────────────────────────────────
// Unlocks an achievement for a student (idempotent) and awards its XP.
router.post('/unlock', authenticate, async (req, res) => {
  const { achievement_id } = req.body; // the achievement code

  const def = ACHIEVEMENTS_BY_CODE[achievement_id];
  if (!def) {
    return res.status(400).json({ error: 'Unknown achievement.' });
  }

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const already = user.achievements.some((a) => a.code === def.code);
    if (!already) {
      user.achievements.push({
        code: def.code,
        title: def.title,
        description: def.description,
        xpReward: def.xp_reward,
      });
      user.xp += def.xp_reward;
      user.totalPoints += def.xp_reward;
      user.level = Math.floor(user.xp / 500) + 1;
      await user.save();
    }

    res.json({
      unlocked: !already,
      achievement: {
        achievement_id: def.code,
        title: def.title,
        description: def.description,
        xp_reward: def.xp_reward,
        badge_image: def.badge_image,
      },
    });
  } catch (err) {
    console.error('Unlock achievement error:', err);
    res.status(500).json({ error: 'Failed to unlock achievement.' });
  }
});

export default router;
