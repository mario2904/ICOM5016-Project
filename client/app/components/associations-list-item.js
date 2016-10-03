import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';

export default class AssociationsListItem extends Component {
  render () {
    return (
      <Col xs={6} md={3}>
        <Thumbnail src={this.props.association.img} height="100px" width="100px" alt="242x200">
          <h3>{this.props.association.name}</h3>
        </Thumbnail>
      </Col>
    );
  }
}
// For testing...If error
AssociationsListItem.defaultProps = {
  association: {
    name: 'No Porps passed!',
    img: 'http://www.freeiconspng.com/uploads/error-icon-4.png' // Error Icon
  }
};
