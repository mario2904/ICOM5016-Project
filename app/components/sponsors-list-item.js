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

      // <Col sm={6} md={3}>
      //   {/* Small hack to have fixed sized images (height) inside Thumbnail */}
      //   {/* object-fit will accept: fill, contain, cover, none, scale-down */}
      //   <style type="text/css">{`
      //   .thumbnail img {
      //       height: 200px;
      //       width: 500px;
      //       object-fit: fill;
      //   }
      //   `}</style>
      // <Thumbnail src={image} alt="242x200">
      //     <hr/>
      //     <p style={nameStyle}>{name}</p>
      //   </Thumbnail>
      // </Col>
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
