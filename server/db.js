import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// Create a connection pool so multiple requests can be handled simultaneously
const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'pc_simulator',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'yourpassword',
});

// Test the connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌  PostgreSQL connection error:', err.message);
  } else {
    console.log('✅  PostgreSQL connected successfully');
    release();
  }
});

export default pool;
