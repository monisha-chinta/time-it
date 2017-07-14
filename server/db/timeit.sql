DROP DATABASE IF EXISTS timeit;
CREATE DATABASE timeit;


CREATE TABLE users (
  userId VARCHAR PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  displayPicture VARCHAR
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  userId VARCHAR not null,
  taskName VARCHAR not null,
  taskType VARCHAR,
  taskDate date not null default CURRENT_DATE,
  fromTime time,
  toTime time
);
select * from users;
INSERT INTO users (userId, name, email, displayPicture)
  VALUES ('1234', 'Monisha', 'monisha@gmail.com', 'monisha.jpg');

  INSERT INTO tasks (userId, taskName, taskType, fromTime, toTime)
  VALUES ('1234', 'Clean', 'household' , '20:30', '21:00:20');
  INSERT INTO tasks (userId, taskName, taskType, fromTime, toTime)
  VALUES ('4567', 'commute', 'travel' , '11:20', '12:00');


SELECT *
FROM users
INNER JOIN tasks
ON users.userId = tasks.userId;

SELECT * FROM tasks where taskDate='2017-07-12'
