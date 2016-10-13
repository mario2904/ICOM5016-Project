import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class Asignup extends Component {

  constructor () {
    super();
    this.state = {
      name: '',
      initials: '',
      location: '',
      link: '',
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
      axios.post('/api/create-association', {
        name: this.state.name,
        initials: this.state.initials,
        location: this.state.location,
        link: this.state.link,
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
      <p>Please enter {"the association's"} information</p>
        <Form horizontal>

        <FormGroup controlId="formHorizontalAname" >
          <Col sm={6}>
            <ControlLabel>Association Name</ControlLabel>
            <FormControl type="text" placeholder="Association Name" value={this.state.name} onChange={(e) => {this.setState({name: e.target.value})}} />
          </Col>
        </FormGroup>


        <FormGroup controlId="formHorizontalAinitials" >
          <Col sm={6}>
            <ControlLabel>{"Association's Initials"}</ControlLabel>
            <FormControl type="text" placeholder={"Association's Initials"} value={this.state.initials} onChange={(e) => {this.setState({initials: e.target.value})}}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail" >
          <Col sm={6}>
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" placeholder="Email" value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword" >
          <Col sm={6}>
            <ControlLabel>Password (Must be 8 characters or longer)</ControlLabel>
            <FormControl type="password" placeholder="Enter Password" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword" >
          <Col sm={6}>
            <ControlLabel>Re-enter Password</ControlLabel>
            <FormControl type="password" placeholder="Re-enter Password" value={this.state.passwdChk} onChange={(e) => {this.setState({passwdChk: e.target.value})}} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <Col sm={6}>
            <ControlLabel>Main Office Location</ControlLabel>
            <FormControl componentClass="select" placeholder="Select where is the main office located:" onChange={(e) => {this.setState({location: e.target.value})}}>
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
            <FormControl type="url" placeholder={"Association's Link"} value={this.state.link} onChange={(e) => {this.setState({link: e.target.value})}}/>
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
