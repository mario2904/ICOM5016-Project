import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel, Row } from 'react-bootstrap';
import axios from 'axios';

export default class Login extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.submit = this.submit.bind(this);
  }
  submit (event) {
    event.preventDefault();
    // Do the sign-in validation here...
    axios.post('/api/login', {
      email: this.state.email,
      password: this.state.password,
      account: 'student'
    })
    .then(function (response) {
      // If successful, go to home page
      console.log('Success');
      console.log(response);
      browserHistory.push('/home');
    })
    .catch(function (error) {
      // Else do nothing
      console.log('Error');
      console.log(error);
    });

  }
  signup (event) {
    event.preventDefault();
  //Event Manager to switch to Student Sign up
    browserHistory.push('/signup-student');
  }
  signupAssociation (event) {
    //Event Manager to switch to Association Sign up
    browserHistory.push('/signup-association');
  }

  render () {
    return (
      <Grid >
        <Form horizontal>
          <h1 style={{textAlign:"left"}}><strong>Sign In</strong></h1>
          <FormGroup controlId="formHorizontalEmail" >
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={6}>
              <FormControl
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => {this.setState({email: e.target.value})}}
                />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={6}>
              <FormControl
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => {this.setState({password: e.target.value})}}
                />
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
              <Row><p> </p></Row>
              <p>{"If you're a student and don't have an account,"} <a href="#" onClick={this.signup} > sign up now!</a></p>
              <p>{"If you're an association and don't have an account,"} <a href="#" onClick={this.signupAssociation} > sign up now!</a></p>
            </Col>
          </FormGroup>
        </Form>
      </Grid>
    );
  }
}
