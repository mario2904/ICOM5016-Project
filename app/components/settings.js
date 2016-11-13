import React, { Component } from 'react';
// import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel
//   , Radio, Panel, Accordion, Row} from 'react-bootstrap';
//
import {Form, Grid, Icon,Input, Image, Segment,
       Item, Menu, Divider, Header, Button } from 'semantic-ui-react'
export default class Settings extends Component {
  submit (event) {
    event.preventDefault();

    // If successful, go to prof page
  browserHistory.push('/home');

  state = { serializedForm: {} };

  handleDecisionChange = (e, { value }) => this.setState({ decision: value });

  handleSubmit = (e, serializedForm) => {
    e.preventDefault()
    this.setState({ serializedForm })
    }
  }

  checkPasswordLength(string1){
    var integer = string1.length;
    if(integer>=8){return true};
    if(integer < 8){return false};
  }

  render () {
    const { serializedForm, decision } = this.state;
    return (
        <div style={{padding:100}}>
          <Header style={{paddingBottom:"50px"}} as='h1' icon textAlign="center">
          <Icon name="settings" size="large"></Icon>
          <Header.Content>Settings</Header.Content>
          </Header>
          <Grid stackable>

          <Grid.Row columns={2}>

          <Grid.Column>
          <Header as='h2' inverted attached='top' style={{width:"100%",
          borderRadius:0}}>
          <Icon color="teal"name="write" size="large"></Icon>Name</Header>

          <Segment attached style={{width:"100%", marginBottom:"25px"}}>
            <Form>
              <Form.Input label="New First Name" name="firstName"
                placeholder="Your new first name"/>
              <Form.Input label="New Last Name" name="lastName"
                placeholder="Your new last name"/>
              <Form.Input label="Password" name="password"
                placeholder="Your password" type="password"/>
              <Button color="teal" type='submit'>Submit</Button>
            </Form>
          </Segment>

          </Grid.Column>

          <Grid.Column>
            <Header inverted color="black" as='h2' attached='top' style={{width:"100%",borderRadius:0}}>
            <Icon color="yellow"name="unlock alternate" size="large"></Icon>Password</Header>

            <Segment attached style={{width:"100%",marginBottom:"25px"}}>
              <Form>
                <Form.Input label="Current Password" name="currentPassword"
                  placeholder="Your current password" type="password"/>

                <Form.Input label="New Password" name="newPassword"
                  placeholder="Your new password"/>
                <Form.Input label="Re-Enter New Password" name="newPassword"
                  placeholder="ReEnter Your new password" type="password"/>
                <Button color="yellow" type='submit'>Submit</Button>
              </Form>
            </Segment>

          </Grid.Column>

          </Grid.Row>

          <Grid.Row columns={2}>

          <Grid.Column>
            <Header inverted color="black" as='h2' attached='top' style={{width:"100%",
            borderRadius:0}}>
            <Icon color="blue"name="mail" size="large"></Icon>Email</Header>

            <Segment attached style={{width:"100%",marginBottom:"25px"}}>
              <Form>
                <Form.Input label="Current Email" name="currentEmail"
                  placeholder="Your current email" type="email"/>

                <Form.Input label="New Email" name="newEmail"
                  placeholder="Your new password"/>
                <Form.Input label="Password" name="newPassword"
                  placeholder="Your Password" type="password"/>
                <Button color="blue"type='submit'>Submit</Button>
              </Form>
            </Segment>

          </Grid.Column>

          <Grid.Column>
            <Header inverted color="black" as='h2' attached='top' style={{width:"100%",
            borderRadius:0}}>
            <Icon color="red"name="talk" size="large"></Icon>Receive Push Notifications?</Header>

          <Segment attached style={{width:"100%"}}>
              <Form>
                <Form.Group inline>
                  <Form.Radio label="Yes" name="yes" value="yes" onChange={this.handleDecisionChange}></Form.Radio>
                  <Form.Radio label="No" name="no" value="no"></Form.Radio>
                </Form.Group>
                <Form.Input label="Password" name="newPassword"
                  placeholder="Your Password" type="password"/>
                <Button color="red"type='submit'>Submit</Button>
              </Form>
            </Segment>

          </Grid.Column>

          </Grid.Row>


          </Grid>
      </div>
      // <Grid>
      //   <h1><strong>Settings</strong></h1>
      //   <Form horizontal>
      //   <Row>
      // <Col lg ={6} md={6} sm={8} xs={10}>
      //   <Panel  header={"Name"} bsStyle="primary"
      //   style={{backgroundColor:"rgb(247, 247, 247)", margin:"30px 30px 30px 30px"}}>
      //
      //     <FormGroup controlId="formHorizontalNewFirstName" >
      //       <Col sm={6}>
      //         <ControlLabel>New First Name</ControlLabel>
      //         <FormControl type="text" placeholder="New First Name" />
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formHorizontalNewLastName" >
      //       <Col sm={6}>
      //         <ControlLabel>New Last Name</ControlLabel>
      //         <FormControl type="text" placeholder="New Last Name" />
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formHorizontalPassword" >
      //       <Col sm={6}>
      //         <ControlLabel>Password</ControlLabel>
      //         <FormControl type="password" placeholder="Password" />
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup>
      //       <Col sm={6}>
      //         <Button type="submit" bsStyle="danger" onClick={this.submit}>
      //           Save Changes
      //         </Button>
      //       </Col>
      //     </FormGroup>
      //     </Panel>
      //     </Col>
      //
      //     <Col lg={6} md={6} sm={8} xs={10}>
      //     <Panel  header={"Password"} bsStyle="success"
      //     style={{backgroundColor:"rgb(247, 247, 247)", margin:"30px 30px 30px 30px"}}>
      //
      //     <FormGroup controlId="formHorizontalOldPassword" >
      //       <Col sm={6}>
      //         <ControlLabel>Old Password</ControlLabel>
      //         <FormControl type="password" placeholder="Old Password" />
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formHorizontalNewPassword" >
      //       <Col sm={6}>
      //         <ControlLabel>New Password</ControlLabel>
      //         <FormControl type="password" placeholder="New Password" />
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formHorizontalReEnterPassword" >
      //       <Col sm={6}>
      //         <ControlLabel>Re-Enter New Password</ControlLabel>
      //         <FormControl type="password" placeholder="New Password" />
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup>
      //       <Col sm={6}>
      //         <Button type="submit" bsStyle="danger" onClick={this.submit}>
      //           Save Changes
      //         </Button>
      //       </Col>
      //     </FormGroup>
      //     </Panel>
      //     </Col>
      //     </Row>
      //
      //     <Row>
      //
      //     <Col lg={6} md={6} sm={8} xs={10}>
      //     <Panel  header={"Email"} bsStyle="info"
      //     style={{backgroundColor:"rgb(247, 247, 247)", margin:"5px 30px 30px 30px"}}>
      //
      //     <FormGroup controlId="formHorizontalNewEmail" >
      //       <Col sm={6}>
      //         <ControlLabel>New Email</ControlLabel>
      //         <FormControl type="email" placeholder="New Email" />
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formHorizontalPassword" >
      //       <Col sm={6}>
      //         <ControlLabel>Password</ControlLabel>
      //         <FormControl type="password" placeholder="Password" />
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup>
      //       <Col sm={6}>
      //         <Button type="submit" bsStyle="danger" onClick={this.submit}>
      //           Save Changes
      //         </Button>
      //       </Col>
      //     </FormGroup>
      //     </Panel>
      //     </Col>
      //
      //
      //     <Col lg={6} md={6} sm={8} xs={10}>
      //     <Panel  header="Notifications" bsStyle="warning"
      //     style={{backgroundColor:"rgb(247, 247, 247)", margin:"5px 30px 30px 30px"}}>
      //
      //     <FormGroup>
      //     <Col sm={6}>
      //     <ControlLabel style={{display:"block", textAlign:"left"}}>
      //     Nofications by Email </ControlLabel>
      //       <div style={radio1}>
      //         <p><input id="one" type="radio" name="optradio"/> Yes</p>
      //       </div>
      //       <div style={radioStyle}>
      //         <p><input id="two" type="radio" name="optradio"/> No</p>
      //       </div>
      //     </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formHorizontalPassword" >
      //       <Col sm={6}>
      //         <ControlLabel>Password</ControlLabel>
      //         <FormControl type="password" placeholder="Password" />
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup>
      //       <Col sm={6}>
      //         <Button type="submit" bsStyle="danger" onClick={this.submit}>
      //           Save Changes
      //         </Button>
      //       </Col>
      //     </FormGroup>
      //
      //   </Panel>
      //   </Col>
      //   </Row>
      //
      //   </Form>
      // </Grid>
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
