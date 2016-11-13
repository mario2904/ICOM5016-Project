import React, { Component } from 'react';
import { Link } from 'react-router'
import { Segment, Header, Label, Form, Checkbox, Icon, Button, Modal } from 'semantic-ui-react';


export default class ModalEditEvent extends Component {

  state = { serializedForm: {} };

  handleSubmit = (e, serializedForm) => {
    e.preventDefault()
    this.setState({ serializedForm })
  }
  renderCategoriesCheckboxes() {
    return categories.map((category) => {
      const { label, value } = category;
      return (
        <Form.Checkbox label={label} name='categories' value={value} defaultChecked={this.props.eventInfo.categories.includes(label)} key={value}/>
      );
    });
  }

  render() {
    if(!this.props.eventInfo.categories)
      return null;
    const { name, id, associationName, associationId, image, startDate, endDate, startTime, endTime, location, description, registrationLink } = this.props.eventInfo;
    const trigger = (
      <Button
        style={{textAlign: 'middle'}}
        size='tiny'
        icon='edit'
        color='blue'
        content='Edit' />
    );
    return (
      <Modal trigger={trigger}>
        <Header icon='edit' content='Edit Event' />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>


            <Icon name="idea"></Icon>
            <Form.Input label='Event Name' name='eventName' placeholder='Event Name' defaultValue={name}/>
            <Icon name="linkify"></Icon>
            <Form.Input label='Registration Link' name='registrationLink' placeholder='RegistrationLink' defaultValue={registrationLink}/>
            <Icon name="image"></Icon>
            <Form.Input label="Event Pic/Flyer" name='eventPic' placeholder="choose your flyer" type="file" defaultValue={image}/>
            <Form.Field>
              <Icon name="tag"></Icon>
              <label>Categories</label>
              <Form.Group>
                {this.renderCategoriesCheckboxes()}
              </Form.Group>
            </Form.Field>
            <Icon name="info circle"></Icon>
            <Form.TextArea label="Event Info" name='eventInfo' placeholder="Tell us more about your event" rows="4" defaultValue={description}/>
            <Icon name="map pin"></Icon>
            <Form.Input label="Location" name='location' placeholder="Where is your event going to be at?" defaultValue={location}/>
            <Icon name="checked calendar"></Icon>
            <Form.Input label="Start Date" name='startDate' placeholder="mm/dd/yyyy" type="date" defaultValue={startDate}/> {/* yyyy/mm/dd */}
            <Icon name="wait" flipped="horizontally"></Icon>
            <Form.Input label="Start Time" name="startTime" type="time" placeholder="--:-- --" defaultValue={startTime}/>  {/* 24 hr format */}
            <Icon name="delete calendar"></Icon>
            <Form.Input label="End Date" name='endDate' placeholder="mm/dd/yyyy" type="date" defaultValue={endDate}/>
              <Icon name="wait"></Icon>
            <Form.Input label="End Time" name="endTime" type="time" placeholder="--:-- --" defaultValue={endTime}/>
            <Form.TextArea label='Reasons' name='reasons' placeholder='Tell us more of the reasons for this change...' />
            <Button color="teal" type='submit'>Submit</Button>


          </Form>
        </Modal.Content>
      </Modal>
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
