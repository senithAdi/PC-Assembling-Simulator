import express from 'express';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// ─── GET /api/users/:id ──────────────────────────────────────────────────────
// Returns the full profile of a student including XP, level, and points.
router.get('/:id', authenticate, async (req, res) => {
  if (req.user.userId !== req.params.id) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user.toPublic());
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
});

// ─── PATCH /api/users/:id/xp ─────────────────────────────────────────────────
// Awards XP and automatically levels up the student (every 500 XP = 1 level).
router.patch('/:id/xp', authenticate, async (req, res) => {
  const { xp_to_add } = req.body;

  if (req.user.userId !== req.params.id) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const previousLevel = user.level;
    const gained = xp_to_add || 0;
    user.xp += gained;
    user.totalPoints += gained;
    user.level = Math.floor(user.xp / 500) + 1;
    await user.save();

    res.json({ user: user.toPublic(), leveledUp: user.level > previousLevel });
  } catch (err) {
    console.error('XP update error:', err);
    res.status(500).json({ error: 'Failed to update XP.' });
  }
});

export default router;
