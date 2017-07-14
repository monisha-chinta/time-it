import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as moment from 'moment/moment';

import { fetchAllUsersTasks } from '../../actions/tasksAction';
import TaskTable from '../../components/tables/taskTable';
import AdminNavBar from '../../components/navbar/AdminNavBar';

class UsersTasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.location.pathname.split('/')[2],
      user: JSON.parse(localStorage.getItem('TimeIt-User')),
      currentDate: moment()
    }

  }

  componentDidMount() {
    if(this.state.user && this.state.user.isAdmin) {
      console.log("inside HomePage componentWillMount");
      this.props.dispatch({type: "FETCH_USERS_TASKS"});
      this.props.dispatch(fetchAllUsersTasks(this.state.userId, this.state.currentDate.format('YYYY-MM-DD')));
    } else {
      this.props.history.push('/');
    }
  }

  logout() {
    const FB = window.FB;

    FB.logout(function(response) {
      console.log(response);
    });
  }

  loadPrevious() {
    let prev = this.state.currentDate.subtract(1, 'days');
    this.setState({
      currentDate: prev
    });
    this.props.dispatch({type: "FETCH_USERS_TASKS"});
    this.props.dispatch(fetchAllUsersTasks(this.state.userId, prev.format('YYYY-MM-DD')));
  }

  loadNext() {
    let next = this.state.currentDate.add(1, 'days');
    this.setState({
      currentDate: next
    });
    this.props.dispatch({type: "FETCH_USERS_TASKS"});
    this.props.dispatch(fetchAllUsersTasks(this.state.userId, next.format('YYYY-MM-DD')));
  }

  isToday() {
    let today = moment().format('YYYY-MM-DD');
    let curr = this.state.currentDate.format('YYYY-MM-DD');
    return moment(today).isSame(curr);
  }

  render() {
    console.log("inside users task render");
    console.log(this.state.userId);
    console.log(this.props.tasks);

    let today = moment().format('YYYY-MM-DD');
    let curr = this.state.currentDate.format('YYYY-MM-DD');
    let flag = moment(today).isSame(curr);

    const nextIconClass = flag ? 'hide' : '';

    return (
      <div>
        <AdminNavBar user={this.state.user} showAddTask={false}/>
        <div className="container">
             <div className="starter-template">
               <div className="row">
                 <div className="col-md-1" onClick={this.loadPrevious.bind(this)}>
                   <span><i className="fa fa-caret-left fa-4x" aria-hidden="true"></i></span>
                 </div>
                 <div className="col-md-10">
                   <div className="row">
                     <div className="col-md-12 date-header-div">
                       <h2 className="date-header">{ this.state.currentDate.format('dddd, MMMM Do YYYY') }</h2>
                     </div>
                     <div className="col-md-12">
                        <TaskTable tasks={this.props.tasks} />
                     </div>
                   </div>
                 </div>
                 <div className={'col-md-1 ' + nextIconClass} onClick={this.loadNext.bind(this)} className={flag ? 'hide' : ''}>
                   <span><i className="fa fa-caret-right fa-4x" aria-hidden="true"></i></span>
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

export default connect(mapStateToProps)(UsersTasksPage);
