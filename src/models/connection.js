const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'um2tres4',
    database: 'diarias',
    // host: process.env.mySql_Host,
    // user: process.env.mySql_User,
    // password: process.env.mySql_Password,
    // database: process.env.mySql_DB,
});
module.exports = connection;