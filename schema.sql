DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;

USE employee_tracker;

CREATE TABLE employee_department (
  id INT NOT NULL auto_increment,
  dept_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE employee_role (
  id INT NOT NULL auto_increment,
  title VARCHAR(30),
  salary DEC(10,4),
  employee_department_id INT,
  constraint fk_employee_department foreign key (employee_department_id) references employee_department (id),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL auto_increment,
  full_name VARCHAR(30) NOT NULL,
  nick_name VARCHAR(30) NOT NULL,
  role_id INT,
  constraint fk_employee_role foreign key (role_id) references employee_role (id),
  manager_id INT,
  constraint fk_employee foreign key (manager_id) references employee (id),
  PRIMARY KEY (id)
);


-- SELECT * FROM [employee] JOIN employee_department ON [employee].id = employee_department.id