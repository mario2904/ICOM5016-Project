import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { grey300 } from 'material-ui/styles/colors';

import LoginBox from './login-box';

const banner = "images/banner/tumblr_nhq4cr4lOz1u7bj7uo1_1280.png";
const styles = {
  banner: {
    width: '100%',
    backgroundImage: `url(${banner})`,
    height:'500px',
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
  },
  login: {
    textAlign: 'center',
    paddingTop: '250'
  },
  section: {
    width: '100%',
    backgroundColor: grey300,
    height:'400px',
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
  },
  howto: {
    title: {
      fontSize: 50,
      paddingTop: 80,
    }

  }
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
      <div>
        <div style={styles.banner}>
          <LoginBox style={styles.login}/>
        </div>
        <div style={styles.section}>
          <Grid>
            <Row style={{textAlign: 'center'}}>
              <p style={styles.howto.title}>How E-Spotter Works</p>
            </Row>
          </Grid>
        </div>

      </div>
    );
  }
}
