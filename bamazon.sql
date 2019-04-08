SET SQL_SAFE_UPDATES = 0;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(32),
    department_name VARCHAR(32),
    price DECIMAL(5, 0),
    stock_quantity INTEGER (16)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES 
		("Falchion", "Weapons", 200, 10), 
		("Maul", "Weapons", 75, 17), 
		("Wooden Shield", "Shields", 37, 27), 
		("Mail Shirt", "Armor", 150, 27), 
		("Practice Horse", "Horse", 300, 5),
		("Charger", "Horse", 1500, 2),
        ("Salt", "Goods", 255, 10),
        ("Raw Silk", "Goods", 600, 3),
        ("Grapes", "Food", 100, 10),
        ("Bread", "Food", 50, 30)
        ;


