import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { addUser } from '../actions/userAction';

class IndexPage extends Component {

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('timeitUser'));
    if(user) {
      this.props.history.push('/home/' + user.userid);
    }
  }

  login(){
    var that = this;
    const FB = window.FB;

    FB.login(function(loginResponse){
      if (loginResponse.status === 'connected') {
        FB.api("https://graph.facebook.com/"+loginResponse.authResponse.userID+"?fields=id,name,email,picture", function(response){
          addUser(response).then((res) => {
            // Save user data to the current local store
            localStorage.setItem("timeitUser", JSON.stringify(res.data));

            var user = JSON.parse(localStorage.getItem('timeitUser'));
            that.props.history.push('/home/' + user.userid);
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
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <div className="cover-container">
            <div className="masthead clearfix">
              <div className="inner">
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
                        <li><a href="#" onClick={ this.login.bind(this) }><i className="fa fa-facebook-official" aria-hidden="true"></i> Login</a></li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>

            <div className="inner cover">
              <h1 className="cover-heading">Task Management Made Simple</h1>
              <p className="lead">
                Manage tasks with time. Categorize tasks by tags.
              </p>
              <p className="lead">
                <a href="#" className="btn btn-lg btn-default" onClick={ this.login.bind(this) }>Get Started</a>
              </p>
            </div>

            <div className="row coming-soon">
              <div className="col-lg-12">
                <p className="lead">Coming Soon...</p>
              </div>
              <div className="col-lg-4">
                <div><i className="fa fa-envelope fa-4x" aria-hidden="true"></i></div>
                <h4>Email Tasks</h4>
                <p>Email daily tasks</p>
              </div>
              <div className="col-lg-4">
                <div><i className="fa fa-pie-chart fa-4x" aria-hidden="true"></i></div>
                <h4>Reports</h4>
                <p>Visualize time spent on tasks</p>
              </div>
              <div className="col-lg-4">
                <div><i className="fa fa-file-text-o fa-4x" aria-hidden="true"></i></div>
                <h4>Upload Files</h4>
                <p>Upload and attach files to tasks</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default IndexPage;
