import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';

export default class AssociationsListItem extends Component {
  render () {
    return (
      <Col sm={5} md={3}>
        {/* Small hack to have fixed sized images (height) inside Thumbnail */}
        {/* object-fit will accept: fill, contain, cover, none, scale-down */}
        <style type="text/css">{`
        .thumbnail img {
            height: 200px;
            width: 500px;
            object-fit: fill;
        }
        `}</style>
        <Thumbnail src={this.props.item.img} alt="242x200">
          <hr/>
          <h3>{this.props.item.initials}</h3>
          <h5 style={nameStyle} >{this.props.item.name}</h5>
        </Thumbnail>
      </Col>
    );
  }
}

// Fixes Oversizing of the Thumbnail if the name is too long.
const nameStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}
