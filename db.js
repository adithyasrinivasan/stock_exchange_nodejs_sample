const mysql = require('mysql');

const mysql_user = process.env.MYSQL_USER;
const mysql_pass = process.env.MYSQL_PASS;
const mysql_host = process.env.MYSQL_HOST;
const mysql_db  = process.env.MYSQL_DB;
const connection = mysql.createConnection({
    host     : mysql_host,
    user     : mysql_user,
    password : mysql_pass,
    database : mysql_db
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
