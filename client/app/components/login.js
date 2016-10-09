import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel } from 'react-bootstrap';

export default class Login extends Component {
  submit (event) {
    event.preventDefault();
    // Do the sign-in validation here...

    // If successful, go to home page
    browserHistory.push('/home');
  }

  signup (event) {
    event.preventDefault();
    // Do the sign-in validation here...

    // If successful, go to home page
    browserHistory.push('/userregister');
  }

  signupAssociation (event) {
    event.preventDefault();
    // Do the sign-in validation here...

    // If successful, go to home page
    browserHistory.push('/assoregister');
  }


  render () {
    return (
      <Grid>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail" >
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={6}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={6}>
              <FormControl type="password" placeholder="Password"/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" bsStyle="danger" onClick={this.submit}>
                Sign in
              </Button>

            </Col>
          </FormGroup>
        </Form>
      <p>{"If you're a student and don't have an account,"} <a href="#" onClick={this.signup} > sign up now!</a></p>
      <p>{"If you're an association and don't have an account,"} <a href="#" onClick={this.signupAssociation} > sign up now!</a></p>


      </Grid>
    );
  }
}
