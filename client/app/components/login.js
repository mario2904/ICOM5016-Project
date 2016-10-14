import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel, Row, Panel } from 'react-bootstrap';
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
      <Grid>
        <h1 style={{textAlign:"center"}}><strong>Sign In</strong></h1>
        <Form horizontal >

        <Col lg={6} lgOffset={3}>
          <Panel header={"   "} bsStyle="primary">


          <FormGroup  style={{textAlign:"center"}} controlId="formHorizontalEmail" >
            <Col sm={6} lgOffset={3}>
            <ControlLabel>Email</ControlLabel>
              <FormControl
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => {this.setState({email: e.target.value})}}
                />
            </Col>
          </FormGroup>

          <FormGroup style={{textAlign:"center"}} controlId="formHorizontalPassword">
            <Col sm={6} lgOffset={3}>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => {this.setState({password: e.target.value})}}
                />
            </Col>
          </FormGroup>


          <FormGroup>
            <Col sm={6} lgOffset={3}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={6} lgOffset={3}>
            <ControlLabel style={{display:"block", textAlign:"left"}}>Type Of User: </ControlLabel>
              <div style={radio1}>
                <p><input id="one" type="radio" name="optradio"/> Association</p>
              </div>
            <div style={radioStyle}>
                <p><input id="two" type="radio" name="optradio"/> Regular</p>
          </div>
            </Col>
          </FormGroup>

          <FormGroup>

            <Col sm={6} lgOffset={3}>

              <div style={{display:"block"}} >
              <Button style={{margin:"0px 0px 10px 0px"}}type="submit" bsStyle="danger" onClick={this.submit}>
                Sign in
              </Button>
              </div>

              <div style={{display:"inline-block"}}>

              <p>Create an Account: <a href="#" onClick={this.signup} > Student? </a></p>

              <a href="#" onClick={this.signupAssociation} > Association?</a>
              </div>

            </Col>
          </FormGroup>

        </Panel>

      </Col>

        </Form>

      </Grid>
    );
  }
}

const radioStyle={
  display: "inline-block",
  padding: "0px 0px 0px 15px",
  margin: "10px 0px 0px 0px"
}

const radio1={
  display: "inline-block",
margin: "10px 0px 0px 0px"
}
