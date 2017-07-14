import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as moment from 'moment/moment';

import { fetchTasks, addTask, deleteTask} from '../../actions/tasksAction';
import TaskTable from '../../components/tables/taskTable';
import AddTask from '../../components/forms/addTask';

class AdminHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.location.pathname.split('/')[2],
      currentDate: moment()
    }

  }

  componentDidMount() {
    console.log("inside HomePage componentWillMount");
    this.props.dispatch({type: "FETCH_TASKS"});
    this.props.dispatch(fetchTasks(this.state.userId, this.state.currentDate.format('YYYY-MM-DD')));
  }

  loadPrevious() {
    let prev = this.state.currentDate.subtract(1, 'days');
    this.setState({
      currentDate: prev
    });
    this.props.dispatch({type: "FETCH_TASKS"});
    this.props.dispatch(fetchTasks(this.state.userId, prev.format('YYYY-MM-DD')));
  }

  loadNext() {
    let next = this.state.currentDate.add(1, 'days');
    this.setState({
      currentDate: next
    });
    this.props.dispatch({type: "FETCH_TASKS"});
    this.props.dispatch(fetchTasks(this.state.userId, next.format('YYYY-MM-DD')));
  }

  isToday() {
    let today = moment().format('YYYY-MM-DD');
    let curr = this.state.currentDate.format('YYYY-MM-DD');
    return moment(today).isSame(curr);
  }

  handleAddTask(task) {
    console.log("In home page handleAddTask");
    addTask(this.state.userId, task)
         .then((response) => {
           console.log("POST success");
           console.log(response);
           this.props.dispatch({type: "FETCH_TASKS"});
           this.props.dispatch(fetchTasks(this.state.userId, this.state.currentDate.format('YYYY-MM-DD')));
         })
         .catch((error) => {
           console.log(error);
         });
  }

  handleDeleteTask(userId, id) {
    deleteTask(userId, id)
        .then((response) => {
          console.log("delete success");
          console.log(response);
          this.props.dispatch({type: "FETCH_TASKS"});
          this.props.dispatch(fetchTasks(this.state.userId, this.state.currentDate.format('YYYY-MM-DD')));
        })
        .catch((error) => {
          console.log(error);
        });
  }

  render() {
    console.log(this.state.userId);
    console.log(this.props.tasks);

    let today = moment().format('YYYY-MM-DD');
    let curr = this.state.currentDate.format('YYYY-MM-DD');
    let flag = moment(today).isSame(curr);

    return (
      <div>
        <div className="container">
             <div className="starter-template">
               <div className="row">
                 <div className="col-md-1" onClick={this.loadPrevious.bind(this)}>
                   <span><i className="fa fa-chevron-left" aria-hidden="true"></i> Prev</span>
                 </div>
                 <div className="col-md-10">
                   <div className="row">
                     <div className="col-md-12 date-header-div">
                       <h2 className="date-header">{ this.state.currentDate.format('dddd, MMMM Do YYYY') }</h2>
                     </div>
                     <div className="col-md-12">
                        <TaskTable tasks={this.props.tasks} handleDelete={this.handleDeleteTask.bind(this)} isToday={flag} />
                     </div>
                     <div className="col-md-12" className={!flag ? 'hide' : ''}>
                        <AddTask handleAdd={this.handleAddTask.bind(this)} />
                     </div>
                   </div>
                 </div>
                 <div className="col-md-1" onClick={this.loadNext.bind(this)} className={flag ? 'hide' : ''}>
                   <span>Next <i className="fa fa-chevron-right" aria-hidden="true"></i></span>
                 </div>
               </div>
             </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.tasks,
    error: state.tasks.error
  }
}

export default connect(mapStateToProps)(AdminHomePage);
