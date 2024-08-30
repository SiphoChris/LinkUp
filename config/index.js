import mysql from 'mysql2/promise';
import 'dotenv/config';
import session from 'express-session';
import MySQLStore from 'connect-mysql'; // Import connect-mysql

// MySQL database connection
export const db = mysql.createPool({
  host: process.env.DBhost,
  user: process.env.DBuser,
  password: process.env.DBpassword,
  database: process.env.DBname,
  multipleStatements: true,
  connectionLimit: 30,
});

db.on('connection', (connection) => {
  console.log('Database connected:', connection.threadId);
});

// Session store setup
const sessionStore = new (MySQLStore(session))({
  config: {
    host: process.env.DBhost,
    user: process.env.DBuser,
    password: process.env.DBpassword,
    database: process.env.DBname,
  },
  table: 'Sessions', 
  createTable: true,
  clearExpired: true, 
  checkExpirationInterval: 900000,
  expiration: 24 * 60 * 60 * 1000, // 24 hours expiration
});

export { sessionStore };
