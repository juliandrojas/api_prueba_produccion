CREATE SEQUENCE employee_id_seq;

CREATE TABLE employees (
    id INT DEFAULT nextval('employee_id_seq') NOT NULL,
    name VARCHAR(45) DEFAULT NULL,
    salary INT DEFAULT NULL,
    PRIMARY KEY (id)
);
select * from employee;
