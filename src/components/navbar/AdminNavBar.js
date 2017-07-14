import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminNavBar extends Component {
  logout() {
    const FB = window.FB;

    FB.logout(function(response) {
      console.log(response);
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
      addTask = <li><a href="#" onClick={ this.openModal.bind(this) }>Add Task</a></li>
    }
    var userid = this.props.user ? this.props.user.userid : '';
    var displaypicture = this.props.user ? this.props.user.displaypicture : '';

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
            <a className="navbar-brand" href="#">TimeIt</a>
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav">
              <li className="active"><Link to={'/home/'+userid}>My Tasks</Link></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Users<span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><Link to={'/admin/'+userid+'/all'}>All Users</Link></li>
                  <li><a href="#">Get User</a></li>
                </ul>
              </li>
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
