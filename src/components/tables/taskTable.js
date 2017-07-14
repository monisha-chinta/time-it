import React, { Component } from 'react';
import TaskRow from './taskRow';
import TaskModal from '../modals/taskModal'

class TaskTable extends Component {
  constructor(props) {
    super(props);
  }

  handleDeleteTask(userId, id) {
    this.props.handleDelete(userId, id);
  }

  handleUpdateTask(task) {
    this.refs.modal.close();
    this.props.handleUpdate(task);
  }

  handleEditTask(task) {
    this.refs.modal.open(task);
  }

  render() {
    const {tasks, isToday} = this.props;

    var rows;
    if(tasks.length > 0) {
      rows = tasks.map((task) => {
        return (
          <TaskRow task={task} deleteTask={this.handleDeleteTask.bind(this)} editTask={this.handleEditTask.bind(this)} isToday={isToday} />
        )
      });
    } else {
      rows = <h2 className="no-data">No tasks!!</h2>
    }

    var nameHeader;
    if(tasks.length > 0 && tasks[0].name) {
      nameHeader = <th>User</th>
    }

    return (
      <div>
        <table className="table">
          <tbody>
            { rows }
          </tbody>
        </table>
        <TaskModal ref="modal" handleAction={this.handleUpdateTask.bind(this)} title="Update Task" />
      </div>
    );
  }
}

export default TaskTable;
