import React, { Component } from 'react';
import { Col, Clearfix, Thumbnail } from 'react-bootstrap';

export default class AssociationsListItem extends Component {
  render () {
    return (
      <Col sm={6} md={3}>
        <Thumbnail src={this.props.association.img} alt="242x200">
          <hr/>
          <h3>{this.props.association.initials}</h3>
          <h5 style={nameStyle} >{this.props.association.name}</h5>
        </Thumbnail>
      </Col>
    );
  }
}
// For testing...If error
AssociationsListItem.defaultProps = {
  association: {
    initials: 'NPI',
    name: 'No Porps passed!',
    img: 'http://www.freeiconspng.com/uploads/error-icon-4.png' // Error Icon
  }
};

const nameStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}
