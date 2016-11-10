import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import {Form, Grid,Input, Item, Select } from 'semantic-ui-react'

export default class AssociationsSearchBar extends Component {
  render () {
    return (
      <Grid padded style={{padding: 40}}>
        <Input action={{ icon: 'search'}} placeholder='Search by name...' />
        <Form>
          <Form.Group>
            <Form.Field inline control={Select} label='Order by'
              options={order} placeholder='i.e. Most Popular' />
          </Form.Group>
        </Form>
      </Grid>
    );
  }
}

const order = [
  { text: 'Most Popular', value: 'Most Popular' },
  { text: 'Starting Soon', value: 'Starting Soon' },
  { text: 'A - Z', value: 'A - Z' },
  { text: 'Z - A', value: 'Z - A' }];


// Add padding to searchbar
const style = {
    padding: "50px"
};

const searchStyle={
  margin: "0px 30px 0px 0px"
}

const txtStyle={
  padding: "0px 10px 0px 0px"
}
