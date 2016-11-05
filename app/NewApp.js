import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import reducers from './reducers';

import Login from './new-components/login';
import Frame from './new-components/frame';
import Home from './new-components/home';
import Associations from './new-components/associations';
import Events from './new-components/events'

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);


export default class NewApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Frame}>
            <IndexRoute component={Login} />
            <Route path="/home" component={Home}></Route>
            <Route path="/associations" component={Associations}></Route>
            <Route path="/events" component={Events}></Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}
