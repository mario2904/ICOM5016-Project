import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';

export default class AssociationsListItem extends Component {
  render () {
    const { id, name, initials, profileImage } = this.props.item;
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
      <Thumbnail href={"/associations/" + id} src={profileImage} alt="242x200"
        style= {{backgroundColor:"rgb(247, 247, 247)"}}>
          <hr/>
          <h3><strong>{initials}</strong></h3>
          <h5 style={nameStyle} >{name}</h5>
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
