import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserNavBar extends Component {
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
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#" className="add-task-btn" onClick={ this.openModal.bind(this) }><i className="fa fa-plus" aria-hidden="true"></i> Task</a>
              </li>
              <li className="navbar-profile-pic"><img src={this.props.user.displaypicture} width={40} height={40} /></li>
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

export default UserNavBar;
