//Establish Dependancies
const inquirer = require(`inquirer`);
const {table} = require(`table`);
const db = require(`./mysqlConnection`);
const core = require(`./bamazon`);

//Customer Variables
let itemId;
let itemQuantity;
let quantityWanted;

const customerFunctions = {

    displayWares: function() {
        console.log(`--------------------------\n`)
        let data = [
            [`ID`,`Product`,`Price`,]
        ];
        const query = `SELECT item_id, product_name, price FROM products WHERE stock_quantity > 0`;
            db.query(query, function(err, result) {
                if (err) throw err;
                result.forEach(item => {
                    const itemArr =[item.item_id, item.product_name, `$${item.price}`];
                    data.push(itemArr);
                })
                output = table(data);
                console.log(output);
                customerFunctions.whichItem();
            })
},

    searchByCat: function() {
        console.log(`--------------------------\n`)
        categoryArr = [];
        const query = `SELECT DISTINCT department_name FROM products`;
        db.query(query, function(err, result) {
            if (err) throw err;
            result.forEach(item => {
                categoryArr.push(item.department_name);
            })
            inquirer.prompt({
                name: `whichCat`,
                type: `list`,
                message: `Which category would you like to search?`,
                choices: categoryArr, 
            }).then(function(answer) {
                customerFunctions.displayCat(answer.whichCat);
    }) }) },

    displayCat: function(cat) {
        console.log(`--------------------------\n`)
        let data = [
            [`ID`,`Product`,`Price`,]
        ];
        db.query(`SELECT item_id, product_name, price FROM products WHERE ?`, { department_name: cat }, function(err, result) {
            if (err) throw err;
            result.forEach(item => {
                const itemArr =[item.item_id, item.product_name, `$${item.price}`];
                data.push(itemArr);
            })
            output = table(data);
            console.log(output);
            customerFunctions.whichItem();
        })
    },

    whichItem: function() {
        console.log(`--------------------------\n`)
        inquirer.prompt({
            name: `selection`,
            type: `input`,
            message: `Which item do you wish to purchase? Type in the item's ID.`
        }).then(function(answer) {
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
        console.log(`--------------------------\n`)
        inquirer.prompt({
            name: `quantity`,
            type: `input`,
            message: `How many would you like to purchase?`,
        }).then(function(answer){
            db.query(`SELECT stock_quantity, price FROM products WHERE ?`, { item_id: itemId }, function(err, result) {
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
                            const core = require(`./bamazon.js`)
                            core.searchOptions();
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
                                        core.exitBamazon();
                                        break;
    } }) } }) } 
    }) }) },

    reduceStock: function(amount) {
        console.log(`--------------------------\n`)
        newQuantity = itemQuantity-amount;
        let query = `UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${itemId}`;
        db.query(query, function(err, result) {
            if (err) throw err;
        })
        core.exitBamazon();
    },


}

module.exports = customerFunctions;