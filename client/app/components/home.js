import React, { Component } from 'react';
import { Button, PageHeader, Jumbotron } from 'react-bootstrap';

export default class Home extends Component {
  render () {
    return (
      <div>
        <PageHeader>Welcome to E-Spotter!</PageHeader>
          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <p><Button bsStyle="primary">Learn more</Button></p>
          </Jumbotron>
      </div>
    );
  }
}
