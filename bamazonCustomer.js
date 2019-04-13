//Establish Dependancies
require(`dotenv`).config();
const inquirer = require(`inquirer`);
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
});

//Customer Variables
let itemId;
let itemQuantity;
let quantityWanted;

const customerFunctions = {

    displayWares: function() {
        const query = `SELECT item_id, product_name, price FROM products WHERE stock_quantity > 0`;
        connection.query(query, function(err, result) {
            if (err) throw err;
            result.forEach(item => {
                console.log(`${item.item_id}.) ${item.product_name} - $${item.price}`);
            })
            console.log(`\n`)
            customerFunctions.whichItem();
    }) },

    whichItem: function() {
        inquirer.prompt({
            name: `selection`,
            type: `input`,
            message: `Which item do you wish to purchase? Type in the item's number.`
        }).then(function(answer){
            if(isNaN(answer.selection) || answer.selection <=0 ) {
                console.log(`\nThat's not the number of any of our items, or it's written in a way our system can't recognize.  Please enter an item's number like "1", "2", "3", etc..\n`);
                customerFunctions.whichItem();
            } else {
                console.log(`\n`)
                itemId = answer.selection;
                customerFunctions.howMany();
            } 
    }) },

    howMany: function() {
        inquirer.prompt({
            name: `quantity`,
            type: `input`,
            message: `How many would you like to purchase?`,
        }).then(function(answer){
            connection.query(`SELECT stock_quantity, price FROM products WHERE ?`, { item_id: itemId }, function(err, result) {
                console.log(result[0].stock_quantity);
                if (err) throw err;
                if (isNaN(answer.quantity)) {
                    console.log(`\nThat's not a number our system can recognize.  Please enter a valid number.\n`);
                    customerFunctions.howMany();
                } else if (answer.quantity <= 0) {
                    console.log(`\nIt sounds like you don't actually want to purchase this product.\n`);
                    inquirer.prompt({
                        name: `desire`,
                        type: `confirm`,
                        message: `Do you actually want to purchase this product?`
                    }).then(function(response) {
                        if(response.desire) {
                            customerFunctions.howMany();
                        } else {
                            customerFunctions.displayWares();
                        };
                    })
                } else if (answer.quantity > result[0].stock_quantity) {
                    console.log(`\nUh oh! It looks like we have an insufficient quantity of that item! We're sorry for the inconvenience. Our current stock is ${result[0].stock_quantity}. Please select an amount equal or below our current stock.\n`);
                    customerFunctions.howMany();
                } else {
                    quantityWanted = answer.quantity;
                    const totalPrice = quantityWanted*result[0].price;
                    console.log(`\nThe total cost of your cart is ${totalPrice}.\n`)
                    inquirer.prompt({
                        name: `confirmSale`,
                        type: `confirm`,
                        message: `Confirm to FinalizeYour Sale!`
                    }).then(function(confirmation) {
                        if(confirmation.confirmSale){
                            itemQuantity = result[0].stock_quantity;
                            console.log(`\n Congratulations on your purchase!`)
                            customerFunctions.reduceStock(quantityWanted);
                        } else {
                            inquirer.prompt({
                                name: `nav`,
                                type: `list`,
                                message: `\n That's alright. Did you want to do something else?`,
                                choices: [`I want to enter a new quantity.`, `I want to choose a different item`, `I want to exit Bamazon`]
                            }).then(function(customerWants) { 
                                switch(customerWants.nav) {
                                    case `I want to enter a new quantity.`:
                                        console.log(`\n`)
                                        customerFunctions.howMany();
                                        break;
                                    case `I want to choose a different item`: 
                                        console.log(`\n`)
                                        customerFunctions.displayWares();
                                        break;
                                    case `I want to exit Bamazon`:
                                        console.log(`\n`)
                                        customerFunctions.exitBamazon();
                                        break;
    } }) } }) } 
    }) }) },

    reduceStock: function(amount) {
        newQuantity = itemQuantity-amount;
        let query = `UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${itemId}`;
        connection.query(query, function(err, result) {
            if (err) throw err;
        })
        customerFunctions.exitBamazon();
    },

    exitBamazon: function() {
        console.log(`\n Thank you! Come again!`);
        connection.end();
    }

}

module.exports = customerFunctions;