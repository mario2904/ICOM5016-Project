import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel
  , Radio, Panel, Accordion, Row} from 'react-bootstrap';

export default class Settings extends Component {
  submit (event) {
    event.preventDefault();

    // If successful, go to prof page
    browserHistory.push('/home');
  }
  render () {
    return (
      <Grid>
        <h1><strong>Settings</strong></h1>
        <Form horizontal>
        <Row>
      <Col lg ={6} md={6} sm={8} xs={10}>
        <Panel  header={"Name"} bsStyle="primary"
        style={{backgroundColor:"rgb(247, 247, 247)", margin:"30px 30px 30px 30px"}}>

          <FormGroup controlId="formHorizontalNewFirstName" >
            <Col sm={6}>
              <ControlLabel>New First Name</ControlLabel>
              <FormControl type="text" placeholder="New First Name" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalNewLastName" >
            <Col sm={6}>
              <ControlLabel>New Last Name</ControlLabel>
              <FormControl type="text" placeholder="New Last Name" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword" >
            <Col sm={6}>
              <ControlLabel>Password</ControlLabel>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={6}>
              <Button type="submit" bsStyle="danger" onClick={this.submit}>
                Save Changes
              </Button>
            </Col>
          </FormGroup>
          </Panel>
          </Col>

          <Col lg={6} md={6} sm={8} xs={10}>
          <Panel  header={"Password"} bsStyle="success"
          style={{backgroundColor:"rgb(247, 247, 247)", margin:"30px 30px 30px 30px"}}>

          <FormGroup controlId="formHorizontalOldPassword" >
            <Col sm={6}>
              <ControlLabel>Old Password</ControlLabel>
              <FormControl type="password" placeholder="Old Password" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalNewPassword" >
            <Col sm={6}>
              <ControlLabel>New Password</ControlLabel>
              <FormControl type="password" placeholder="New Password" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalReEnterPassword" >
            <Col sm={6}>
              <ControlLabel>Re-Enter New Password</ControlLabel>
              <FormControl type="password" placeholder="New Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={6}>
              <Button type="submit" bsStyle="danger" onClick={this.submit}>
                Save Changes
              </Button>
            </Col>
          </FormGroup>
          </Panel>
          </Col>
          </Row>

          <Row>

          <Col lg={6} md={6} sm={8} xs={10}>
          <Panel  header={"Email"} bsStyle="info"
          style={{backgroundColor:"rgb(247, 247, 247)", margin:"5px 30px 30px 30px"}}>

          <FormGroup controlId="formHorizontalNewEmail" >
            <Col sm={6}>
              <ControlLabel>New Email</ControlLabel>
              <FormControl type="email" placeholder="New Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword" >
            <Col sm={6}>
              <ControlLabel>Password</ControlLabel>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={6}>
              <Button type="submit" bsStyle="danger" onClick={this.submit}>
                Save Changes
              </Button>
            </Col>
          </FormGroup>
          </Panel>
          </Col>


          <Col lg={6} md={6} sm={8} xs={10}>
          <Panel  header="Notifications" bsStyle="warning"
          style={{backgroundColor:"rgb(247, 247, 247)", margin:"5px 30px 30px 30px"}}>

          <FormGroup>
          <Col sm={6}>
          <ControlLabel style={{display:"block", textAlign:"left"}}>
          Nofications by Email </ControlLabel>
            <div style={radio1}>
              <p><input id="one" type="radio" name="optradio"/> Yes</p>
            </div>
            <div style={radioStyle}>
              <p><input id="two" type="radio" name="optradio"/> No</p>
            </div>
          </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword" >
            <Col sm={6}>
              <ControlLabel>Password</ControlLabel>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={6}>
              <Button type="submit" bsStyle="danger" onClick={this.submit}>
                Save Changes
              </Button>
            </Col>
          </FormGroup>

        </Panel>
        </Col>
        </Row>

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
