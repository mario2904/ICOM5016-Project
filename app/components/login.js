import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { FormGroup, FormControl,Col, Checkbox, ControlLabel, Row, Panel } from 'react-bootstrap';
import axios from 'axios';
import { Button, Form, Grid, Icon } from 'semantic-ui-react'

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
      <Grid centered columns ={2}>

        <Grid.Row>
        <h1 style={{textAlign:"center"}}><strong>Sign In</strong></h1>
        </Grid.Row>

        <Form>

          <Form.Group style={{textAlign:"center"}}>
            <Grid.Column width={12}>
            <Form.Field label = "Email"></Form.Field>
              <Form.Input
                type="email"
                placeholder="email@upr.edu"
                value={this.state.email}
                onChange={(e) => {this.setState({email: e.target.value})}}
                />
            </Grid.Column>
          </Form.Group>

          <Form.Group style={{textAlign:"center"}}>
            <Col sm={6} lgOffset={3}>
                <Form.Field label = "Password"></Form.Field>
              <Form.Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => {this.setState({password: e.target.value})}}
                />
            </Col>
          </Form.Group>


          <Form.Group>

              <Form.Checkbox label ="Remember me?"></Form.Checkbox>

          </Form.Group>

          <Form.Group inline>

            <Form.Field label="Type Of User:" style={{display:"block", textAlign:"left"}}></Form.Field>
            <Form.Radio style={radio1} label= "Association"></Form.Radio>
            <Form.Radio style={radioStyle} label= "Student"></Form.Radio>

          </Form.Group>

          <Form.Group>

              <div style={{display:"block"}} >
                <Button.Group>
              <Button color="blue" type="submit" onClick={this.submit}>
                <Icon name="student"></Icon> Student
              </Button>
              <Button.Or/>
              <Button color ="red"> <Icon name="university"></Icon> Association</Button>
              </Button.Group>
              </div>

              <div style={{display:"inline-block"}}>

              <p>Create an Account: <a href="#" onClick={this.signup} > Student? </a></p>

              <a href="#" onClick={this.signupAssociation} > Association?</a>
              </div>


          </Form.Group>

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
