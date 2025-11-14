import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,      // muy importante
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});