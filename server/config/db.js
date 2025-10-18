import mysql from 'mysql2/promise'
import dotenv from 'dotenv';
dotenv.config();

let db;
try {
  db = mysql.createPool({
    uri: process.env.DATABASE_URL,
  });
  
  const connection = await db.getConnection();
  console.log('Database connected successfully');
  connection.release();
} catch (error) {
  console.error('Error connecting to the database:', error.message);
  process.exit(1);
}


export default db;