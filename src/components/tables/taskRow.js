import React, { Component } from 'react';

class TaskRow extends Component {
  constructor(props) {
    super(props);
  }

  deleteTask() {
    let task = this.props.task;
    this.props.deleteTask(task.userid, task.id);
  }

  render() {
    const {task, isToday} = this.props;

    return (
      <tr>
        <td>{task.taskname}</td>
        <td>{task.tasktype}</td>
        <td>{task.fromtime}</td>
        <td>{task.totime}</td>
        <td>
          <button className="btn btn-default" onClick={this.deleteTask.bind(this)} className={!isToday ? 'hide' : ''}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    )
  }

}

export default TaskRow;
