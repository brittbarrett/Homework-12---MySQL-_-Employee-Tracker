// dependancies
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

// connection to database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_tracker",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runTracker();
});

// function to start the app
function runTracker() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "View all Roles",
        "View all Departments",
        "Add Department",
        "Add Employee",
        "Add Role",
        "Remove Employee",
        "Remove Department",
        "Remove Role",
        // "Update Employee Information",
        // "Update Employee Role",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all Employees":
          viewAllEmp();
          break;

        case "View all Roles":
          viewAllRoles();
          break;

        case "View all Departments":
          viewAllDepts();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Remove Department":
          removeDept();
          break;

        case "Remove Role":
          removeRole();
          break;

        // case "Update Employee Information":
        //   updateEmpInfo();
        //   break;

        // case "Update Employee Role":
        //   updateEmpRole();
        //   break;
      }
    });
}

// empty array to store the employee table by name
// emplTablebyname = []

// VIEW ALL EMPLOYEES
function viewAllEmp() {
  console.log("Retrieving all employees...\n");

  //make a connection to db to get all department name with innerjoin
  //then add on to res
  var query =
    "SELECT employee.id, full_name, nick_name, role_id, manager_id, title FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id";
  connection.query(query, function (err, res) {
    // use a filter to fill up employee table by name and include id

    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    runTracker();
  });
}

// VIEW ALL ROLES
function viewAllRoles() {
  console.log("Retrieving all roles ...\n");
  connection.query("SELECT title FROM employee_role", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    runTracker();
  });
}

// VIEW ALL DEPARTMENTS
function viewAllDepts() {
  console.log("Retrieving all departments ...\n");
  connection.query("SELECT dept_name FROM employee_department", function (
    err,
    res
  ) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    runTracker();
  });
}

// ADD DEPARTMENT
function addDepartment() {
  //ask user what dept to add
  inquirer
    .prompt([
      {
        name: "newDept",
        type: "input",
        message: "What department would you like to add to Barstool?",
      },
    ])
    .then(function (answer) {
      console.log("Adding department to network...\n");
      // insert the new department from the user into the employee_department table in the db
      var query = connection.query(
        "INSERT INTO employee_department SET ?",
        {
          dept_name: answer.newDept,
        },
        function (err, res) {
          if (err) throw err;

          console.log(res.affectedRows + " department added!\n");
          // logs the actual query being run
          console.table(viewAllDepts());
          runTracker();
        }
      );
    });
}

// ADD EMPLOYEE
function addEmployee() {
  // ask user who they would like to add
  inquirer
    .prompt([
      {
        name: "fullName",
        type: "input",
        message: "What is the full name of your new employee for Barstool?",
      },
      {
        name: "nickName",
        type: "input",
        message: "What is the nickname of your new employee for Barstool?",
      },
      // {
      //   name: "managerID",
      //   type: "rawlist",
      //   message: "Who is this new employee's manager?,
      //   choices: [

      //   ]
      // }
      // { how to add role into table as well...
      //   name: "newEmpRole",
      //   type: "rawlist",
      //   message: "What title would you like to give our new employee at Barstool?",
      //   choices: [

      //   ]
      // }
    ])
    .then(function (answer) {
      console.log("Adding a member to our team...\n");
      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          full_name: answer.fullName,
          nick_name: answer.nickName,
          // role_id: answer.newEmpRole,
          // manager_id: answer.managerID
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee added!\n");
        }
      );

      // logs the actual query being run
      console.table(viewAllEmp());
      runTracker();
    });
}

// ADD ROLE
function addRole() {
  inquirer
    .prompt([
      {
        name: "newtitle",
        type: "input",
        message: "What title would you like to add at Barstool?",
      },
      {
        name: "newSalary",
        type: "input",
        message: "What is the salary of this new role?",
      },
    ])
    .then(function (answer) {
      console.log("Adding new role to the list...\n");
      var query = connection.query(
        "INSERT INTO employee_role SET ?",
        {
          title: answer.newtitle,
          salary: answer.newSalary,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " role added!\n");
        }
      );

      // logs the actual query being run
      console.table(viewAllRoles());
      runTracker();
    });
}

// REMOVE EMPLOYEE
function removeEmployee() {
  inquirer
    .prompt([
      {
        name: "removeEmp",
        type: "rawlist",
        message:
          "Who would you like to cut from the Barstool team? Please give the full name.",
        choices: [],
      },
    ])
    .then(function (answer) {
      console.log("Trimming the fat...\n");
      connection.query(
        "DELETE FROM employee WHERE ?",
        {
          full_name: answer.removeEmp,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee deleted!\n");
          // Call view all employees AFTER the DELETE completes
          console.table(viewAllEmp());
          runTracker();
        }
      );
    });
}

// REMOVE DEPARTMENT
function removeDept() {
  inquirer
    .prompt([
      {
        name: "removeDep",
        type: "rawlist",
        message:
          "Which department would you like to remove from Barstool's list?",
        choices: [],
      },
    ])
    .then(function (answer) {
      console.log("Deleting department......\n");
      connection.query(
        "DELETE FROM employee_department WHERE ?",
        {
          dept_name: answer.removeDep,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " department deleted!\n");
          // Call viewalldepartments AFTER the DELETE completes
          console.table(viewAllDepts());
          runTracker();
        }
      );
    });
}

// REMOVE ROLE
function removeRole() {
  inquirer
    .prompt([
      {
        name: "removeRol",
        type: "rawlist",
        message: "Which role would you like to remove from Barstool's list?",
        choices: [],
      },
    ])
    .then(function (answer) {
      console.log("Deleting role......\n");
      connection.query(
        "DELETE FROM employee_role WHERE ?",
        {
          title: answer.removeRol,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " role deleted!\n");
          // Call viewallroles AFTER the DELETE completes
          console.table(viewAllRoles());
          runTracker();
        }
      );
    });
}

// UPDATE EMPLOYEE
// function updateEmpInfo() {
//   var query = connection.query("SELECT * FROM employee", function (
//     err,
//     results
//   ) {
//     if (err) throw err;
//     inquirer
//       .prompt([
//         {
//           name: "updateEmp",
//           type: "rawlist",
//           choices: function () {
//             var empArray = [];
//             for (var i = 0; i < results.length; i++) {
//               empArray.push(results[i].full_name);
//             }
//             return empArray;
//           },
//           message:
//             "Who would you like to update information on from the Barstool team?",
//         },
//         {
//           name: "toChange",
//           type: "rawlist",
//           choices: [],
//         },
//       ])
//       .then(function (answer) {
//         var chosenEmp;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].full_name === answer.updateEmp) {
//             chosenEmp = results[i];
//           }
//         }
//       }).then;
//   });

//   console.log("Updating the employee you selected...\n");
//   var query = connection.query(
//     "UPDATE employee SET ? WHERE ?",
//     [
//       {
//         full_name: "",
//       },
//       {
//         nick_name: "",
//       },
//     ],
//     function (err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " employee updated!\n");
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// UPDATE EMPLOYEE ROLE
// function updateEmpRole() {
//   console.log("Updating employee role...\n");
//   var query = connection.query(
//     "UPDATE employee_role SET ? WHERE ?",
//     [
//       {
//         title: "",
//       },
//       {
//         salary: "",
//       },
//     ],
//     function (err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " employee_role updated!\n");
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }
