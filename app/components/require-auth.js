import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

export default function(ComposedComponent, auth_role) {
  class Authentication extends Component {
    componentWillMount() {
      const { isAuthenticated, role } = this.props;
      if(!isAuthenticated || role !== auth_role)
        browserHistory.push('/');
    }
    componentWillUpdate(nextProps) {
      const { isAuthenticated, role } = nextProps;
      if(!isAuthenticated || role !== auth_role)
        browserHistory.push('/');
    }
    render() {
      return <ComposedComponent {...this.props}/>
    }
  }
  function mapStateToProps(state) {
    const { auth } = state;
    const { isAuthenticated, role } = auth;
    return {
      isAuthenticated,
      role
    };
  }
  return connect(mapStateToProps)(Authentication);
}
