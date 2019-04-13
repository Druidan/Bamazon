DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    stock_quantity INT DEFAULT 0,
    price DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

-- CREATE TABLE top_albums (
--     position INT NOT NULL,
--     artist VARCHAR(100) NULL,
--     album VARCHAR(100) NULL,
--     year INT NULL,
--     raw_total DECIMAL(10,4) NULL,
--     raw_usa DECIMAL(10,4) NULL,
--     raw_uk DECIMAL(10,4) NULL,
--     raw_eur DECIMAL(10,4) NULL,
--     raw_row DECIMAL(10,4) NULL,
--     PRIMARY KEY (position)
-- );


-- select * from top_albums;