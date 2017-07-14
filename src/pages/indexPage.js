import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class IndexPage extends Component {
  login(){
    var that = this;
    const FB = window.FB;

    FB.login(function(loginResponse){
      console.log(loginResponse);
      if (loginResponse.status === 'connected') {
        FB.api("https://graph.facebook.com/"+loginResponse.authResponse.userID+"?fields=id,name,email,picture", function(response){
          // that.user = new User(response.id, response.name, response.picture.data.url);
          // that.getUser(that.user);
          console.log(response);
          that.props.history.push('/home/' + response.id);
        });
      } else {
        console.log("not connected");
      }
    });
	}
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">TimeIt</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={ this.login.bind(this) }>Login</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default IndexPage;
