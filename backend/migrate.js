import pg from 'pg';

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export const handler = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS entries (
        id SERIAL PRIMARY KEY,
        userId VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        value DECIMAL(10, 2) NOT NULL,
        notes TEXT,
        entryTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_userId ON entries(userId);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_timestamp ON entries(entryTimestamp);`);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Table created successfully' }),
    };
  } catch (err) {
    console.error('Migration error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};