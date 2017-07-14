import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as moment from 'moment/moment';

import { fetchTasks, addTask, updateTask, deleteTask} from '../actions/tasksAction';
import TaskTable from '../components/tables/taskTable';
import AddTask from '../components/forms/addTask';
import UserNavBar from '../components/navbar/UserNavBar';
import AdminNavBar from '../components/navbar/AdminNavBar';
import TaskModal from '../components/modals/taskModal';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.location.pathname.split('/')[2],
      user: JSON.parse(localStorage.getItem('TimeIt-User')),
      currentDate: moment()
    }

  }

  componentDidMount() {
    if(this.state.user) {
      console.log("inside HomePage componentWillMount");
      this.props.dispatch({type: "FETCH_TASKS"});
      this.props.dispatch(fetchTasks(this.state.userId, this.state.currentDate.format('YYYY-MM-DD')));
    } else {
      this.props.history.push('/');
    }
  }

  openModal() {
    this.refs.modal.open();
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
    this.refs.modal.close();

  }

  handleUpdateTask(task) {
    updateTask(this.state.userId, task.id, task)
         .then((response) => {
           console.log("Put success");
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
    console.log("Indise HomePage render");
    console.log(this.state.user);
    console.log(this.state.userId);
    console.log(this.props.tasks);

    let today = moment().format('YYYY-MM-DD');
    let curr = this.state.currentDate.format('YYYY-MM-DD');
    let flag = moment(today).isSame(curr);

    var navbar;

    if(this.state.user && this.state.user.isAdmin) {
        navbar = <AdminNavBar showAddTask={true} user={this.state.user} openModal={this.openModal.bind(this)}  />
    } else if(this.state.user) {
        navbar = <UserNavBar user={this.state.user} openModal={this.openModal.bind(this)} />
    }

    const nextIconClass = flag ? 'hide' : '';
    const showAddTaskClass = !flag ? 'hide' : '';


    return (
      <div>
        {navbar}
        <div className="container">
             <div className="starter-template">
               <div className="row">
                 <div className="col-md-1 center" onClick={this.loadPrevious.bind(this)}>
                   <span><i className="fa fa-caret-left fa-4x" aria-hidden="true"></i></span>
                 </div>
                 <div className="col-md-10">
                   <div className="row">
                     <div className="col-md-12 date-header-div">
                       <h2 className="date-header">{ this.state.currentDate.format('dddd, MMMM Do YYYY') }</h2>
                     </div>
                     <div className="col-md-12">
                        <TaskTable tasks={this.props.tasks} handleDelete={this.handleDeleteTask.bind(this)} handleUpdate={this.handleUpdateTask.bind(this)} isToday={flag} />
                     </div>
                   </div>
                 </div>
                 <div className={'col-md-1 center ' + nextIconClass} onClick={this.loadNext.bind(this)}>
                   <span><i className="fa fa-caret-right fa-4x" aria-hidden="true"></i></span>
                 </div>
               </div>
             </div>
             <TaskModal ref="modal" handleAction={this.handleAddTask.bind(this)} title="Add Task" />
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

export default connect(mapStateToProps)(HomePage);

// <div className={'col-md-12 ' + showAddTaskClass}>
//    <AddTask handleAdd={this.handleAddTask.bind(this)} />
// </div>
