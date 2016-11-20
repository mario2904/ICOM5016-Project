import React, { Component } from 'react';
import axios from 'axios';

import AssociationsSearchBar from './associations-search-bar';
import AssociationsListItem from './associations-list-item';
import GridList from './grid-list';
import {Form, Grid, Icon,Input, Image, Item } from 'semantic-ui-react'

export default class Associations extends Component {
  constructor () {
    super();
    this.state = {associations: []};
  }
  componentWillMount() {
    const tick = this;
    // Get Events Data to render
    axios.get('/api/association/all')
    .then(function (response) {
      console.log(response);
      tick.setState({associations: response.data.associations})
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render () {
    return (
        <Grid padded style={{backgroundColor:"rgb(247, 247, 247)"}}>
          <Grid.Row centered style={{padding:"50px 0px 50px 0px"}}>
          <h1 style={{textAlign:"center"}}>
            <Icon color="blue" size="huge" name="university"></Icon><strong>Student Associations</strong></h1>
          </Grid.Row>
          <Grid.Row centered>
          <AssociationsSearchBar></AssociationsSearchBar>
          </Grid.Row>
          <GridList items={this.state.associations} ListItem={AssociationsListItem}/>
      </Grid>
    );
  }
}
