import React, { Component } from 'react';
import {Grid, Card, Image, Icon, Item, Segment} from 'semantic-ui-react';

export default class SponsorsListItem extends Component {
  render () {
    const { name, image, id} = this.props.item;
    return (
      <Grid.Column mobile={16} tablet={8} computer={4}>
      <Segment color="black">
       <Image style={{width:"150px", height:"125px", margin:"auto"}} src={image}/>
       <h5>{name}</h5>
      </Segment>
      </Grid.Column>

    );
  }
}
