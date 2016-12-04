import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Button, Form, Grid, Icon,Input, Image, Checkbox } from 'semantic-ui-react'

import { loginUser } from '../actions';

class Login extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.loginStudent = this.loginStudent.bind(this);
    this.loginAssociaiton = this.loginAssociaiton.bind(this);
  }
  loginStudent (event) {
    event.preventDefault();
    // Do the sign-in validation here...
    const { email, password } = this.state;
    const { dispatch } = this.props;
    const creds = {
      email,
      password,
      role: 'student'
    }

    console.log("Student");
    console.log(email);
    console.log(password);
    dispatch(loginUser(creds));
  }

  loginAssociaiton (event) {
    event.preventDefault();
    // Do the sign-in validation here...
    const { email, password } = this.state;
    const { dispatch } = this.props;
    const creds = {
      email,
      password,
      role: 'association'
    }
    console.log("Association");
    console.log(this.state.email);
    console.log(this.state.password);
    dispatch(loginUser(creds));

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

  componentWillMount() {
    const { isAuthenticated, role } = this.props;
    // Redirect to their respective homes if already authenticated
    if (isAuthenticated) {
      switch (role) {
        case 'student':
          browserHistory.push('/home-student');
          break;
        case 'association':
          browserHistory.push('/home-association');
          break;
      }
    }
  }
  componentWillUpdate(nextProps) {
    const { isAuthenticated, role } = nextProps;
    // Redirect to their respective homes if already authenticated
    if (isAuthenticated) {
      switch (role) {
        case 'student':
          browserHistory.push('/home-student');
          break;
        case 'association':
          browserHistory.push('/home-association');
          break;
      }
    }
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
              <Button color="teal" type="submit" onClick={this.loginStudent}>
                <Icon name="student"></Icon> Student
              </Button>
              <Button.Or/>
              <Button color ="black" type="submit" onClick={this.loginAssociaiton}>
                <Icon name="university"></Icon> Association
              </Button>
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
              <Button color ="black" onClick={this.signupAssociation}>
                <Icon name="university"></Icon> Association
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}


// Type cheking
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, role } = auth;

  return {
    isAuthenticated,
    role
  };
}

export default connect(mapStateToProps)(Login);
