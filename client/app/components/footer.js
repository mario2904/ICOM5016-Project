import React, { Component } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Footer extends Component {
  render () {
    return (
      <Grid fluid>
        <hr />
        <Row>
          <Col md={3}>
            <Link to="#">Help</Link>
          </Col>
          <Col md={3}>
            <Link to="#">About Us</Link>
          </Col>
          <Col md={2} mdOffset={4}>
            <Link to="#">Privacy/Terms</Link>
          </Col>
        </Row>
        <footer>
          <p>© E-Spotter Company 2016</p>
        </footer>
      </Grid>
    );
  }
}
