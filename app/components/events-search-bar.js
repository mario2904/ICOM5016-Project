import React, { Component } from 'react';
import {Input, Select, Grid, Form, Segment} from 'semantic-ui-react';

export default class EventsSearchBar extends Component {
  render () {
    return (
        <Grid padded style={{padding: 40}}>
          <Input  action={{ icon: 'search'}} placeholder='Search by name...' />
          <Form>
            <Form.Group>
              <Form.Field inline control={Select} label='Order by'
                options={order} placeholder='i.e. Most Popular' />
              <Form.Field inline control={Select} label='Categories'
                options={options} placeholder='i.e. Food' />
            </Form.Group>
          </Form>
        </Grid>

    );
  }
}
// Add padding to searchbar
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
