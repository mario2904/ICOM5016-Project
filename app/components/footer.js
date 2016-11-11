import React, { Component } from 'react';
import { Link } from 'react-router';

import { Menu, Segment, Icon, Grid, Dropdown } from 'semantic-ui-react';

export default class Footer extends Component {
  render () {
    return (
      <Grid padded centered style={{height:"100px"}}>
        <Grid.Row style={{padding:"35px 0px 0px 0px"}}color="black" columns={4}>
          <Grid.Column>
            <h5><Icon color="blue"name="copyright"></Icon>E-Spotter</h5>
          </Grid.Column>
          <Grid.Column>
            <Link style={{color:"white"}} to="#"><Icon color="teal"name="help circle"></Icon>Help</Link>
          </Grid.Column>
          <Grid.Column>
            <Link style={{color:"white"}} to="#"><Icon color="blue" name="info circle"></Icon>About Us</Link>
          </Grid.Column>
          <Grid.Column>
            <Link style={{color:"white"}} to="#"><Icon color="teal" name="privacy"></Icon>Privacy/Terms</Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
