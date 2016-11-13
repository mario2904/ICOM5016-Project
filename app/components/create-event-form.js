import React, { Component } from 'react';
import {Form, Grid, Icon,Input, Image, Segment,Item, Menu, Divider, Header, Button } from 'semantic-ui-react'
export default class CreateEventForm extends Component {
  submit (event) {
    event.preventDefault();
    // Do the sign-in validation here...

    // If successful, go to prof page
    browserHistory.push('/home');
  }
  render () {
    return (
      <div style={{padding:100}}>

        <Header as='h2' attached='top' >
        <Icon name="write square" size="large" circular></Icon>Create Event</Header>

        <Segment attached>
          <Form>

            <Icon name="idea"></Icon>
            <Form.Input label='Event Name' name='eventName' placeholder='Event Name'/>

            <Icon name="linkify"></Icon>
            <Form.Input label='Registration Link'
              name='registrationLink' placeholder='RegistrationLink' />

            <Icon name="image"></Icon>
            <Form.Input label="Event Pic/Flyer" name='eventPic'
              placeholder="choose your flyer" type="file"/>

            <Icon name="tag"></Icon>
            <Form.Select label='Category' name='category' options={categories}
              placeholder='Categories' />

            <Icon name="info circle"></Icon>
            <Form.TextArea label="Event Info" name='eventInfo'
              placeholder="Tell us more about your event" rows="4"/>

            <Icon name="map pin"></Icon>
            <Form.Input label="Location" name='location'
              placeholder="Where is your event going to be at?"/>

            <Icon name="checked calendar"></Icon>
            <Form.Input label="Start Date" name='startDate' placeholder="mm/dd/yyyy"
                type="date"/>

              <Icon name="wait" flipped="horizontally"></Icon>
            <Form.Input label="Start Time" name="startTime" type="time"
                placeholder="--:-- --"/>

            <Icon name="delete calendar"></Icon>
            <Form.Input label="End Date" name='endDate' placeholder="mm/dd/yyyy"
                type="date"/>

              <Icon name="wait"></Icon>
            <Form.Input label="End Time" name="endTime" type="time"
                placeholder="--:-- --"/>

              <Button color="teal"type='submit'>Submit</Button>
          </Form>
        </Segment>
      </div>


      // <Grid>
      //   <Panel header={title} bsStyle="success" style={{backgroundColor:"rgb(247, 247, 247)"}}>
      //   <Form horizontal>
      //     <FormGroup controlId="formHorizontalEventName" >
      //       <Col sm={6}>
      //         <ControlLabel>Event Name</ControlLabel>
      //         <FormControl type="text" placeholder="Name" />
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formHorizontalRegistrationLink">
      //       <Col sm={6}>
      //       <ControlLabel>Registration Link</ControlLabel>
      //         <FormControl type="url" placeholder="Registration Link"/>
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formControlsEventPicture" >
      //       <Col sm={6}>
      //         <ControlLabel>Event Pic/Flyer</ControlLabel>
      //         <input type="file" id="formsControlsEventPicture"/>
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formHorizontalLabel">
      //       <Col sm={6}>
      //       <ControlLabel>Category Labels</ControlLabel>
      //         <FormControl componentClass="select" placeholder="Categories">
      //           <option value="select">Select</option>
      //           <option value="Food">Food</option>
      //           <option value="Music">Music</option>
      //           <option value="Fundraiser">Fundraiser</option>
      //           <option value="Arts">Arts</option>
      //           <option value="Social">Social</option>
      //           <option value="Educational">Educational</option>
      //           <option value="Networking">Networking</option>
      //           <option value="Sport">Sport</option>
      //           <option value="Competition">Competition</option>
      //           <option value="Other">Other</option>
      //         </FormControl>
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formControlsEventInfo">
      //       <Col sm={6}>
      //       <ControlLabel>Event Info</ControlLabel>
      //       <FormControl componentClass="textarea" placeholder="Event Info"/>
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formHorizontalLocation" >
      //       <Col sm={6}>
      //         <ControlLabel>Location</ControlLabel>
      //         <FormControl type="text" placeholder="Location" />
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formHorizontalTime" >
      //       <Col sm={6}>
      //         <ControlLabel>Start Time</ControlLabel>
      //         <FormControl type="datetime-local" />
      //       </Col>
      //     </FormGroup>
      //
      //     <FormGroup controlId="formHorizontalTime" >
      //       <Col sm={6}>
      //         <ControlLabel>End Time</ControlLabel>
      //         <FormControl type="datetime-local" />
      //       </Col>
      //     </FormGroup>
      //
      //
      //     <FormGroup controlId="formHorizontalUpdates" >
      //       <Col sm={6}>
      //         <ControlLabel>Update Notification</ControlLabel>
      //         <FormControl componentClass="textArea" placeholder="Update Info" />
      //       </Col>
      //     </FormGroup>
      //
      //
      //     <FormGroup>
      //       <Col sm={6}>
      //         <Button type="submit" bsStyle="danger" onClick={this.submit}>
      //           Save Changes
      //         </Button>
      //       </Col>
      //     </FormGroup>
      //   </Form>
      // </Panel>
      //</Grid>
    );
  }
}

const categories = [
  { text: 'Food', value: 'food' },
  { text: 'Music', value: 'music' },
  { text: 'Fundraiser', value: 'fundraiser' },
  { text: 'Arts', value: 'arts' },
  { text: 'Social', value: 'social' },
  { text: 'Educational', value: 'educational' },
  { text: 'Business', value: 'business' },
  { text: 'Sport', value: 'sport' },
  { text: 'Competition', value: 'competition' },
  { text: 'Other', value: 'other' },
];

const radioStyle={
  display: "inline-block",
  padding: "0px 0px 0px 15px",
  margin: "10px 0px 0px 0px"
}

const radio1={
  display: "inline-block",
margin: "10px 0px 0px 0px"
}

const title=(
  <h1><strong>Create Event</strong></h1>
);
