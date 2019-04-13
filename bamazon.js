//Establish Dependancies
// require(`dotenv`).config();
// const inquirer = require(`inquirer`);
// const mysql = require(`mysql`);
const bCF = require(`./bamazonCustomer`)
// const pswd = require(`./mysqlPswd`);

//Establish MySQL Password from .env through mysqlPswd.js
// const MySQLPswd = pswd.mysqlPswd.pswd;

//Create Connection Function for MySQL database
// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: MySQLPswd,
//     database: "bamazon"
// });

console.log("\nWelcome to Bamazon!\n");

bCF.displayWares();


