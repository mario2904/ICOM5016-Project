import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      const { isAuthenticated } = this.props;
      if(!isAuthenticated)
        browserHistory.push('/login');
    }
    componentWillUpdate(nextProps) {
      const { isAuthenticated } = nextProps;
      if(!isAuthenticated)
        browserHistory.push('/login');
    }
    render() {
      return <ComposedComponent {...this.props}/>
    }
  }
  function mapStateToProps(state) {
    const { auth } = state;
    return {auth};
  }
  return connect(mapStateToProps)(Authentication);
}
