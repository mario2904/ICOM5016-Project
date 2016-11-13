import React, { Component } from 'react';
import {Form, Grid, Icon,Input, Image, Segment,Item, Menu, Divider, Header, Button } from 'semantic-ui-react'
export default class CreateEventForm extends Component {
  submit (event) {
    event.preventDefault();
    // Do the sign-in validation here...

    // If successful, go to prof page
    browserHistory.push('/home');
  }
  renderCategoriesCheckboxes() {
    return categories.map((category) => {
      const { label, value } = category;
      return (
        <Form.Checkbox label={label} name='categories' value={value} key={value}/>
      );
    });
  }
  render () {
    return (
      <div style={{padding:100}}>

        <Header as='h2' attached='top'>
        <Icon name="write square" size="large"></Icon>Create Event</Header>

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

            <Form.Field>
              <Icon name="tag"></Icon>
              <label>Categories</label>
              <Form.Group>
                {this.renderCategoriesCheckboxes()}
              </Form.Group>
            </Form.Field>

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
    );
  }
}

const categories = [
  { label: 'Food', value: 'food' },
  { label: 'Music', value: 'music' },
  { label: 'Fundraiser', value: 'fundraiser' },
  { label: 'Arts', value: 'arts' },
  { label: 'Social', value: 'social' },
  { label: 'Educational', value: 'educational' },
  { label: 'Business', value: 'business' },
  { label: 'Sport', value: 'sport' },
  { label: 'Competition', value: 'competition' },
  { label: 'Other', value: 'other' },
];
