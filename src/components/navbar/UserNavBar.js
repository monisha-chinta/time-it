import React, { Component } from 'react';

class UserNavBar extends Component {
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
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className="navbar-profile-pic"><img src={this.props.user.displaypicture} width={25} height={25} /></li>
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
