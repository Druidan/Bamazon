# Bamazon Pseudo Code
This file contains all of my Pseudo Code and checklisting for this project. If you are looking for the README file, you just missed it. [CLICK HERE](https://github.com/Druidan/Bamazon/blob/master/README.md) to proceed to that file. This file is pretty much for my own use to help guide me in the development process. 

## Bamazon v1.0
- [X] Create a MySQL Database called bamazon.
  - [X] Create a sql file with the basic creation commands inside of it (including those below) and add to it as needed.
  - [X] Then create a Table inside of that database called "products" with each of the following columns:
    - [X] item_id
    - [X] product_name
    - [X] department_name
    - [X] stock_quantity
  - [X] Populate this database with around 10 different "products". (create as csv file)
- [X] Initialize a package.json file.
- [X] Install all dependancies:
  - [X] dotenv
  - [X] mysql
  - [X] inquirer
- [X] Create a core bamazon.js file that will tie together all of our other app functions.
- [X] Create a bamazonCustomer.js file that will hold the customer functions.
- [X] Require the bamazonCustomer.js in bamazon.js
- [X] Set up env file with MySQL database password.
- [X] Establish password file that exports the dotev information.
- [ ] Add requirements for the following:
  - [X] dotenv
  - [X] MySQL
  - [X] inquirer
  - [X] MySqlPswd.js
- [X] Establish connection to MySQL database.
  - [X] Use the dotenv protected database password.
- [X] Create connection at the start of the core bamazon code.
- [X] Create welcome message that will console log to the command line.
- [X] Write a function that displays all of the information in the MySql stock database.
  - [X] Call that function.
  - [X] Have this function call the next function -  
- [X] Write a function that will ask the user what item they want to purchase by typing in the item's ID.
  - [X] Have this function call the next function - 
- [X] Write a function that asks the user how many of that item they would like to purchase.
  - [X] Have this function validate the response vs the amount currently in stock.
    - [X] If it is not a number, prompt the user to use a number and then call this function again.
    - [X] If it is a number equal to zero or below, prompt the user to confirm if they actually want to purchase this item or not. If yes, call this function again. If not, call the function that displays all of the item information in the database again.
    - [X] If it is a number higher than the current stock, inform the user that we have an insufficient quantity for that amount. Tell them our curent stock, and then call this function again.
    - [X] If the number is higher than zero but equal to or below current stock:
      - [X] Indicate the total price of their order and prompt the user to confirm if they want to make the purchase or not.
        - [X] If the answer is yes, subtract the quantity from the SQL database and notify that their purchase was a success. Thank the user and tell them to come again. 
          - [X] Call a function that closes the connection.
        - [X] If the answer is no, prompt the user and ask if they want to enter a new quantity, exit to the store front or exit the program entirely.
          - [X] If they want to enter a new quantity, call the quantity function again.
          - [X] If they want to exit to the store front, call the function that displays all items again.
          - [X] If they want to exit entirely, call the function that ends the connection.

## Bamazon v1.1
- [X] Fail to write pseudo code and get the features done anyway. Oops.

## Bamazon v2.0
- [X] Establish requirements in new bamazon Manager js file:
  - [X] inquirer
  - [X] mysql database connection js
  - [X] core bamazon doc.
- [X] Establish Manager Functions Object
- [X] Export Manager Functions Object
- [X] Import Manager Functions Object into BamazonJS.
- [ ] Write the following Manager Functions:
  - [X] View Products for Sale
    - [X] View All
    - [X] View By Department
  - [X] View Low Inventory
  - [X] Add to Inventory
  - [X] Add new Product
- [X] Write a switch function in BamazonJS that prompts the user to select between the above functions or exit Bamazon.

## Bamazon v3.0
- [ ]

