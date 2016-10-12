import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import reducers from './reducers';

import Login from './components/login';
import Home from './components/home';
import Associations from './components/associations';
import Events from './components/events';
import Frame from './components/frame';
import Profile from './components/profile';
import UserReg from './components/usersignup';
import AssoReg from './components/associations-signup'

import ProfileAssociation from './components/profile-association';
import CreateEventForm from './components/create-event-form';

import Etest from './components/events-individual'


const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Frame}>
            <IndexRoute component={Login} />
            <Route path="/home" component={Home}></Route>
            <Route path="/events" component={Events}></Route>
            <Route path="/associations" component={Associations}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/signup-student" component={UserReg}></Route>
            <Route path="/signup-association" component={AssoReg}></Route>
            <Route path="/events/:eventID" component ={Etest}></Route>
           <Route path="/profile/associations/:associationID" component={ProfileAssociation}></Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}
