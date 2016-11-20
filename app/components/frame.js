import React, { Component } from 'react';

import NavBar from './nav-bar';
import Footer from './footer';

export default class Frame extends Component {
  render () {
    return (
      <div>
        <NavBar/>
        <div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
