import express from 'express';
import pool from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// ─── GET /api/quiz/:category ─────────────────────────────────────────────────
// Returns up to 5 random quiz questions for a component category
router.get('/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const result = await pool.query(
      `SELECT quiz_id, question, option_a, option_b, option_c, option_d
       FROM Quizzes
       WHERE component_category = $1
       ORDER BY RANDOM()
       LIMIT 5`,
      [category]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Get quiz error:', err);
    res.status(500).json({ error: 'Failed to fetch quiz questions.' });
  }
});

// ─── POST /api/quiz/answer ───────────────────────────────────────────────────
// Submit a quiz answer and receive XP reward + explanation
router.post('/answer', authenticate, async (req, res) => {
  const { quiz_id, selected_answer } = req.body;
  const userId = req.user.userId;

  if (!quiz_id || !selected_answer) {
    return res.status(400).json({ error: 'quiz_id and selected_answer are required.' });
  }

  try {
    // Get the correct answer and explanation
    const quizResult = await pool.query(
      'SELECT correct_answer, explanation FROM Quizzes WHERE quiz_id = $1',
      [quiz_id]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz question not found.' });
    }

    const { correct_answer, explanation } = quizResult.rows[0];
    const isCorrect = selected_answer.toUpperCase() === correct_answer.toUpperCase();
    const xp_earned = isCorrect ? 25 : 0;

    // Save result
    await pool.query(
      `INSERT INTO QuizResults (user_id, quiz_id, selected_answer, score)
       VALUES ($1, $2, $3, $4)`,
      [userId, quiz_id, selected_answer.toUpperCase(), xp_earned]
    );

    // Award XP if correct
    if (isCorrect) {
      await pool.query(
        'UPDATE Users SET xp = xp + 25, total_points = total_points + 25 WHERE user_id = $1',
        [userId]
      );
    }

    res.json({ isCorrect, xp_earned, correct_answer, explanation });
  } catch (err) {
    console.error('Quiz answer error:', err);
    res.status(500).json({ error: 'Failed to submit quiz answer.' });
  }
});

export default router;
