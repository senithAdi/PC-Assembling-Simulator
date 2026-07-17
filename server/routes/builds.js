import express from 'express';
import Build from '../models/Build.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// ─── GET /api/builds?userId=X ────────────────────────────────────────────────
// Returns all builds for the specified user, newest first.
router.get('/', authenticate, async (req, res) => {
  const userId = req.query.userId;

  if (!userId || req.user.userId !== userId) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  try {
    const builds = await Build.find({ user: userId }).sort({ createdAt: -1 });
    res.json(builds.map((b) => b.toPublic()));
  } catch (err) {
    console.error('Get builds error:', err);
    res.status(500).json({ error: 'Failed to fetch builds.' });
  }
});

// ─── POST /api/builds ────────────────────────────────────────────────────────
// Save a new completed or in-progress build.
router.post('/', authenticate, async (req, res) => {
  const {
    build_name,
    scenario_id,
    scenario_title,
    difficulty,
    completion_status,
    score,
    completion_time,
    components,
  } = req.body;

  if (!build_name) {
    return res.status(400).json({ error: 'Build name is required.' });
  }

  try {
    const build = await Build.create({
      user: req.user.userId,
      buildName: build_name,
      scenarioId: scenario_id || null,
      scenarioTitle: scenario_title || null,
      difficulty: difficulty || null,
      completionStatus: completion_status || 'In Progress',
      score: score || 0,
      completionTime: completion_time || null,
      components: (components || []).map((c) => ({
        componentId: c.component_id,
        name: c.component_name || c.name,
        category: c.category,
        manufacturer: c.manufacturer,
        model: c.model,
        motherboardSlot: c.motherboard_slot,
        correctlyInstalled: c.correctly_installed ?? true,
      })),
    });

    res.status(201).json(build.toPublic());
  } catch (err) {
    console.error('Save build error:', err);
    res.status(500).json({ error: 'Failed to save build.' });
  }
});

// ─── DELETE /api/builds/:id ──────────────────────────────────────────────────
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);
    if (!build) {
      return res.status(404).json({ error: 'Build not found.' });
    }
    if (build.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'You can only delete your own builds.' });
    }

    await build.deleteOne();
    res.json({ message: 'Build deleted successfully.' });
  } catch (err) {
    console.error('Delete build error:', err);
    res.status(500).json({ error: 'Failed to delete build.' });
  }
});

export default router;
