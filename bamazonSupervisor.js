//Establish Dependancies
const inquirer = require(`inquirer`);
const {table} = require(`table`);
const db = require(`./mysqlConnection`);

//Global States
// let addingDepartment = false;

const supervisorFunctions = {

    salesByDepartment: function() {
        // console.log(`--------------------------\n`)
        // depArr = [];
        // const query = `SELECT DISTINCT department_name FROM products`;
        // db.query(query, function(err, result) {
        //     if (err) throw err;
        //     result.forEach(item => {
        //         depArr.push(item.department_name);
        //     })
        //     inquirer.prompt({
        //         name: `whichCat`,
        //         type: `list`,
        //         message: `Which category would you like to view?`,
        //         choices: depArr, 
        //     }).then(function(answer) {
        //         managerFunctions.displayCat(answer.whichCat);
    // }) }) 
},

    addDepartment: function() {
        console.log(`--------------------------\n`)
            inquirer.prompt([
                {
                    name: `deptName`,
                    type: `input`,
                    message: `\nWhat is the name of this new department?\n`
                },
            ]).then(function(answer) {
                db.query(
                    `INSERT INTO departments SET ?`,
                    {
                        department_name: answer.deptName,
                    }, 
                    function (error, results) {
                        if(error) throw error;
                        console.log(results.affectedRows + " department inserted!\n");
                        const core = require(`./bamazon.js`)
                        core.supervisorFunctions();
                });
            })
    },

}

module.exports = supervisorFunctions;

