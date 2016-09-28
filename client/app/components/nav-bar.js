import React, { Component } from 'react';

export default class NavBar extends Component {
  render () {
    return (
      <div>
        <h5> this is the nav-bar </h5>
        {this.props.children}
      </div>
    );
  }
}
