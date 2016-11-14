import React, { Component } from 'react';
import { Link } from 'react-router';
import {Grid, Card, Image, Icon, Item, Segment, Button} from 'semantic-ui-react';

export default class AssociationsListItem extends Component {

  constructor (){
    super();
    this.state={
      color:"blue",
      content:"follow"
    };
  }

  handleOnClick = (e) => this.setState({ color:(this.state.color === "red" ? "blue": "red"),
  content:(this.state.content === "unfollow" ? "follow": "unfollow" )});

  render () {
    const { id, name, initials, profileImage } = this.props.item;
    return (
      <Grid.Column mobile={16} tablet={8} computer={5}>
        {/* Small hack to have fixed sized images (height) inside Thumbnail */}
        {/* object-fit will accept: fill, contain, cover, none, scale-down */}
        <Segment color="black">
        <Item.Group>
         <Item style={{margin:"10px 0px 10px 0px"}}>
          <Image as={Link} to={"/associations/" + id} style={{width:"150px", height:"150px"}} src={profileImage}/>
          <Item.Content>
        <a href={"/associations/" + id}><h5 style={nameStyle}>{initials}</h5></a>
          <Item.Meta style={nameStyle}>{name}</Item.Meta>
        <Item.Description>
          <div>
          <Button
            compact
            style={{verticalAlign: 'middle'}}
            color={this.state.color}
            content={this.state.content}
            icon='user'
            size="tiny"
            onClick={this.handleOnClick}
            label={{ basic: true, color: this.state.color, pointing: 'left', content: '100' }}/>
          </div>
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
  textOverflow: 'ellipsis',
  color: 'black'
}
