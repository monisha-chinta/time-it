import React, { Component } from 'react';
import { formatFromTo } from '../../utils/TimeUtils';

class TaskRow extends Component {
  constructor(props) {
    super(props);
  }

  deleteTask() {
    let task = this.props.task;
    this.props.deleteTask(task.userid, task.id);
  }

  editTask() {
    this.props.editTask(this.props.task);
  }

  render() {
    const {task, isToday} = this.props;
    var nameCol;
    if(task.name) {
      nameCol = (
        <td className="col-md-2 text-left">
          <img src={task.displaypicture} height={30} width={30} className="user-pic" />
          <span>{task.name}</span>
        </td>
      )
    }
    var time;
    if(task) {
      time = formatFromTo(task.fromtime, task.totime);
    }
    var buttonClass = !isToday ? 'hide' : '';
    return (
      <tr>
        {nameCol}
        <td className={nameCol ? 'col-md-5 text-left' : 'col-md-6 text-left'}>{task.taskname}</td>
        <td className="col-md-2 text-left">{task.tasktype}</td>
        <td className="col-md-2 text-left">{time}</td>
        <td className={nameCol ? 'hide' : 'col-md-1'}>
          <button className={"btn btn-default action-button "+ buttonClass} onClick={this.editTask.bind(this)}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button className={"btn btn-default action-button "+ buttonClass} onClick={this.deleteTask.bind(this)}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    )
  }

}

export default TaskRow;
