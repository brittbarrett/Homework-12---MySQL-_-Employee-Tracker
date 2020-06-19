var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "gopackers12!",
  database: "employee_tracker",
});

connection.connect(function (err) {
  if (err) throw err;
  runTracker();
});

function runTracker() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "View all Employees by Department",
        "View all Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View all Roles",
        "Add Role",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all Employees":
          viewAllEmployees();
          break;

        case "View all Employees by Department":
          viewEmpDept();
          break;

        case "View all Employees by Manager":
          viewEmpMngr();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee":
          updateEmployee();
          break;

        case "Update Employee Role":
          updateEmpRole();
          break;

        case "Update Employee Manager":
          updateEmpMngr();
          break;

        case "View all Roles":
          viewAllRoles();
          break;

        case "Add Role":
          addRole();
          break;
      }
    });
}
