var q = require('./db/queries.js');
const path = require('path');

module.exports = function(app) {

app.get('/user/:userId', function(req, res) {
  var userId = req.params.userId;

  q.getUser(userId, (err, result) => {
    if (err) {
      res.status(404).send({
        message: 'Someting went wrong with database'
      });
    } else {
      if(result.length == 0) {
        return res.send("");
      }
      res.send(result[0]);
    }
  });
});

app.post('/user', function(req, res) {
  const newUser = {
    userId: req.body.userId,
    name: req.body.name,
    displayPicture: req.body.displayPicture,
  };

  q.addNewUser(newUser, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).send({
        message: 'Someting went wrong with database'
      });
    } else {
      res.send(result);
    }
  });
});

app.get('/home/:userId/:date', function(req, res) {
  var userId = req.params.userId;
  var curr_date = req.params.date;
  q.getUserTasks('tasks',userId, curr_date, (err, result) => {
      if (err) {
        res.status(404).send({
          message: 'Someting went wrong with database'
        });
      } else {
        res.send(result);
      }
    });
});

app.get('/admin/:userId/:date', function(req, res) {
  var userId = req.params.userId;
  var curr_date = req.params.date;
  q.getAllUsersTask(curr_date, (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).send({
          message: 'Someting went wrong with database'
        });
      } else {
        res.send(result);
      }
    });
});

app.post('/home/:userId', function(req, res) {
  const newTask = {
    userId: req.params.userId,
    taskName: req.body.taskName,
    taskType: req.body.taskType,
    taskDate: req.body.taskDate,
    fromTime: req.body.fromTime,
    toTime: req.body.toTime
  };

  q.addNewTask(newTask, (err, result) => {
    if (err) {
      res.status(404).send({
        message: 'Someting went wrong with database'
      });
    } else {
      res.send(result);
    }
  });

});

app.put('/home/:userId/:id', function(req, res) {
  const updateTask = {
    id: req.params.id,
    userId: req.params.userId,
    taskName: req.body.taskName,
    taskType: req.body.taskType,
    fromTime: req.body.fromTime,
    toTime: req.body.toTime
  };
  q.updateUserTask(updateTask, (err, result) => {
    if (err) {
      res.status(404).send({
        message: 'No task found with id'
      });
    } else {
      res.send(result);
    }
  });
});

app.delete('/home/:userId/:id', function(req, res) {
  var userId = req.params.userId;
  var id = req.params.id;

  q.deleteTask(userId, id, (err, result) => {
    if (err) {
      console.log(err);;
    } else {
      res.send(result);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-ui/build/index.html'));
});

}
