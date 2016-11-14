import React, { Component } from 'react';
import { Link } from 'react-router';
import {Grid, Card, Image, Icon} from 'semantic-ui-react';

export default class EventsListItem extends Component {
  render () {
    const { event_id, event_name, association_name, start_date, end_date, start_time, end_time, room, image_path } = this.props.item;
    return (
      <Grid.Column mobile={14} tablet={8} computer={4}>
      <Card
        as={Link} to={"/events/" + event_id}
        alt={event_name}
        centered
        style= {{backgroundColor:"rgb(255, 255, 255)", width:"100%"}}>
        <Image style={{ width:"500px", height:"200px"}} src={image_path}></Image>
        <Card.Content>
          <Card.Header style={nameStyle}><strong>{event_name}</strong></Card.Header>
          <Card.Meta style={nameStyle}><em>{association_name}</em></Card.Meta>
          <Card.Description style={nameStyle}> {start_date} {start_date === end_date ? null: ' - ' + end_date}
            {start_time + ' - ' + end_time}</Card.Description>
        </Card.Content>
        <Card.Content extra style={{backgroundColor:"rgb(35, 37, 40)"}}>
          <Card.Description style={descriptionStyle}><Icon name="marker"></Icon>{room}</Card.Description>
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

const descriptionStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: "white"
}

const imgStyle = {
    height: "80px",
    minHeight: "80px"
}
