# Bamazon v1.1
The sensational new and superior competition to Amazon! 
### Please Note
This is a school project meant to expand upon my skills with Node.Js and MySQL, not an actual Amazon competitor, I mean... what even?

## Overview and Goals
Bamazon is meant to be a command-line NodeJs and MySQL application whereby the user can view items for sale on a server, select items of interest, and purchase them.

### Video Walkthrough (2.0)
As of 2.0 we have a [Video Walkthrough](https://www.youtube.com/watch?v=cwEOhPpSBOE&feature=youtu.be) that explores the basic functionality of Bamazon!

## Versions
_All of the versions below are listed in reverse chronological order with the latest version at the top._

### Version 2.0
Success! We have officially launched Bamazon 2.0! With this newest version we have added the Bamazon Manager. We now provide the following functionality:
  * Allow the user to go into either the storefront or the employee menu where you can find...
  * Bamazon Manager: The real star of 2.0, which is essentially adding a whole new application's functionality to our current suite. Running Bamazon Manager gives access to the following -
    * View Products for Sale
      * If selected, this option will list all available items with their information.
    * View Low Inventory
      * If selected, this option will list all items with a current stock of less than five.
    * Add to Inventory
      * If selected, this option will display a prompt that will let a manager add more of any of the items in the store.
    * Add New Product
      * If selected, this option will display a prompt that will allow a manager to add a completely new product to the store.

### Version 1.1
With the successful launch of Bamazon 1.0, we moved on to our future features, working on 1.1, and today I'm happy to announce that we have successfully updated to 1.1! with that we have added the following features:
  * We have made the UX clear and pronounced, partially through restructuring the console.logs, and partially through the use of the [Figlet](https://www.npmjs.com/package/figlet) npm.
  * We've added the ability for the user to narrow down their item search through departments(category).
  * We've updated our file structure to allow for easier future development in the next anticipated update - Bamazon 2.0. This includes a separate mysql connection file that can be required in each js file, and a more robust menu system in the core bamazon.js.

### MVP (Version 1.0)
The MVP of this project is that, when run, it must:
* Introduce the Website and Its functionality
* Display all the items for sale.
* Ask the User which Item they would like to buy by ID.
* Ask the user how many of the item they would like to buy.
* Once the Order is placed, the application should verify that the store has enough of the product and prevent the order from going through if not. 
* If there is sufficient stock, the application should fullfill the order and update the stock information on the MySQL database.
* When the order goes through, display the total cost of the purchase to the player.

## Planned Future Version Benchmarks and Features
* v-2.1: With the new Manager functionality, with want to make sure we aren't leaving our customer functionality behind. No, we want to further push the user experience to new heights.
  * Allow the user to view their cart at any time, with all of their selected items and their total cost.
  * Give the option to remove items from the cart.
  * Allow the user to continue shopping after a successful order.


* v-3.0: After 2.0, we will have expanded to include Managers in our functionality, but we believer that we can expand the manager's toolbox further by giving them supervisory capabilities. In many ways, this is like adding a whole third application's functionality to our app, which is why this is Bamazon 3.0, and not 2.X.
  * When Bamazon is run, and Bamazon Manager is chosen, we want to further dilineate between Managerial options and Supervisor options, so the manager will chose between the two.
  * When the Bamazon Supervisor branch is chosen, present the following options to the manager:
    * View Product Sales By Department
      * If selected, this option will display a summarized table that will give a full picture of each department's overhead costs, sales, and profits.
    * Create New Department
      * If selected, this option will create a new department.

## Core Dependancies
The following NPM packages are going to be used in our Application:
* [Inquirer](https://www.npmjs.com/package/inquirer) - This NPM is essential for our usability and navigation.
* [MySQL](https://www.npmjs.com/package/mysql) - This NPM package is essential for connecting to and using our database.
* [dotenv](https://www.npmjs.com/package/dotenv) - We will be using dotenv to keep our paswords secret, and keep them safe.

### Additional Dependancies:
We are now currently using the following dependencies to enhance the UX experience:
* [Figlet](https://www.npmjs.com/package/figlet) - This NPM allows us to make highly readable and eyecatching titles and headers to help our users distinguish easily between screens and functionality.
* [Table](https://www.npmjs.com/package/table) - This NPM will allow us to structure our data for our users, again to enhance readability and thus usability. 



