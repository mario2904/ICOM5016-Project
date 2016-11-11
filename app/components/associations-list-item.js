import React, { Component } from 'react';
// import { Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';
import {Grid, Card, Image, Icon, Item, Segment} from 'semantic-ui-react';

export default class AssociationsListItem extends Component {
  render () {
    const { id, name, initials, profileImage } = this.props.item;
    return (
      <Grid.Column mobile={16} tablet={8} computer={4}>
        {/* Small hack to have fixed sized images (height) inside Thumbnail */}
        {/* object-fit will accept: fill, contain, cover, none, scale-down */}
        <Segment color="blue">
        <Item.Group
          as={Link} to={"/associations/" + id}>
         <Item style={{margin:"10px 0px 10px 0px"}}>
          <Image style={{width:"150px", height:"150px"}} src={profileImage}/>
          <Item.Content>
        <Item.Header>{initials}</Item.Header>
          <Item.Meta style={nameStyle}>{name}</Item.Meta>
        <Item.Description><Icon name="user" color="blue"></Icon>followers: #
    </Item.Description>
       </Item.Content>
        </Item>
        </Item.Group>
        </Segment>
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
