import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || undefined,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  max: 10,
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1 + 1 AS result');
    res.json({ status: 'ok', db: result.rows[0].result });
  } catch (err) {
    console.error('Health check error:', err);
    res.status(500).json({ status: 'error', message: 'DB connection failed' });
  }
});

// GET /api/entries
app.get('/api/entries', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'demo-user-1';
    const result = await pool.query(
      'SELECT * FROM entries WHERE userId = $1 ORDER BY entryTimestamp DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/entries error:', err);
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// POST /api/entries
app.post('/api/entries', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'demo-user-1';
    const { category, value, notes } = req.body;

    if (!category || value == null) {
      return res.status(400).json({ error: 'category and value are required' });
    }

    const result = await pool.query(
      'INSERT INTO entries (userId, category, value, notes) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, category, value, notes || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/entries error:', err);
    res.status(500).json({ error: 'Failed to create entry' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
