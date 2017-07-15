import React, { Component } from 'react';
import TaskRow from './taskRow';
import TaskModal from '../modals/taskModal'

class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTask: null
    }
  }

  handleDeleteTask(userId, id) {
    this.props.handleDelete(userId, id);
  }

  handleUpdateTask(task) {
    this.refs.modal.close();
    this.props.handleUpdate(task);
  }

  handleEditTask(task) {
    this.setState({
      selectedTask: task
    });
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
      rows = <h3 className="no-data">No tasks!!</h3>
    }

    var nameHeader;
    if(tasks.length > 0 && tasks[0].name) {
      nameHeader = <th>User</th>
    }

    return (
      <div>
        <table className="table table-hover">
          <tbody>
            { rows }
          </tbody>
        </table>
        <TaskModal ref="modal" task={this.state.selectedTask} handleAction={this.handleUpdateTask.bind(this)} title="Update Task" />
      </div>
    );
  }
}

export default TaskTable;
