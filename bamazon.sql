DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    stock_quantity INT DEFAULT 0,
    price DECIMAL(10,2) DEFAULT 0,
    product_sales DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY (department_id)
);

SELECT * FROM products;

SELECT * FROM departments;



-- select * from top_albums;