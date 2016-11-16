import React, { Component } from 'react';
import {Grid, Card, Image, Icon, Item, Segment} from 'semantic-ui-react';

export default class SponsorsListItem extends Component {
  render () {
    const { sponsor_name, image_path, sponsor_id, page_link} = this.props.item;
    return (
      <Grid.Column mobile={16} tablet={8} computer={4}>
      <Segment color="black">
       <Image style={{width:"150px", height:"125px", margin:"auto"}} src={image_path}/>
       <h5>{sponsor_name}</h5>
      </Segment>
      </Grid.Column>

    );
  }
}
