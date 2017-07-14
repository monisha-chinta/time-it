import React, { Component } from 'react';

class AddTask extends Component {
  constructor(props) {
    super(props);
  }
  addTask() {
    let task = {
      taskName: this.refs.task.value,
      taskType: this.refs.type.value,
      fromTime: this.refs.from.value,
      toTime: this.refs.to.value
    }
    console.log(task);
    this.props.handleAdd(task);
  }

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          <label className="sr-only" for="task">Task</label>
          <input type="text" ref="task" className="form-control" placeholder="Task" name="task" />
        </div>
        <div className="form-group">
          <label className="sr-only" for="type">Type</label>
          <input type="text" ref="type" className="form-control" placeholder="Type" name="type" />
        </div>
        <div className="form-group">
          <label className="sr-only" for="from">From</label>
          <input type="text" ref="from" className="form-control" placeholder="From" name="from" />
        </div>
        <div className="form-group">
          <label className="sr-only" for="to">To</label>
          <input type="text" ref="to" className="form-control" placeholder="To" name="to" />
        </div>
        <button onClick={this.addTask.bind(this)} className="btn btn-default">Add Task</button>
      </div>
    );
  }
}

export default AddTask;
