import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class EventsSearchBar extends Component {
  render () {
    return (
      <Form style={style} inline>
        {/*Quick Fix. Try to find a better way to centralize inline form*/}
        <div style={{textAlign: "center"}}>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Name</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="i.e. Hackathon" />
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineFilter">
            <ControlLabel>Filter</ControlLabel>
            {' '}
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="most-active">Most Popular</option>
              <option value="newest">Starting soon</option>
              <option value="ascending">A - Z</option>
              <option value="descending">Z - A</option>
            </FormControl>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineCategory">
            <ControlLabel>Category</ControlLabel>
            {' '}
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="other">...</option>
            </FormControl>
          </FormGroup>
        </div>
      </Form>
    );
  }
}
// Add padding to searchbar
const style = {
    padding: "50px"
};
