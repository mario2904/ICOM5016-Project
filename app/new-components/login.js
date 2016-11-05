import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  login: {
    textAlign: 'center',
    marginTop: 50,
    padding: 20,
    display: 'inline-block',
  },
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = () => {
    console.log("EMAIL: ", this.state.email);
    console.log("PASSWORD: ", this.state.password);
    browserHistory.push('/home');
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <Paper style={styles.login}>
          <h1>Login</h1>
          <TextField
            id="text-field-controlled-email"
            hintText="E-mail"
            value={this.state.email}
            type="email"
            onChange={this.handleEmailChange}
            />
          <br/>
          <TextField
            id="text-field-controlled-password"
            hintText="Password"
            value={this.state.password}
            type="password"
            onChange={this.handlePasswordChange}
            />
          <br />
          <br />
          <RaisedButton
            label="Log in"
            onTouchTap={this.handleLogin}
            primary={true}
            />
          <h5>Don't have an account? Sign up as a <Link to="#">Student</Link> or <Link to="#">Association</Link></h5>
        </Paper>
      </div>

    );
  }
}
