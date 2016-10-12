import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';


export default class Asignup extends Component {
  submit (event) {
    event.preventDefault();
    browserHistory.push('/home');
  }

  render () {
    return (
      <Grid>

      <h1><strong>Welcome to E-Spotter</strong> </h1>
      <p>Please enter {"the association's"} information</p>
        <Form horizontal>

        <FormGroup controlId="formHorizontalAname" >
          <Col sm={6}>
            <ControlLabel>Association Name</ControlLabel>
            <FormControl type="text" placeholder="Association Name" />
          </Col>
        </FormGroup>


        <FormGroup controlId="formHorizontalAinitials" >
          <Col sm={6}>
            <ControlLabel>{"Association's Initials"}</ControlLabel>
            <FormControl type="text" placeholder={"Association's Initials"} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail" >
          <Col sm={6}>
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword" >
          <Col sm={6}>
            <ControlLabel>Password (Must be 8 characters or longer)</ControlLabel>
            <FormControl type="password" placeholder="Enter Password" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword" >
          <Col sm={6}>
            <ControlLabel>Re-enter Password</ControlLabel>
            <FormControl type="password" placeholder="Re-enter Password" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <Col sm={6}>
            <ControlLabel>Main Office Location</ControlLabel>
            <FormControl componentClass="select" placeholder="Select where is the main office located:">
              <option value="select">Select</option>
              <option value="stefani">Stefani</option>
              <option value="INQU">Ingenieria Quimica</option>
              <option value="INCI">Edificio de Civil</option>
              <option value="Luchetti">Luchetti</option>
              <option value="ININ">Ingenieria Industrial</option>
              <option value="Other">other</option>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLink" >
          <Col sm={6}>
            <ControlLabel>Association Link</ControlLabel>
            <FormControl type="url" placeholder={"Association's Link"} />
          </Col>
        </FormGroup>


        <FormGroup>
          <Col >

            <Button type="submit" bsStyle="primary" onClick={this.submit}>
              Submit
            </Button>
          </Col>
        </FormGroup>



        </Form>


      </Grid>
    );
  }
}
