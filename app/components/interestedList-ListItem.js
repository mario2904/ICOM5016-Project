import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';

export default class InterestedListItem extends Component {
  render () {
    const { name , img} = this.props.item;
    return (
      <Col sm={4} md={4} >
        {/* Small hack to have fixed sized images (height) inside Thumbnail */}
        {/* object-fit will accept: fill, contain, cover, none, scale-down */}
        <style type="text/css">{`
        .thumbnail img {
            height: 200px;
            width: 400px;
            object-fit: fill;
        }
        `}</style>
        <Thumbnail src={img} alt="242x200">
          <hr/>
          <p style={nameStyle} >{name}</p>

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

const imgStyle = {
    height: "80px",
    minHeight: "80px"
}
