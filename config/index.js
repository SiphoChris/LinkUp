import mysql from 'mysql2/promise';
import 'dotenv/config';

export let db = mysql.createPool({
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
