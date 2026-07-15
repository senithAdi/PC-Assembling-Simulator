import express from 'express';
import pool from '../db.js';

const router = express.Router();

// ─── GET /api/components ─────────────────────────────────────────────────────
// Returns all components, optionally filtered by category
router.get('/', async (req, res) => {
  const { category } = req.query;

  try {
    let query = `SELECT * FROM Components ORDER BY category, component_name`;
    let params = [];

    if (category) {
      query = `SELECT * FROM Components WHERE category = $1 ORDER BY component_name`;
      params = [category];
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Get components error:', err);
    res.status(500).json({ error: 'Failed to fetch components.' });
  }
});

// ─── GET /api/components/:id ─────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  const componentId = parseInt(req.params.id);

  try {
    const result = await pool.query(
      'SELECT * FROM Components WHERE component_id = $1',
      [componentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Component not found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get component error:', err);
    res.status(500).json({ error: 'Failed to fetch component.' });
  }
});

// ─── GET /api/components/compatibility/:idA/:idB ─────────────────────────────
// Checks if component A and B are compatible
router.get('/compatibility/:idA/:idB', async (req, res) => {
  const idA = parseInt(req.params.idA);
  const idB = parseInt(req.params.idB);

  try {
    const result = await pool.query(
      `SELECT * FROM ComponentCompatibility
       WHERE (component_a_id = $1 AND component_b_id = $2)
          OR (component_a_id = $2 AND component_b_id = $1)`,
      [idA, idB]
    );

    if (result.rows.length === 0) {
      return res.json({ compatible: null, notes: 'No compatibility data found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Compatibility check error:', err);
    res.status(500).json({ error: 'Failed to check compatibility.' });
  }
});

export default router;
