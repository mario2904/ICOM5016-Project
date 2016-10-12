import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';


export default class Usignup extends Component {
  submit (event) {
    event.preventDefault();
    browserHistory.push('/home');
  }

  render () {
    return (
      <Grid>

      <h1><strong>Welcome to E-Spotter</strong> </h1>
        <Form horizontal>

        <FormGroup controlId="formHorizontalFname" >
          <Col sm={6}>
            <ControlLabel>First Name</ControlLabel>
            <FormControl type="text" placeholder="First Name" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLname" >
          <Col sm={6}>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl type="text" placeholder="Last Name" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail" >
          <Col sm={6}>
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword" >
          <Col sm={6}>
            <ControlLabel>Password (Must be 8 characters or longer)</ControlLabel>
            <FormControl type="password" placeholder="Enter Password" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword" >
          <Col sm={6}>
            <ControlLabel>Re-enter Password</ControlLabel>
            <FormControl type="password" placeholder="Re-enter Password" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalBirthday" >
          <Col sm={6}>
            <ControlLabel>{"Birthday"}</ControlLabel>
            <FormControl type="date" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={6}>
          <ControlLabel style={{display:"block", textAlign:"left", margin: "10px 0px 0px 0px"}}>Gender: </ControlLabel>
            <div style={radio1}>
              <p ><input id="one" type="radio" name="optradio"/> Male</p>
            </div>
          <div  style={radioStyle}>
              <p><input id="two" type="radio" name="optradio"/> Female</p>
        </div>
           <div style={radioStyle}>
              <p ><input id="three" type="radio" name="optradio"/> Other</p>
           </div>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalHometown" >
          <Col sm={6}>
            <ControlLabel>{"Hometown"}</ControlLabel>
            <FormControl type="text" placeholder="Hometown"/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalCollege" >
          <Col sm={6}>
            <ControlLabel>{"College"}</ControlLabel>
            <FormControl type="text" placeholder="College"/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <Col sm={6}>
            <ControlLabel>Major</ControlLabel>
            <FormControl componentClass="select" placeholder="Select Major">
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
