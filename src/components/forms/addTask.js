import React, { Component } from 'react';
import Task from '../../models/task';
import TimePicker from './TimePicker';

class AddTask extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    console.log("inside handleClick");
    if (this.props.handleAdd) {
      let task = new Task(null, this.refs.task.value, this.refs.type.value, this.refs.from.getTime(), this.refs.to.getTime());
      console.log(task);
      console.log(task.value);
      this.props.handleAdd(task.value);
    } else if (this.props.handleEdit) {
      let task = new Task(this.props.task.id, this.refs.task.value, this.refs.type.value, this.refs.from.getTime(), this.refs.to.getTime());
      this.props.handleEdit(task.value);
    }
  }

  formTask() {
    return {
      taskname: '',
      tasktype: '',
      fromtime: '',
      totime: ''
    }
  }

  render() {
    const task  = this.props.task || this.formTask();
    var buttonText;
    if (this.props.handleAdd) {
      buttonText = 'Add Task';
    } else if (this.props.handleEdit) {
      buttonText = 'Update Task';
    }
    return (
      <div className="form-inline row add-task-form">
        <div className="form-group col-md-6">
          <label className="sr-only" for="task">Task</label>
          <input type="text" ref="task" defaultValue={task.taskname} className="form-control add-task-input" placeholder="Task" name="task" />
        </div>
        <div className="form-group col-md-2">
          <label className="sr-only" for="type">Type</label>
          <input type="text" ref="type" defaultValue={task.tasktype} className="form-control add-task-input" placeholder="Type" name="type" />
        </div>
        <div className="form-group col-md-1 add-task-time">
          <label className="sr-only" for="from">From</label>
          <TimePicker defaultValue={task.fromtime} ref="from" />
        </div>
        <div className="form-group col-md-1 add-task-time">
          <label className="sr-only" for="to">To</label>
          <TimePicker defaultValue={task.totime} ref="to" />
        </div>
        <div className="form-group col-md-1">
          <button onClick={this.handleClick.bind(this)} className="btn btn-default">{ buttonText }</button>
        </div>
      </div>
    );
  }
}

// <input type="text" ref="to" defaultValue={task.totime} className="form-control" placeholder="To" name="to" />

// <input type="text" ref="from" defaultValue={task.fromtime} className="form-control" placeholder="From" name="from" />


export default AddTask;
