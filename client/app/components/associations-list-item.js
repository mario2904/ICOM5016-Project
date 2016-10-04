import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';

export default class AssociationsListItem extends Component {
  render () {
    return (
      <Col sm={6} md={3}>
        {/* Small hack to have fixed sized images (height) inside Thumbnail */}
        {/* object-fit will accept: fill, contain, cover, none, scale-down */}
        <style type="text/css">{`
        .thumbnail img {
            height: 200px;
            width: 500px;
            object-fit: fill;
        }
        `}</style>
        <Thumbnail src={this.props.association.img} alt="242x200">
          <hr/>
          <h3>{this.props.association.initials}</h3>
          <h5 style={nameStyle} >{this.props.association.name}</h5>
        </Thumbnail>
      </Col>
    );
  }
}
// For testing...If error. Props not passed
AssociationsListItem.defaultProps = {
  association: {
    initials: 'NPI',
    name: 'No Porps passed!',
    img: 'http://www.freeiconspng.com/uploads/error-icon-4.png' // Error Icon
  }
};
// Fixes Oversizing of the Thumbnail if the name is too long.
const nameStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}
