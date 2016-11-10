import React, { Component } from 'react';
import { Link } from 'react-router';
import {Grid, Card, Image, Icon} from 'semantic-ui-react';

export default class EventsListItem extends Component {
  render () {
    const { id, name, associationName, startDate, endDate, startTime, endTime, location, image } = this.props.item;
    return (
      <Grid.Column mobile={16} tablet={8} computer={4}>
      <Card
        as={Link} to={"/events/" + id}
        alt={name}
        centered
        style= {{backgroundColor:"rgb(255, 255, 255)"}}>
        <Image style={{ width:"500px", height:"200px"}} src={image}></Image>
        <Card.Content>
          <Card.Header style={nameStyle}><strong>{name}</strong></Card.Header>
          <Card.Meta style={nameStyle}><em>{associationName}</em></Card.Meta>
          <Card.Description style={nameStyle}> {startDate} {startDate === endDate ? null: ' - ' + endDate}
            {startTime + ' - ' + endTime}</Card.Description>
        </Card.Content>
        <Card.Content style={{backgroundColor:"rgb(242, 242, 242)"}}extra>
          <Card.Description style={nameStyle}><Icon name="marker" color="red"></Icon>{location}</Card.Description>
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
