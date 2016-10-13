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
import AssoReg from './components/associations-signup';

import Administrator from './components/administrator';
import AdministratorTableAssociations from './components/administrator-table-associations';
import AdministratorTableStudents from './components/administrator-table-students';
import AdministratorTableEvents from './components/administrator-table-events';

import ProfileAssociation from './components/profile-association';
import CreateEventForm from './components/create-event-form';

import Etest from './components/events-individual'

import Settings from './components/settings'


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
            <Route path="/associations/:associationID" component={ProfileAssociation}></Route>
            <Route path="/create-event" component={CreateEventForm}></Route>
            <Route path="/settings" component={Settings}></Route>
            <Route path="/administrator" component={Administrator}></Route>
            <Route path="/administrator/associations" component={AdministratorTableAssociations}></Route>
            <Route path="/administrator/students" component={AdministratorTableStudents}></Route>
            <Route path="/administrator/events" component={AdministratorTableEvents}></Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}
