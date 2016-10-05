import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';

export default class EventsListItem extends Component {
  render () {
    const { name, association, startDate, endDate, startHour, endHour, location, img, id, interested } = this.props.item;
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
        <Thumbnail src={img} alt="242x200">
          <hr/>
          <p style={nameStyle} >{name}</p>
          <h4 style={nameStyle} >{association}</h4>
          <h6>{startDate} {startDate === endDate ? null: ' - ' + endDate}</h6>
          <h6>{startHour + ' - ' + endHour}</h6>
          <h6 style={nameStyle} >{location}</h6>
          <h6>People interested: {interested}</h6>
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
