import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminNavBar extends Component {
  logout() {
    const FB = window.FB;

    FB.logout(function(response) {
      console.log(response);
    });
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
            <a className="navbar-brand" href="#">TimeIt</a>
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav">
              <li className="active"><Link to={'/home/'+this.props.user.userid}>My Tasks</Link></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Users<span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><Link to={'/admin/'+this.props.user.userid+'/all'}>All Users</Link></li>
                  <li><a href="#">Get User</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
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

export default AdminNavBar;
