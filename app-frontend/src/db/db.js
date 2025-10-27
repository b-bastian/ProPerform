import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SSL } = process.env;

export const db = await mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  ssl: DB_SSL === 'true' ? {} : false,
});

// Testausgabe beim Start
try {
  await db.connect();
  console.log(`✅ Connected to MariaDB at ${DB_HOST}:${DB_PORT} (${DB_NAME})`);
} catch (err) {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
}
