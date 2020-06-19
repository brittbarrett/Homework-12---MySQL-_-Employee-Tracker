// dependancies
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_tracker",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  //runTracker();
});

function runTracker() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all Employees by Nickname",
        "View all Employees by Full Name",
        "View all Employees by Department",
        "Add Employee",
        "Remove Employee",
        "Update Employee",
        "Update Employee Role",
        "View all Roles",
        "Add Role",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all Employees by Nickname":
          viewAllNickname();
          break;

        case "View all Employees by Full Name":
          viewAllFullName();
          break;

        case "View all Employees by Department":
          viewEmpDept();
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

function viewAllNickname() {
  console.log("Retrieving people that have a fun name...\n");
  connection.query("SELECT nick_name FROM employee", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table([{}]);
    connection.end();
  });
}

function viewAllFullName() {
  console.log("Retrieving our professional names...\n");
  connection.query("SELECT full_name FROM employee", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

function viewEmpDept() {
  console.log("Retrieving our people based on department...\n");
  connection.query("SELECT dept_name FROM employee_department", function (
    err,
    res
  ) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

function addEmployee() {
  console.log("Adding a member to our team...\n");
  var query = connection.query(
    "INSERT INTO employee SET ?",
    {
      full_name: "",
      nick_name: "",
      role_id: "",
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee added!\n");
      // Call updateemployee AFTER the INSERT completes
      updateEmployee();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function removeEmployee() {
  console.log("Trimming the fat...\n");
  connection.query(
    "DELETE FROM employee WHERE ?",
    {
      full_name: "",
      nick_name: "",
      role_id: "",
      manager_id: "",
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee deleted!\n");
      // Call viewallfullname AFTER the DELETE completes
      viewAllFullName();
    }
  );
}

function updateEmployee() {
  console.log("Updating the employee you selected...\n");
  var query = connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
      {
        full_name: "",
      },
      {
        nick_name: "",
      },
    ],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee updated!\n");

      //   DO WE HAVE TO DO THIS?
      //   // Call deleteProduct AFTER the UPDATE completes
      //   deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateEmpRole() {
  console.log("Updating employee role...\n");
  var query = connection.query(
    "UPDATE employee_role SET ? WHERE ?",
    [
      {
        title: "",
      },
      {
        salary: "",
      },
    ],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee_role updated!\n");
      //   // Call deleteProduct AFTER the UPDATE completes
      //   deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function viewAllRoles() {
  connection.query("SELECT title FROM employee_role", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

function addRole() {
  console.log("Adding new role to the list...\n");
  var query = connection.query(
    "INSERT INTO employee_role SET ?",
    {
      title: "",
      salary: "",
      employee_dept_id: "50",
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateemployeerole AFTER the INSERT completes
      updateEmpRole();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}
