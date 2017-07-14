import React, { Component } from 'react';
import Task from '../../models/task';
import TimePicker from './TimePicker';
import TextInput from './TextInput';

class AddTask extends Component {
  constructor(props) {
    super(props);
  }

  clearForm() {
    this.refs.task.resetValue();
    this.refs.type.resetValue();
    this.refs.from.resetTime();
    this.refs.to.resetTime();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  handleClick() {
    console.log("inside handleClick");
    let task;
    if (!this.props.task) {
      task = new Task(null, this.refs.task.getValue(), this.refs.type.getValue(), this.refs.from.getTime(), this.refs.to.getTime());
      console.log(task);
      console.log(task.value);
      this.clearForm();
      //this.props.handleAdd(task.value);
    } else {
      task = new Task(this.props.task.id, this.refs.task.getValue(), this.refs.type.getValue(), this.refs.from.getTime(), this.refs.to.getTime());
      console.log(task);
      console.log(task.value);
      //this.props.handleEdit(task.value);
    }
    this.props.handleAction(task.value);
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
    console.log('insie adtask render');
    const task  = this.props.task || this.formTask();
    console.log(task);
    var buttonText;
    if (this.props.task) {
      buttonText = 'Update';
    } else {
      buttonText = 'Add';
    }
    return (
      <div className="form-inline row add-task-form">
        <TextInput ref="task" defaultValue={task.taskname} width="col-md-6" text="Task"/>
        <TextInput ref="type" defaultValue={task.tasktype} width="col-md-2" text="Tag"/>
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

// <div className="form-group col-md-6">
//   <label className="sr-only" for="task">Task</label>
//   <input type="text" ref="task" defaultValue={task.taskname} className="form-control add-task-input" placeholder="Task" name="task" />
// </div>

// <div className="form-group col-md-2">
//   <label className="sr-only" for="type">Type</label>
//   <input type="text" ref="type" defaultValue={task.tasktype} className="form-control add-task-input" placeholder="Type" name="type" />
// </div>

// <input type="text" ref="to" defaultValue={task.totime} className="form-control" placeholder="To" name="to" />

// <input type="text" ref="from" defaultValue={task.fromtime} className="form-control" placeholder="From" name="from" />


export default AddTask;
