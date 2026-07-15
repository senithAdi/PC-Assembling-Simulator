import express from 'express';
import pool from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// ─── GET /api/builds?userId=X ────────────────────────────────────────────────
// Returns all builds for the specified user
router.get('/', authenticate, async (req, res) => {
  const userId = parseInt(req.query.userId);

  if (!userId || req.user.userId !== userId) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  try {
    // Get builds with their component lists
    const buildsResult = await pool.query(
      `SELECT b.build_id, b.build_name, b.completion_status, b.score,
              b.completion_time, b.created_at,
              s.title AS scenario_title, s.difficulty
       FROM Builds b
       LEFT JOIN Scenarios s ON b.scenario_id = s.scenario_id
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC`,
      [userId]
    );

    // For each build, fetch its installed components
    const builds = await Promise.all(
      buildsResult.rows.map(async (build) => {
        const comps = await pool.query(
          `SELECT bc.motherboard_slot, bc.correctly_installed,
                  c.component_name, c.category, c.manufacturer, c.model
           FROM BuildComponents bc
           JOIN Components c ON bc.component_id = c.component_id
           WHERE bc.build_id = $1
           ORDER BY bc.installed_order`,
          [build.build_id]
        );
        return { ...build, components: comps.rows };
      })
    );

    res.json(builds);
  } catch (err) {
    console.error('Get builds error:', err);
    res.status(500).json({ error: 'Failed to fetch builds.' });
  }
});

// ─── POST /api/builds ────────────────────────────────────────────────────────
// Save a new completed or in-progress build
router.post('/', authenticate, async (req, res) => {
  const { build_name, scenario_id, completion_status, score, completion_time, components } = req.body;
  const userId = req.user.userId;

  if (!build_name) {
    return res.status(400).json({ error: 'Build name is required.' });
  }

  try {
    // Insert the build record
    const buildResult = await pool.query(
      `INSERT INTO Builds (user_id, build_name, scenario_id, completion_status, score, completion_time)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, build_name, scenario_id || null, completion_status || 'In Progress', score || 0, completion_time || null]
    );

    const build = buildResult.rows[0];

    // Insert each installed component into BuildComponents
    if (components && components.length > 0) {
      for (let i = 0; i < components.length; i++) {
        const comp = components[i];
        await pool.query(
          `INSERT INTO BuildComponents (build_id, component_id, motherboard_slot, installed_order, correctly_installed)
           VALUES ($1, $2, $3, $4, $5)`,
          [build.build_id, comp.component_id, comp.motherboard_slot, i + 1, comp.correctly_installed ?? true]
        );
      }
    }

    res.status(201).json(build);
  } catch (err) {
    console.error('Save build error:', err);
    res.status(500).json({ error: 'Failed to save build.' });
  }
});

// ─── DELETE /api/builds/:id ──────────────────────────────────────────────────
router.delete('/:id', authenticate, async (req, res) => {
  const buildId = parseInt(req.params.id);
  const userId = req.user.userId;

  try {
    // Verify the build belongs to this user
    const check = await pool.query(
      'SELECT user_id FROM Builds WHERE build_id = $1',
      [buildId]
    );

    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Build not found.' });
    }

    if (check.rows[0].user_id !== userId) {
      return res.status(403).json({ error: 'You can only delete your own builds.' });
    }

    await pool.query('DELETE FROM Builds WHERE build_id = $1', [buildId]);
    res.json({ message: 'Build deleted successfully.' });
  } catch (err) {
    console.error('Delete build error:', err);
    res.status(500).json({ error: 'Failed to delete build.' });
  }
});

export default router;
