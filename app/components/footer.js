import React, { Component } from 'react';
import { Link } from 'react-router';

import { Menu, Segment, Icon, Grid, Dropdown } from 'semantic-ui-react';

export default class Footer extends Component {
  render () {
    return (
      <Grid padded centered style={{height:"100px"}}>
        <Grid.Row style={{padding:"35px 0px 0px 0px"}}color="black" columns={4}>
          <Grid.Column>
            <h5><Icon color="orange"name="copyright"></Icon>E-Spotter</h5>
          </Grid.Column>
          <Grid.Column>
            <Link style={{color:"white"}} to="#"><Icon color="green"name="help circle"></Icon>Help</Link>
          </Grid.Column>
          <Grid.Column>
            <Link style={{color:"white"}} to="#"><Icon color="violet" name="info circle"></Icon>About Us</Link>
          </Grid.Column>
          <Grid.Column>
            <Link style={{color:"white"}} to="#"><Icon color="yellow" name="privacy"></Icon>Privacy/Terms</Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
