import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class AssociationsSearchBar extends Component {
  render () {
    return (
      <Form style={style} inline>
        <div style={{textAlign: "center"}}>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Name</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="i.e. SHPE" />
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineFilter">
            <ControlLabel>Filter</ControlLabel>
            {' '}
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="most-active">Most Active</option>
              <option value="ascending">A - Z</option>
              <option value="descending">Z - A</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </FormControl>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineFaculty">
            <ControlLabel>Faculty</ControlLabel>
            {' '}
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="other">...</option>
            </FormControl>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineDepartment">
            <ControlLabel>Department</ControlLabel>
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

const style = {
    padding: "50px"
};
