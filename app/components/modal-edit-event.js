import React, { Component } from 'react';
import { Link } from 'react-router'
import { Segment, Header, Label, Form, Checkbox, Icon, Button, Modal, Image } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

export default class ModalEditEvent extends Component {

  state = { files: []};

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({files: acceptedFiles});
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
  }
  handleSubmit = (e, serializedForm) => {
    e.preventDefault();
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
    const { files } = this.state;
    const { event_name, event_id, association_name, association_id, image_path, start_date, end_date, start_time, end_time, room, description, registration_link } = this.props.eventInfo;
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
        <Header inverted style={{backgroundColor:"rgb(35, 37, 40)", color:"white"}}icon='edit' content='Edit Event' />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>


            <Icon name="idea"></Icon>
            <Form.Input label='Event Name' name='event_name' placeholder='Event Name' defaultValue={event_name}/>
            <Icon name="linkify"></Icon>
            <Form.Input label='Registration Link' name='registration_link' placeholder='RegistrationLink' defaultValue={registration_link}/>
            <Icon name="image"></Icon>



            <Form.Field label="Event Pic/Flyer"/>
            <Segment >
              <Dropzone
                multiple={false}
                accept='image/*'
                onDrop={this.onDrop}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
              {
                (files.length === 0) ?
                <Image size='medium' src={image_path} /> :
                <Image size='medium' src={files[0].preview} />
              }
            </Segment>



            <Form.Field>
              <Icon name="tag"></Icon>
              <label>Categories</label>
              <Form.Group>
                {this.renderCategoriesCheckboxes()}
              </Form.Group>
            </Form.Field>
            <Icon name="info circle"></Icon>
            <Form.TextArea label="Event Info" name='description' placeholder="Tell us more about your event" rows="4" defaultValue={description}/>
            <Icon name="map pin"></Icon>
            <Form.Input label="Location" name='room' placeholder="Where is your event going to be at?" defaultValue={room}/>
            <Icon name="checked calendar"></Icon>
            <Form.Input label="Start Date" name='start_date' placeholder="mm/dd/yyyy" type="date" defaultValue={start_date}/> {/* yyyy/mm/dd */}
            <Icon name="wait" flipped="horizontally"></Icon>
            <Form.Input label="Start Time" name="start_time" type="time" placeholder="--:-- --" defaultValue={start_time}/>  {/* 24 hr format */}
            <Icon name="delete calendar"></Icon>
            <Form.Input label="End Date" name='end_date' placeholder="mm/dd/yyyy" type="date" defaultValue={end_date}/>
              <Icon name="wait"></Icon>
            <Form.Input label="End Time" name="end_time" type="time" placeholder="--:-- --" defaultValue={end_time}/>
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
