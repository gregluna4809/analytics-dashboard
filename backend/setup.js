import pg from 'pg';

// Connect to the default 'postgres' database first
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'postgres', // Connect to default database
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export const handler = async () => {
  try {
    // Create the database
    await pool.query('CREATE DATABASE analytics_dashboard');
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Database created successfully' }),
    };
  } catch (err) {
    // If database already exists, that's OK
    if (err.code === '42P04') {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Database already exists' }),
      };
    }
    
    console.error('Setup error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};