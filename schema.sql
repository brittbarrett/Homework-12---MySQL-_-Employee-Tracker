DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;

USE employee_tracker;

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee_department (
  id INT NOT NULL,
  dept_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE employee_role (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DEC(10,4),
  employee_department_id INT,
  PRIMARY KEY (id)
);

SELECT * FROM employee;
SELECT * FROM employee_department;
SELECT * FROM employee_role;
