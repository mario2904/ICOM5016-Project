import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import axios from 'axios';
import { Button, Form, Grid, Icon,Input, Image, Checkbox } from 'semantic-ui-react'

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
  <Grid padded stackable columns={2}>
    <Grid.Row centered>
      <Grid.Column color="blue" width={8} style={{padding:"200px 0px 200px 0px"}}>
        <h1><strong>Sign In</strong><Icon name="user" size="large"></Icon></h1>

          <Form.Group>
              <Form.Field type="email" control="email" label = "Email"></Form.Field>
                <Form.Input
                  type="email"
                  placeholder="email@upr.edu"
                  value={this.state.email}
                  onChange={(e) => {this.setState({email: e.target.value})}}/>
            </Form.Group>

          <Form.Group style={{padding:"15px 0px 0px 0px"}}>

            <Form.Field label="Password"></Form.Field>
             <Form.Input
               type="password"
               placeholder="Password"
               value={this.state.password}
               onChange={(e) => {this.setState({password: e.target.value})}}
               />
             </Form.Group>


            <Form.Field style={{padding:"10px 70px 10px 0px"}}>
              <input type="checkbox"></input>
              <label> Remember me?</label>
            </Form.Field>

         <Button.Group>
             <Button color="teal" type="submit" onClick={this.submit}>
               <Icon name="student"></Icon> Student
             </Button>
             <Button.Or/>
             <Button color ="black"> <Icon name="university"></Icon> Association</Button>
        </Button.Group>
      </Grid.Column>

      <Grid.Column color="teal" width={8} style={{padding:"200px 0px 200px 0px"}}>
        <h1 style={{color:"black"}}><strong>Sign Up</strong></h1>
        <Icon name="pointing right"  color= "black" size="huge"/>
          <Button.Group>
              <Button color="blue" type="submit" onClick={this.signup}>
                <Icon name="student"></Icon> Student
              </Button>
              <Button.Or/>
            <Button color ="black" onClick={this.signupAssociation}> <Icon name="university"></Icon> Association</Button>

         </Button.Group>
      </Grid.Column>
    </Grid.Row>
  </Grid>
    );
  }
}
