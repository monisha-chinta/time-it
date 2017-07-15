import React, { Component } from 'react';
import Task from '../../models/task';
import TimePicker from './TimePicker';
import TextInput from './TextInput';
import { compareTime, checkTimeFormat } from '../../utils/TimeUtils';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
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

  hasError(task) {
   if(task.taskType && task.taskName && task.toTime && task.fromTime) {
     if(task.taskName.length > 255) {
       return 'Task must be less than 255 characters';
     } else if(task.taskType.length > 24) {
       return 'Tag must be less than 24 characters';
     } else if(!checkTimeFormat(task.fromTime)) {
        return 'From time must be of proper time format'
     } else if(!checkTimeFormat(task.toTime)) {
        return 'To time must be of proper time format'
     } else if(compareTime(task.fromTime, task.toTime)) {
       return 'From time must be less than to time';
     }
     return null;
   }
   return 'All fields are mandatory';
  }

  handleClick() {
    let task;
    if (!this.props.task) {
      task = new Task(null, this.refs.task.getValue(), this.refs.type.getValue(), this.refs.from.getTime(), this.refs.to.getTime());
    } else {
      task = new Task(this.props.task.id, this.refs.task.getValue(), this.refs.type.getValue(), this.refs.from.getTime(), this.refs.to.getTime());
    }

    let error = this.hasError(task.value);
    if(!error) {
      this.props.handleAction(task.value);
    } else {
      this.setState({
        error: <span><sup>*</sup> {error}</span>
      })
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
    if (this.props.task) {
      buttonText = 'Update';
    } else {
      buttonText = 'Add';
    }
    return (
      <div>
        <div className="form-inline row add-task-form">
          <TextInput ref="task" defaultValue={task.taskname} width="col-md-6" text="Task"/>
          <TextInput ref="type" defaultValue={task.tasktype} width="col-md-2" text="Tag"/>
          <TimePicker defaultValue={task.fromtime} ref="from" text="From" />
          <TimePicker defaultValue={task.totime} ref="to" text="To" />
          <div className="form-group col-md-1">
            <button onClick={this.handleClick.bind(this)} className="btn modal-button">{ buttonText }</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 modal-error">
            <span className="text-danger">{this.state.error}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTask;
