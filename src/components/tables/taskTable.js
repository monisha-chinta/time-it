import React, { Component } from 'react';
import TaskRow from './taskRow';

class TaskTable extends Component {
  constructor(props) {
    super(props);
  }

  handleDeleteTask(userId, id) {
    this.props.handleDelete(userId, id);
  }

  render() {
    const {tasks, isToday} = this.props;

    var rows = tasks.map((task) => {
      return (
        <TaskRow task={task} deleteTask={this.handleDeleteTask.bind(this)} isToday={isToday} />
      )
    })

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Task Type</th>
            <th>From</th>
            <th>To</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  }
}

export default TaskTable;
