import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class AssociationsSearchBar extends Component {
  render () {
    return (
      <Form style={style} inline>
        {/*Quick Fix. Try to find a better way to centralize inline form*/}
        <div style={{textAlign:"center"}}>
          <FormGroup style={searchStyle} controlId="formInlineName">
            <ControlLabel style={txtStyle}>Name</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="i.e. SHPE" />
          </FormGroup>

          {' '}
          <FormGroup style={searchStyle} controlId="formInlineFilter">
            <ControlLabel style={txtStyle}>Order By</ControlLabel>
            {' '}
            <FormControl componentClass="select" placeholder="Most Active">
              <option value="most-active">Most Active</option>
              <option value="ascending">A - Z</option>
              <option value="descending">Z - A</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
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

const searchStyle={
  margin: "0px 30px 0px 0px"
}

const txtStyle={
  padding: "0px 10px 0px 0px"
}
