import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';
import {Grid, Card, Image} from 'semantic-ui-react';
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
      <Card href={"/events/" + id} alt={name}
        style= {{backgroundColor:"rgb(247, 247, 247)"}}>
        <Image src={image} size ="medium"></Image>
          <Card.Header><strong>{name}</strong></Card.Header>
          <Card.Meta><em>{associationName}</em></Card.Meta>
          <Card.Description>
            <h6>{startDate} {startDate === endDate ? null: ' - ' + endDate}</h6>
            <h6>{startTime + ' - ' + endTime}</h6>
            <h6 style={nameStyle} >{location}</h6>

            </Card.Description>
        </Card>
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
