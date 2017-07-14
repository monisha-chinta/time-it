import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import AddTask from '../forms/addTask';

class TaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      task: null
    }
  }
  close() {
    this.setState({
      show: false
    });
  }

  open(task) {
    this.setState({
      show: true,
      task: task
    });
  }

  handleAction(task) {
    this.props.handleAction(task);
  }

  render() {
    console.log(this.state.task);
    return (
      <div>
        <Modal show={this.state.show} onHide={this.close.bind(this)} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddTask task={this.state.task} handleAction={this.handleAction.bind(this)} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default TaskModal;
