const db = require('./connection');

function getUser(userId, callback) {
  db.any('SELECT * FROM users WHERE userId = $1' , userId)
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err);
    });
}

function addNewUser(newUserObj, callback) {
  db.any('SELECT * FROM users WHERE userId = $1' , newUserObj.userId)
  .then((result) => {
  if(result.length == 0) {
    db.any('INSERT INTO users(userId, name, displayPicture)'+
           ' VALUES($1, $2, $3)',
           [newUserObj.userId, newUserObj.name, newUserObj.displayPicture])
      .then((result) => {
        callback(null, result);
      })
      .catch((err) => {
        callback(err);
      });
    } else {
      callback(null, result);
    }
  });
}

function getUserTasks(tableName, id, curr_date, callback) {
  db.any("SELECT * FROM "+ tableName + " WHERE userId = $1 AND taskDate = $2 ORDER BY fromTime",
         [id, curr_date])
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err);
    });
}

function getAllUsersTask(curr_date, callback) {
  db.any("SELECT users.userId, users.name, users.displayPicture, tasks.taskname, tasks.tasktype, tasks.taskdate, tasks.fromTime, tasks.toTime " +
         "FROM users "+
         "INNER JOIN tasks ON users.userId = tasks.userId " +
         "WHERE taskDate= $1 ORDER BY fromTime" , [curr_date])
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err);
    });
}

function addNewTask(newTaskObj, callback) {
  db.any('INSERT INTO tasks(userId, taskName, taskType, fromTime, toTime)'+
         ' VALUES($1, $2, $3, $4, $5)',
         [newTaskObj.userId, newTaskObj.taskName, newTaskObj.taskType,
         newTaskObj.fromTime, newTaskObj.toTime])
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err);
    });
}

function updateUserTask(updateTaskObj, callback) {
  db.none('UPDATE tasks SET taskName = $3, taskType = $4, fromTime = $5,' +
          'toTime = $6 WHERE userId = $2 AND id = $1',
          [updateTaskObj.id, updateTaskObj.userId, updateTaskObj.taskName,
          updateTaskObj.taskType, updateTaskObj.fromTime, updateTaskObj.toTime])
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err);
    });
}

function deleteTask(userId, id, callback) {
  db.any('DELETE FROM tasks WHERE userId = $1 AND id = $2', [userId, id])
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err);
    });
}

module.exports = {
  getUser,
  addNewUser,
  getUserTasks,
  getAllUsersTask,
  addNewTask,
  updateUserTask,
  deleteTask
}
