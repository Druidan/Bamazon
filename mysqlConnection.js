
require(`dotenv`).config();
const mysql = require(`mysql`);
const pswd = require(`./mysqlPswd`);

//Establish MySQL Password from .env through mysqlPswd.js
const MySQLPswd = pswd.mysqlPswd.pswd;

const connection = mysql.createConnection( {
    host: "localhost",
    port: 3306,
    user: "root",
    password: MySQLPswd,
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    return;
});

module.exports = connection;