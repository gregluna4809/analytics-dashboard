import pg from 'pg';

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  max: 10,
  ssl: {
    rejectUnauthorized: false
  }
});

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,x-user-id,X-User-Id',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json',
};

export const health = async (event) => {
  try {
    const result = await pool.query('SELECT 1 + 1 AS result');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: 'ok', db: result.rows[0].result }),
    };
  } catch (err) {
    console.error('Health check error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ status: 'error', message: 'DB connection failed' }),
    };
  }
};

export const getEntries = async (event) => {
  try {
    const userId = event.headers['x-user-id'] || event.headers['X-User-Id'] || 'demo-user-1';
    const result = await pool.query(
      'SELECT * FROM entries WHERE userId = $1 ORDER BY entryTimestamp DESC',
      [userId]
    );
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.rows),
    };
  } catch (err) {
    console.error('GET entries error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch entries' }),
    };
  }
};

export const createEntry = async (event) => {
  try {
    const userId = event.headers['x-user-id'] || event.headers['X-User-Id'] || 'demo-user-1';
    const body = JSON.parse(event.body);
    const { category, value, notes } = body;

    if (!category || value == null) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'category and value are required' }),
      };
    }

    const result = await pool.query(
      'INSERT INTO entries (userId, category, value, notes) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, category, value, notes || null]
    );

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(result.rows[0]),
    };
  } catch (err) {
    console.error('POST entry error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create entry' }),
    };
  }
};