import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Form, Grid, Icon, Input, Image, Segment, Item, Menu, Divider, Header, Button } from 'semantic-ui-react'
import Dropzone from 'react-dropzone';

import { createEvent } from '../actions';

class CreateEventForm extends Component {
  state = {files: []};

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({files: acceptedFiles});
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
  }

  handleSubmit = (e, serializedForm) => {
    e.preventDefault();
    console.log(serializedForm);
    // Check that the association uplodaded an image.
    const { files } = this.state;
    if(files.length === 0) return;

    console.log({...serializedForm, image_path: files[0]});
    // Send to server...
    const { dispatch } = this.props;
    dispatch(createEvent({...serializedForm, image_path: files[0]}));
  }

  componentWillUpdate(nextProps) {
    const { isWaiting, isSuccessful } = nextProps;
    // Redirect to their respective homes if already authenticated
    if (!isWaiting && isSuccessful) {
      browserHistory.push('/');
    }
    if(!isWaiting && !isSuccessful) {
      console.log("Error: create student not successful.");
    }
    if(isWaiting) {
      console.log("Waiting for confirmation");
    }

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
    const { files } = this.state;
    return (
      <div style={{padding:100}}>

        <Header as='h2' attached='top' >
        <Icon name="write square" size="large" circular></Icon>Create Event</Header>

        <Segment attached>
          <Form onSubmit={this.handleSubmit}>

            <Icon name="idea"></Icon>
            <Form.Input label='Event Name' name='event_name' placeholder='Event Name'/>

            <Icon name="linkify"></Icon>
            <Form.Input label='Registration Link'
              name='registration_link' placeholder='RegistrationLink' />

              <Form.Field label="Event Pic/Flyer"/>
              <Segment >
                <Dropzone
                  multiple={false}
                  accept='image/*'
                  onDrop={this.onDrop}>
                  <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                {
                  (files.length === 0) ? null :
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
            <Form.TextArea label="Event Info" name='description'
              placeholder="Tell us more about your event" rows="4"/>

            <Icon name="map pin"></Icon>
            <Form.Input label="Location" name='location'
              placeholder="Where is your event going to be at?"/>

            <Icon name="checked calendar"></Icon>
            <Form.Input label="Start Date" name='start_date' placeholder="mm/dd/yyyy"
                type="date"/>

              <Icon name="wait" flipped="horizontally"></Icon>
            <Form.Input label="Start Time" name="start_time" type="time"
                placeholder="--:-- --"/>

            <Icon name="delete calendar"></Icon>
            <Form.Input label="End Date" name='end_date' placeholder="mm/dd/yyyy"
                type="date"/>

              <Icon name="wait"></Icon>
            <Form.Input label="End Time" name="end_time" type="time"
                placeholder="--:-- --"/>

              <Button color="teal"type='submit'>Submit</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

const categories = [
  { label: 'Food', value: 'Food' },
  { label: 'Fundraiser', value: 'Fundraiser' },
  { label: 'Arts', value: 'Arts' },
  { label: 'Social', value: 'Social' },
  { label: 'Educational', value: 'Educational' },
  { label: 'Business', value: 'Business' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Competition', value: 'Competition' },
  { label: 'Other', value: 'Other' },
];

// Type cheking
CreateEventForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isSuccessful: PropTypes.bool,
  isWaiting: PropTypes.bool
}

function mapStateToProps(state) {
  const { form } = state;
  const { isSuccessful, isWaiting } = form;

  return {
    isSuccessful,
    isWaiting
  };
}

export default connect()(CreateEventForm);
