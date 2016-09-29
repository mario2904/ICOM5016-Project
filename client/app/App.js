import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import reducers from './reducers';

import Login from './components/login';
import Home from './components/home';
import NavBar from './components/nav-bar';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={NavBar}>
            <IndexRoute component={Login} />
            <Route path="/home" component={Home}></Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}
