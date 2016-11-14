import React, { Component } from 'react';

import {Form, Grid, Icon,Input, Image, Segment,
       Item, Menu, Divider, Header, Button } from 'semantic-ui-react'
export default class Settings extends Component {
  submit (event) {
    event.preventDefault();

    // If successful, go to prof page
  browserHistory.push('/home');
  }

  state = { serializedForm: {} };

  handleDecisionChange = (e, { value }) => this.setState({ decision: value });

  handleSubmit = (e, serializedForm) => {
    e.preventDefault();
    this.setState({ serializedForm });
  };

  checkPasswordLength(string1){
    var integer = string1.length;
    if(integer>=8){return true};
    if(integer < 8){return false};
  }

  render () {
    const { serializedForm, decision } = this.state;
    return (
        <div style={{padding:100}}>
          <Header style={{ paddingBottom:"50px"}} as='h1' icon textAlign="center">
          <Icon name="settings" size="large"></Icon>
          <Header.Content>Settings</Header.Content>
          </Header>
          <Grid stackable>

          <Grid.Row columns={2}>

          <Grid.Column>
          <Header as='h2' inverted attached='top' style={{width:"100%",
          borderRadius:0,backgroundColor:"rgb(35, 37, 40)", color:"white"}}>
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
            <Header inverted color="black" as='h2' attached='top'
              style={{width:"100%",borderRadius:0, backgroundColor:"rgb(35, 37, 40)", color:"white"}}>
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
            borderRadius:0, backgroundColor:"rgb(35, 37, 40)", color:"white"}}>
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
            borderRadius:0, backgroundColor:"rgb(35, 37, 40)", color:"white"}}>
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
    );
  }
}
