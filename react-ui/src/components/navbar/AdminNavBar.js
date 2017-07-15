import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminNavBar extends Component {
  logout() {
    const FB = window.FB;

    FB.logout(function(response) {
    });
    localStorage.removeItem('TimeIt-User');
  }

  openModal(e) {
    e.preventDefault();
    this.props.openModal();
  }

  render() {
    var addTask;
    if(this.props.showAddTask) {
      addTask = <li><a href="#" className="add-task-btn" onClick={ this.openModal.bind(this) }><i className="fa fa-plus" aria-hidden="true"></i> Task</a></li>
    }
    var userid = this.props.user ? this.props.user.userid : '';
    var displaypicture = this.props.user ? this.props.user.displaypicture : '';


    var usersClass = this.props.url.indexOf('home') != -1 ? 'active' : '';
    var myTasksClass = this.props.url.indexOf('admin') != -1 ? 'active' : '';

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to={'/'}>TimeIt</Link>
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav">
              <li className={usersClass}><Link to={'/home/'+userid}>My Tasks</Link></li>
              <li className={myTasksClass}><Link to={'/admin/'+userid+'/all'}>Users</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              { addTask }
              <li className="navbar-profile-pic"><img src={displaypicture} width={40} height={40} /></li>
              <li>
                <a href="#" onClick={ this.logout.bind(this) }>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}

export default AdminNavBar;
