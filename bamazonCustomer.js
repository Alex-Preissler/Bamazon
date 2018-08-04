var inquirer = require('inquirer');
var mysql = require('mysql');
var cTable  = require('console.table');

var connection = mysql.createConnection( {
    host: 'localhost',
    port: '3306',
    user: 'Alex-Preissler',
    password: 'Paintball426*',
    database: 'bamazonDB'
});

connection.connect(function(err) {
    if(err) throw(err);

    console.log('Connection ID: ' + connection.threadId + '\n');
    main();
});

function main() {

    var query = connection.query('SELECT * FROM products', function(err, res) {

        if(err) throw(err);

        inquirer.prompt({
            name: 'option',
            type: 'list',
            message: 'Please select an option.',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        })
        .then(function(answer) {

            switch(answer.option){

                case('View Products for Sale'):

                    viewProducts();
                    break;

                case('View Low Inventory'):

                    lowInventory();
                    break;

                case('Add to Inventory'):

                    console.log('add inventory');
                    break;

                case('Add New Product'):

                    console.log('add product');
                    break;

                case('Exit'):

                    process.exit();
            }

            main();

        });
    });
};

function constructTable(res) {

    var resultArray = [];

        for(var i=0; i<res.length; i++){
           
            resultArray[i] = [res[i].id, res[i].product_name, res[i].dept, res[i].price, res[i].stock];

        }

        console.table(['ID', 'Product Name', 'Department', 'Price', 'Stock'], resultArray);

};

function viewProducts() {

    var query = connection.query('SELECT * FROM products ORDER BY dept', function(err, res) {

        if(err) throw(err);

        console.log("\nAll Products: (By Department)");
        console.log("------------------------------------------------------------------------");
        constructTable(res);
    });
};

function lowInventory() {

        var query = connection.query('SELECT * FROM products WHERE stock<5', function(err, res){
            
            if(err) throw(err);

            console.log("\nLow Inventory Report:");
            console.log("------------------------------------------------------------------------");
            constructTable(res);
        });

};

function addInventory() {


};

function addProduct() {


};