import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch, HashRouter } from 'react-router-dom';
import logo from './logo.svg';
import Login from './components/login.js';
import Profile from './components/profile.js';
import Decision from './components/decision.js';
import Groups from './components/groups.js';
import GroupEdit from './components/groupEdit.js';
import WhereToEat from './components/whereToEat.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <Router>
          {<Switch>
            <Route exact path="/"                       component={Login} />
            <Route exact path="/login"                  component={Login} />
            <Route exact path="/profile"                component={Profile} />
            <Route exact path="/groups"                 component={Groups} />
            <Route exact path="/group/edit/:groupName"  component={GroupEdit}/>
            <Route exact path="/group/add"              component={GroupEdit}/>
            <Route exact path="/where2eat"              component={WhereToEat} />
            <Route exact path="/decision"               component={Decision} />
          </Switch>
          }
        </Router>
      </div>
    );
  }
}

export default App;
