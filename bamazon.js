//Establish Dependancies
const db = require(`./mysqlConnection`);
const inquirer = require(`inquirer`);
const figlet = require(`figlet`);
const bCF = require(`./bamazonCustomer`);
const bMF = require(`./bamazonManager`);
const bSF = require(`./bamazonSupervisor`);

let justEntered = true;

coreFunctions = {
    openBamazon: function() {
        console.log(`--------------------------\n`)
        inquirer.prompt( {
            name: `mainNav`,
            type: `list`,
            message: `Do you want to go to the storefront (customer), or office (employee)?`,
            choices: [`Bamazon Storefront`, `Bamazon Office`, `Exit Bamazon`]
        }).then(function(answer) {
            switch(answer.mainNav){
                case `Bamazon Storefront`:
                    coreFunctions.searchOptions();
                    break;
                case `Bamazon Office`:
                    coreFunctions.employeeOptions();
                    break;
                case `Exit Bamazon`:
                    coreFunctions.exitBamazon();
                    break;
    } }) },

    searchOptions: function() {
        console.log(`--------------------------\n`)
        if(justEntered){
            figlet.text(`Explore our Store!`, {
                font: 'Standard',
                horizontalLayout: 'Smush (U)',
                verticalLayout: 'Smush (U)'
            }, function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(`\n ${data} \n`);
                justEntered = false;
                displaySearchOpt();
            })
        } else {
            displaySearchOpt();
        }
    function displaySearchOpt(){
        inquirer.prompt( {
            name: `searchChoice`,
            type: `list`,
            message: `Do you want to see all of our wares, or search by category?`,
            choices: [`See Everything!`, `Search by Category`, `Exit Bamazon`]
        }).then(function(answer) {
            switch(answer.searchChoice){
                case `See Everything!`:
                    bCF.displayWares();
                    break;
                case `Search by Category`:
                    bCF.searchByCat();
                    break;
                case `Exit Bamazon`:
                    coreFunctions.exitBamazon();
                    break;
    } }) } },

    employeeOptions: function() {
        console.log(`--------------------------\n`)

        if(justEntered) {
            figlet.text(`Welcome to Bamazon Office`, {
                font: 'Standard',
                horizontalLayout: 'Smush (U)',
                verticalLayout: 'Smush (U)'
            }, function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(`\n ${data} \n`);
                justEntered = false;
                displayEmpOpt();
            });
        } else {
            displayEmpOpt();
        }

        function displayEmpOpt() {
                    inquirer.prompt( {
            name: `employeeNav`,
            type: `list`,
            message: `Welcome valued Bamazon Employee! Are you a Manager or a Supervisor?`,
            choices: [`Bamazon Manager`, `Bamazon Supervisor`, `Exit Bamazon`]
        }).then(function(answer) {
            switch(answer.employeeNav){
                case `Bamazon Manager`:
                    coreFunctions.managerOptions();
                    break;
                case `Bamazon Supervisor`:
                    console.log(`\nSupervisor functionality coming soon!\n`)
                    // coreFunctions.supervisorFunctions();
                    coreFunctions.employeeOptions();
                    break;
                case `Exit Bamazon`:
                coreFunctions.exitBamazon();
                    break;
    } }) } },

    managerOptions: function() {
        console.log(`--------------------------\n`)
        inquirer.prompt( {
            name: `managerNav`,
            type: `list`,
            message: `What would you like to do?`,
            choices: [`View Wares`, `View Low Inventory Items`, `Add Inventory`, `Add New Products`, `Exit Bamazon`]
        }).then(function(answer) {
            switch(answer.managerNav){
                case `View Wares`:
                    coreFunctions.viewOptions();
                    break;
                case `View Low Inventory Items`:
                    bMF.viewLow();
                    break;
                case `Add Inventory`:
                    bMF.addInventory();
                    break;
                case `Add New Products`:
                    bMF.addProduct();
                    break;
                case `Exit Bamazon`:
                coreFunctions.exitBamazon();
                    break;
    } }) },

    viewOptions: function() {
        console.log(`--------------------------\n`)
        inquirer.prompt( {
            name: `viewOp`,
            type: `list`,
            message: `How would you like to view our wares?`,
            choices: [`All Wares`, `View By Department`, `Return to Manager Options`]
        }).then(function(answer) {
            switch(answer.viewOp){
                case `All Wares`:
                    bMF.viewAllProducts()
                    break;
                case `View By Department`:
                    bMF.viewByDepartment();
                    break;
                case `Return to Manager Options`:
                    coreFunctions.managerOptions();
                    break;
    } }) },

    supervisorFunctions: function() {

    },

    exitBamazon: function() {
        console.log(`--------------------------\n`)
        console.log(`\n Thank you! Come again!`);
        db.end();
        process.exit();
    }

}

figlet.text(`Welcome to Bamazon!`, {
    font: 'Big Money-nw',
    horizontalLayout: 'Smush (U)',
    verticalLayout: 'Smush (U)'
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(`\n ${data} \n`);
    coreFunctions.openBamazon();
});

module.exports = coreFunctions;