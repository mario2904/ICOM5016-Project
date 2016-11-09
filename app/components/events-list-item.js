import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';
import {Grid, Card, Image, Icon} from 'semantic-ui-react';
export default class EventsListItem extends Component {
  render () {
    const { id, name, associationName, startDate, endDate, startTime, endTime, location, image } = this.props.item;
    return (

      <Grid.Column computer={4} mobile={16}>
        {/* Small hack to have fixed sized images (height) inside Thumbnail */}
        {/* object-fit will accept: fill, contain, cover, none, scale-down */}

      <Card href={"/events/" + id} alt={name}
        style= {{backgroundColor:"rgb(247, 247, 247)", margin:"25px 0px 25px 0px"}}>
        <Image style={{ width:"500px", height:"200px"}} src={image}></Image>
        <Card.Content>
          <Card.Header style={nameStyle}><strong>{name}</strong></Card.Header>
          <Card.Meta style={nameStyle}><em>{associationName}</em></Card.Meta>
          <Card.Description style={nameStyle}> {startDate} {startDate === endDate ? null: ' - ' + endDate}
            {startTime + ' - ' + endTime}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Description style={nameStyle}><Icon name="marker" color="red"></Icon> {location}</Card.Description>
        </Card.Content>

        </Card>
      </Grid.Column>
      
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
