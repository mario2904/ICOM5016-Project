import React, { Component } from 'react';
import { Form, Grid, Input, Item, Select } from 'semantic-ui-react';

export default class AssociationsSearchBar extends Component {
  render () {
    return (
      <Grid padded style={{padding: 40}}>
        <Input action={{ icon: 'search'}} placeholder='Search by name...' />
        <Form>
          <Form.Group>
            <Form.Field inline control={Select} label='Order by'
              options={order} placeholder='i.e. A - Z' />
          </Form.Group>
        </Form>
      </Grid>
    );
  }
}

const order = [
  { text: 'A - Z', value: 'A - Z' },
  { text: 'Z - A', value: 'Z - A' }
];
