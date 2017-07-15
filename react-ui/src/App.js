import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import IndexPage from './pages/indexPage';
import HomePage from './pages/homePage';
import AdminHomePage from './pages/admin/adminHomePage';
import UsersTasksPage from './pages/admin/usersTasks';

import store from './store';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route exact path={'/'} component={IndexPage}></Route>
            <Route path={'/home/:userId'} component={HomePage}></Route>
            <Route path={'/admin/:userId/all'} component={UsersTasksPage}></Route>
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
