import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ReviewUpdateItem extends Component {
  render () {
    return (
      <ListGroup >
        <ListGroupItem><h4> <strong>{this.props.name}</strong></h4></ListGroupItem>
        <ListGroupItem>
          <p>{this.props.review}</p>
        </ListGroupItem>
      </ListGroup>
    );
  }
}
