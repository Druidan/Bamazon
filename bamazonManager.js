//Establish Dependancies
const inquirer = require(`inquirer`);
const {table} = require(`table`);
const db = require(`./mysqlConnection`);

//Global States
let addingInventory = false;

const managerFunctions = {

    viewAllProducts: function() {
        console.log(`--------------------------\n`)
        let data = [
            [`ID`,`Product`,`Stock`,`Department`,`Sale Price`,]
        ];
        const query = `SELECT * FROM products`;
            db.query(query, function(err, result) {
                if (err) throw err;
                result.forEach(item => {
                    const itemArr =[item.item_id, item.product_name, item.stock_quantity, item.department_name, `$${item.price}`];
                    data.push(itemArr);
                });
                output = table(data);
                console.log(output);
                if(!addingInventory){
                    const core = require(`./bamazon.js`)
                    core.managerOptions();
                } else {
                    managerFunctions.fullfillInventoryAdd();
                } }) },

    viewByDepartment: function() {
        console.log(`--------------------------\n`)
        depArr = [];
        const query = `SELECT DISTINCT department_name FROM products`;
        db.query(query, function(err, result) {
            if (err) throw err;
            result.forEach(item => {
                depArr.push(item.department_name);
            })
            inquirer.prompt({
                name: `whichCat`,
                type: `list`,
                message: `Which category would you like to view?`,
                choices: depArr, 
            }).then(function(answer) {
                managerFunctions.displayCat(answer.whichCat);
    }) }) },

    displayCat: function(cat) {
        console.log(`--------------------------\n`)
        let data = [
            [`ID`,`Product`,`Stock`,`Sale Price`]
        ];
        db.query(`SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?`, { department_name: cat }, function(err, result) {
            if (err) throw err;
            result.forEach(item => {
                const itemArr =[item.item_id, item.product_name, item.stock_quantity, `$${item.price}`];
                data.push(itemArr);
            })
            output = table(data);
            console.log(output);
            const core = require(`./bamazon.js`)
            core.managerOptions();
    }) },

    viewLow: function() {
        console.log(`--------------------------\n`)
        let data = [
            [`ID`,`Product`,`Stock`,`Department`,`Sale Price`,]
        ];
        const query = `SELECT * FROM products WHERE stock_quantity < 5`;
            db.query(query, function(err, result) {
                if (err) throw err;
                result.forEach(item => {
                    const itemArr =[item.item_id, item.product_name, item.stock_quantity, item.department_name, `$${item.price}`];
                    data.push(itemArr);
                });
                output = table(data);
                console.log(output);
                const core = require(`./bamazon.js`)
                core.managerOptions();
    }) },

    addInventory: function() {
        addingInventory = true;
        managerFunctions.viewAllProducts();
    },

    fullfillInventoryAdd: function() {
        console.log(`--------------------------\n`)
        inquirer.prompt([
            {
                name: `id`,
                type: `input`,
                message: `Please input the ID of the item you're stocking.\n`
            },
            {
                name: `amount`,
                type: `input`,
                message: `\nHow many are you adding to the stock?`
            },
        ]).then(function(answer) {
            let itemId = answer.id;
            let stockAdded = answer.amount;
            let query = `UPDATE products SET stock_quantity = stock_quantity + ${stockAdded} WHERE item_id = ${itemId}`;
            db.query(query, function(err, result) {
                if (err) throw err;
                managerFunctions.viewItem(itemId);
                console.log(`\nStock Updated!`)
            })
        })
    },

    viewItem: function(id) {
        console.log(`--------------------------\n`)
        let data = [
            [`ID`,`Product`,`Stock`,`Department`,`Sale Price`,]
        ];
        db.query(`SELECT item_id, product_name, stock_quantity, department_name, price FROM products WHERE ?`, { item_id: id }, function(err, result) {
            if (err) throw err;
            result.forEach(item => {
                const itemArr =[item.item_id, item.product_name, item.stock_quantity, item.department_name, `$${item.price}`];
                data.push(itemArr);
            })
            output = table(data);
            console.log(output);
            if(addingInventory){
                addingInventory = false;
                const core = require(`./bamazon.js`)
                core.managerOptions();
            };
        })
    },

    addProduct: function() {
        console.log(`--------------------------\n`)
        deptArr = [];
        const query = `SELECT DISTINCT department_name FROM products`;
        db.query(query, function(err, result) {
            if (err) throw err;
            result.forEach(item => {
                deptArr.push(item.department_name);
            }) 
            inquirer.prompt([
                    {
                        name: `name`,
                        type: `input`,
                        message: `\nWhat is the name of this new product?\n`
                    },
                    {
                        name: `department`,
                        type: `list`,
                        message: `\nSelect the department you're adding this item to.`,
                        choices: deptArr,
                    },
                    {
                        name: `amount`,
                        type: `number`,
                        message: `\nHow many are you adding? Please use an integer.\n`,
                        validate: function(value) {
                            if (!isNaN(value)) {
                                return true;
                            }
                            return false;
                        }
                    },
                    {
                        name: `price`,
                        type: `number`,
                        message: `\nWhat is the price of the item? Please use only use integers.\n`,
                        validate: function(value) {
                            if (!isNaN(value)) {
                                return true;
                            }
                            return false;
                    } },
                ]).then(function(answer) {
                    db.query(
                        `INSERT INTO products SET ?`,
                        {
                            product_name: answer.name,
                            department_name: answer.department,
                            stock_quantity: answer.amount,
                            price: answer.price,
                        }, 
                        function (error, results) {
                            if(error) throw error;
                            console.log(results.affectedRows + " product inserted!\n");
                            const core = require(`./bamazon.js`)
                            core.managerOptions();
                    });
                })
        }) 
    },

}

module.exports = managerFunctions;

