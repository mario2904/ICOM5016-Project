import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import reducers from './reducers';

import HomeStudent from './containers/home-student';
import HomeAssociation from './containers/home-association';

import ProfileAssociation from './containers/profile-association';
import ProfileStudent from './containers/profile-student';
import ProfileEvent from './containers/profile-event';

import Login from './containers/login';
import Associations from './components/associations';
import Events from './components/events';
import Frame from './components/frame';
import UserReg from './components/usersignup';
import AssoReg from './components/associations-signup';

import Administrator from './components/administrator';
import AdministratorTableAssociations from './components/administrator-table-associations';
import AdministratorTableStudents from './components/administrator-table-students';
import AdministratorTableEvents from './components/administrator-table-events';


import CreateEventForm from './components/create-event-form';

import Settings from './components/settings';


import EventStats from './components/event-stats';

const createStoreWithMiddleware = applyMiddleware(apiMiddleware, thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

// Function to scroll to top of window when routing
// to a new destination.
function handleUpdate() {
  let {
    action
  } = this.state.location;

  if (action === 'PUSH') {
    window.scrollTo(0, 0);
  }
}


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} onUpdate={handleUpdate}>
          <Route path="/" component={Frame}>
            <IndexRoute component={Login} />
            <Route path="/home-student" component={HomeStudent}></Route>
            <Route path="/home-association" component={HomeAssociation}></Route>
            <Route path="/students/:userID" component={ProfileStudent}></Route>
            <Route path="/associations/:associationID" component={ProfileAssociation}></Route>
            <Route path="/events/:eventID" component={ProfileEvent}></Route>

            <Route path="/events" component={Events}></Route>
            <Route path="/associations" component={Associations}></Route>
            <Route path="/signup-student" component={UserReg}></Route>
            <Route path="/signup-association" component={AssoReg}></Route>
            <Route path="/event-stats/:eventID" component={EventStats}></Route>
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
