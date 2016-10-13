import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';

export default class EventsListItem extends Component {
  render () {
    const { id, name, associationName, startDate, endDate, startTime, endTime, location, image } = this.props.item;
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
      <Thumbnail href={"/events/" + id} src={image} alt={name}>
          <hr/>
          <p style={nameStyle} >{name}</p>
          <h4 style={nameStyle}>{associationName}</h4>
          <h6>{startDate} {startDate === endDate ? null: ' - ' + endDate}</h6>
          <h6>{startTime + ' - ' + endTime}</h6>
          <h6 style={nameStyle} >{location}</h6>
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
