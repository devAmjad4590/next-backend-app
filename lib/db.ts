import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost', // or your Docker host IP
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;