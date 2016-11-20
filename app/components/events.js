import React, { Component } from 'react';
import { Form, Grid, Icon,Input, Image, Search, Select } from 'semantic-ui-react';
import axios from 'axios';

import EventsSearchBar from './events-search-bar';
import EventsListItem from './events-list-item';
import GridList from './grid-list';
import _ from 'lodash';

export default class Events extends Component {
  constructor () {
    super();
    this.state = {events: [], isLoading: false, value: "", results: []};

  }
  componentWillMount () {
    const tick = this;
    // Get Events Data to render
    axios.get('/api/event/all')
    .then(function (response) {
      console.log(response);
      tick.setState({events: response.data.events})
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleSearchChange = (e) => {
    const tick = this;
    const value = e.target.value;
    console.log(value);
    this.setState({ value });

    // Get Events Data to render
    axios.get('/api/event/all')
    .then(function (response) {
      console.log(response);
      // filter by name
      const filteredEvents = response.data.events.filter((event) => {
        return event.event_name.toLowerCase().includes(value.toLowerCase());
      });
      tick.setState({events: filteredEvents})
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleOrderChange = (e, { value }) => {
    console.log(value);

    // sort by event_name or start_date
    const orderedEvents = this.state.events.sort((a, b) => {
      const nameA = a.event_name.toLowerCase();
      const nameB = b.event_name.toLowerCase();
      const dateA = a.start_date;
      const dateB = b.start_date;

      console.log(nameA);
      console.log(nameB);
      // A-Z
      if(value === 'A - Z')
        return nameA > nameB;
      if(value === 'Z - A')
        return nameA < nameB;
      if(value === 'Starting Soon')
        return dateA > dateB;
    });

    this.setState({events: orderedEvents});
  }

  render () {

    return (

      <Grid padded style={{backgroundColor:"rgb(247, 247, 247)"}}centered>
        <Grid.Row style={{padding:"50px 0px 50px 0px"}}>
        <h1 style={{textAlign:"center"}}>
          <Icon color="teal" size="huge" name="paw"></Icon><strong>Search any Event on Campus</strong></h1>
        </Grid.Row>
        <Grid padded style={{padding: 40}}>
          <Input placeholder='Search by name...' value={this.state.value} onChange={this.handleSearchChange} />
          <Form>
            <Form.Group>
              <Form.Field onChange={this.handleOrderChange} inline control={Select} label='Order by' options={order} placeholder='i.e. Most Popular' />
              <Form.Field inline control={Select} label='Categories' options={options} placeholder='i.e. Food' />
            </Form.Group>
          </Form>
        </Grid>
        <GridList items={this.state.events} ListItem={EventsListItem}/>
      </Grid>
    );
  }
}

const options = [
  { text: 'Food', value: 'Food' },
  { text: 'Music', value: 'Music' },
  { text: 'Fundraiser', value: 'Fundraiser' },
  { text: 'Arts', value: 'Arts' },
  { text: 'Social', value: 'Social' },
  { text: 'Educational', value: 'Educational' },
  { text: 'Networking', value: 'Networking' },
  { text: 'Sport', value: 'Sport' },
  { text: 'Competition', value: 'Competition' },
  { text: 'Other', value: 'Other' }];

const order = [
  { text: 'Most Popular', value: 'Most Popular' },
  { text: 'Starting Soon', value: 'Starting Soon' },
  { text: 'A - Z', value: 'A - Z' },
  { text: 'Z - A', value: 'Z - A' }];
