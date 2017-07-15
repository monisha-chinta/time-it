import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import AddTask from '../forms/addTask';

class TaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      task: props.task
    }
  }
  close() {
    this.setState({
      show: false
    });
  }

  open(task) {
    this.setState({
      show: true
    });
  }

  handleAction(task) {
    this.props.handleAction(task);
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.close.bind(this)} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddTask task={this.props.task} handleAction={this.handleAction.bind(this)} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default TaskModal;
