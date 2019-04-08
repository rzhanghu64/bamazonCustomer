var mysql = require('mysql');
var inquirer = require('inquirer');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "bamazon"
});

con.connect(function (error) {
    if (error) throw error;
    console.log('Connected to database');
    initialMenu();
});

function initialMenu() {
    welcomePrompt();
    buyPrompt();
};

function welcomePrompt() {
    console.log("Welcome to the Rivacheg General Goods Store.")
}

function getInventory(queryResults) {
    var inventory = [];
    for (let i = 0; i < queryResults.length; i++) {
        inventory.push(queryResults[i]);
    }
    return inventory;
}

function displayInventory(inventory) {
    inventory.forEach(function (element) {
        console.log(
            "Item ID: "
            + element.item_id + " | "
            + element.product_name + " | "
            + element.department_name + " | Gold "
            + element.price + " | "
            + element.stock_quantity
        );
    })
}

function buyPrompt() {
    con.query('SELECT * FROM products;', function (error, results) {
        if (error) throw error;
        var promise1 = new Promise(function (resolve, reject) {
            displayInventory(getInventory(results));
            resolve();
        })
        promise1.then(function () {
            selectionPrompt();
        })
    })
};

function goodbyePrompt() {
    console.log("Good bye.");
}

function anotherBuy() {
    inquirer.prompt([
        {
            name: "answer",
            type: "list",
            message: "Anything else you need?",
            choices: ["Yes", "No"]
        }
    ])
        .then(function (userInput) {
            if (userInput.answer == "Yes") {
                buyPrompt();
            }
            else {
                goodbyePrompt();
                process.exit(0);
            }
        })
};


function selectionPrompt() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Select the item by Item ID"
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter the quantity you wish to purchase."
        }
    ])
        .then(function (userInput) {
            if ((userInput.item_id == '') || (userInput.quantity == '')) {
                console.log("You need to enter an ID or a quantity");
                anotherBuy();
            } else {
                con.query('SELECT * FROM products WHERE item_id=' + userInput.item_id + ';', function (error, results) {
                    if (error) throw error;
                    if (results[0] === undefined) {
                        console.log("We do not have that.")
                        anotherBuy();
                    }
                    else if (results[0].stock_quantity < userInput.quantity) {
                        console.log("We don't have enough of that to fulfill your request.");
                        anotherBuy();
                    }
                    else {
                        var buyQuantity = userInput.quantity;
                        inquirer.prompt([
                            {
                                name: "answer",
                                type: "list",
                                message: "You want " + userInput.quantity + " " + results[0].product_name +
                                    ". That is " + userInput.quantity * results[0].price + " gold. Is this what you want?"
                                ,
                                choices: ["Yes", "No"]
                            }
                        ])
                            .then(function (userInput) {
                                let newQuantity = results[0].stock_quantity - buyQuantity;
                                if (userInput.answer == "Yes") {
                                    con.query('UPDATE products SET stock_quantity=' + newQuantity + ' WHERE item_id="' + results[0].item_id + '";', function (error, results) {
                                        if (error) throw error;
                                        console.log("Thank you for your purchase.")
                                        anotherBuy();
                                    });
                                }
                                else {
                                    anotherBuy();
                                }
                            })
                    }
                })
            }
        })
}