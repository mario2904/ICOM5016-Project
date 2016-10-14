import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';


export default class Usignup extends Component {

  constructor () {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      //birthday: '',
      gender: '',
      hometown: '',
      college: '',
      major: '',
      email: '',
      password: '',
      passwdChk: ''
    }
    this.submit = this.submit.bind(this);
    this.checkPasswordLength = this.checkPasswordLength.bind(this);
  }

  checkPasswordLength(string1){
    var integer = string1.length;
    if(integer>=8){return true};
    if(integer < 8){return false};
  }

  submit (event) {
    event.preventDefault();
    if(this.checkPasswordLength(this.state.password)){
      axios.post('/api/create-student', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: this.state.age,
        gender: this.state.gender,
        hometown: this.state.hometown,
        college: this.state.college,
        major: this.state.major,
        email: this.state.email,
        password: this.state.password
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
}

  render () {
    return (
      <Grid>

      <h1><strong>Welcome to E-Spotter</strong> </h1>
        <Form horizontal>

        <FormGroup controlId="formHorizontalFname" >
          <Col sm={6}>
            <ControlLabel>First Name</ControlLabel>
            <FormControl t
              ype="text"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={(e) => {this.setState({firstName: e.target.value})}}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLname" >
          <Col sm={6}>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={(e) => {this.setState({lastName: e.target.value})}}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail" >
          <Col sm={6}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => {this.setState({email: e.target.value})}}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword" >
          <Col sm={6}>
            <ControlLabel>Password (Must be 8 characters or longer)</ControlLabel>
            <FormControl
              type="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={(e) => {this.setState({password: e.target.value})}}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword" >
          <Col sm={6}>
            <ControlLabel>Re-enter Password</ControlLabel>
            <FormControl
              type="password"
              placeholder="Re-enter Password"
              value={this.state.passwdChk}
              onChange={(e) => {this.setState({passwdChk: e.target.value})}}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalBirthday" >
          <Col sm={6}>
            <ControlLabel>{"Birthday"}</ControlLabel>
            <FormControl
              type="date"
              value={this.state.age}
              onChange={(e) => {this.setState({age: e.target.value})}}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={6}>
          <ControlLabel
            style={{display:"block", textAlign:"left", margin: "10px 0px 0px 0px"}}>Gender: </ControlLabel>
            <div style={radio1}>
              <p><input
                  id="one"
                  type="radio"
                  name="optradio"
                  value="Male"
                  onChange={(e) => {this.setState({gender: e.target.value})}}
                  />
                Male
              </p>
            </div>
          <div  style={radioStyle}>
              <p><input
                  id="two"
                  type="radio"
                  name="optradio"
                  value= "Female"
                  onChange={(e) => {this.setState({gender: e.target.value})}}
                  />
                Female
              </p>
        </div>
           <div style={radioStyle}>
              <p><input
                  id="three"
                  type="radio"
                  name="optradio"
                  value= "Other"
                  onChange={(e) => {this.setState({gender: e.target.value})}}
                  />
                Other
              </p>
           </div>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalHometown" >
          <Col sm={6}>
            <ControlLabel>{"Hometown"}</ControlLabel>
            <FormControl
              type="text"
              placeholder="Hometown"
              value={this.state.hometown}
              onChange={(e) => {this.setState({hometown: e.target.value})}}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalCollege" >
          <Col sm={6}>
            <ControlLabel>{"College"}</ControlLabel>
            <FormControl
              type="text"
              placeholder="College"
              value={this.state.college}
              onChange={(e) => {this.setState({college: e.target.value})}}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <Col sm={6}>
            <ControlLabel>Major</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="Select Major"
              onChange={(e) => {this.setState({major: e.target.value})}}>
              <option value="select">Select</option>
              <option value="ICOM">ICOM</option>
              <option value="INEL">INEL</option>
              <option value="INQU">INQU</option>
              <option value="INCI">INCI</option>
              <option value="INME">INME</option>
              <option value="ININ">ININ</option>
              <option value="Other">other</option>
            </FormControl>
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

const radioStyle={
  display: "inline-block",
  padding: "0px 0px 0px 15px",
  margin: "10px 0px 0px 0px"
}

const radio1={
  display: "inline-block",
  margin: "10px 0px 0px 0px"
}
