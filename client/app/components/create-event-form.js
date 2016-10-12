import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel, Radio} from 'react-bootstrap';

export default class CreateEventForm extends Component {
  submit (event) {
    event.preventDefault();
    // Do the sign-in validation here...

    // If successful, go to prof page
    browserHistory.push('/profile');
  }
  render () {
    return (
      <Grid style ={{margin:"none"}}>
      <h1><strong>Create/Edit Event</strong></h1>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEventName" >
            <Col sm={6}>
              <ControlLabel>Event Name</ControlLabel>
              <FormControl type="text" placeholder="Name" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalRegistrationLink">
            <Col sm={6}>
            <ControlLabel>Registration Link</ControlLabel>
              <FormControl type="url" placeholder="Registration Link"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsEventPicture" >
            <Col sm={6}>
              <ControlLabel>Event Pic/Flyer</ControlLabel>
              <input type="file" id="formsControlsEventPicture"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalLabel">
            <Col sm={6}>
            <ControlLabel>Category Labels</ControlLabel>
              <FormControl componentClass="select"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsEventInfo">
            <Col sm={6}>
            <ControlLabel>Event Info</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Event Info"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalLocation" >
            <Col sm={6}>
              <ControlLabel>Location</ControlLabel>
              <FormControl type="text" placeholder="Location" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalTime" >
            <Col sm={6}>
              <ControlLabel>Start Time</ControlLabel>
              <FormControl type="datetime-local" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalTime" >
            <Col sm={6}>
              <ControlLabel>End Time</ControlLabel>
              <FormControl type="datetime-local" />
            </Col>
          </FormGroup>


          <FormGroup controlId="formHorizontalUpdates" >
            <Col sm={6}>
              <ControlLabel>Update Notification</ControlLabel>
              <FormControl componentClass="textArea" placeholder="Update Info" />
            </Col>
          </FormGroup>


          <FormGroup>
            <Col sm={6}>
              <Button type="submit" bsStyle="danger" onClick={this.submit}>
                Save Changes
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
