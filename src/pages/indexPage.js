import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { addUser } from '../actions/userAction';

class IndexPage extends Component {

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('TimeIt-User'));
    if(user) {
      this.props.history.push('/home/' + user.userid);
    }
  }

  login(){
    var that = this;
    const FB = window.FB;

    FB.login(function(loginResponse){
      console.log(loginResponse);
      if (loginResponse.status === 'connected') {
        FB.api("https://graph.facebook.com/"+loginResponse.authResponse.userID+"?fields=id,name,email,picture", function(response){
          console.log(response);
          addUser(response).then((res) => {
            console.log("UserDetails");
            console.log(res.data[0]);
            localStorage.setItem('TimeIt-User', JSON.stringify(res.data[0]));
            that.props.history.push('/home/' + response.id);
            // if(res.data[0].isAdmin) {
            //
            //   that.props.history.push('/adminHome/' + response.id);
            // } else {
            //   that.props.history.push('/home/' + response.id);
            // }
          })
          .catch((error) => {
            console.log(error);
          });
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
