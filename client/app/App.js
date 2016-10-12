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
            <Route path="/userregister" component={UserReg}></Route>//CAMBIAAAAAAAAAAAAAARRRRRRRR
            <Route path="/assoregister" component={AssoReg}></Route>//CAMBIAAAAAAAAAAAAAARRRRRRRR
            <Route path="/eventsTest" component ={Etest}></Route>

          </Route>
        </Router>
      </Provider>
    );
  }
}
