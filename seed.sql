USE employee_tracker;


-- dept table 
INSERT INTO employee_department(dept_name) 
VALUES ("Oval Office"),("Podcast"), ("C-Suite");


-- role table

INSERT INTO employee_role (title,salary,employee_department_id)
VALUES ("Founder/Chief of Content",1000000,1),
("Host of PMT", 500000,2)("Co-Host of PMT",370000,2), ("Host of CHD", 500000,2), ("CEO",60000,3 );





-- employee table
INSERT INTO employee (full_name, nick_name, role_id, manager_id)
VALUES ("Dave Portnoy", "El Presidente", 1,null),
 ("Dan Katz", "Big Cat", 2,1), ("Eric Sollenberger", "PFT Commenter", 3,1), ("Alexandra Cooper", null,4,1), ("Erika Nardini", null, 5,1);





