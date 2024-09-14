// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: 'admin', // your MySQL password
    database: 'MonumentArchive'
});

const promisePool = pool.promise();

module.exports = promisePool;
