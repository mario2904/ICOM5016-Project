import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Dropzone from 'react-dropzone';
import { Segment, Header, Label, Form, Checkbox, Icon, Button, Modal, Image, Grid } from 'semantic-ui-react';

import { editEvent } from '../actions';

class ModalEditEvent extends Component {

  state = { files: []};

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({files: acceptedFiles});
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
  }
  handleSubmit = (e, serializedForm) => {
    e.preventDefault();
    const { files } = this.state;
    const { event_id, dispatch } = this.props;
    console.log({...serializedForm, event_id, image_path: files[0]});
    dispatch(editEvent({...serializedForm, event_id, image_path: files[0]}));

  }
  renderCategoriesCheckboxes() {
    const { categories } = this.props;
    return categories_options.map((category) => {
      const { label, value } = category;
      return (
        <Form.Checkbox label={label} name='categories' value={value} defaultChecked={categories.includes(label)} key={value}/>
      );
    });
  }

  componentWillUpdate(nextProps) {
    const { isWaiting, isSuccessful, event_id } = nextProps;
    // Redirect to their respective homes if already authenticated
    if (!isWaiting && isSuccessful) {
      window.location.reload();
    }
    if(!isWaiting && !isSuccessful) {
      console.log("Error: create student not successful.");
    }
    if(isWaiting) {
      console.log("Waiting for confirmation");
    }

  }

  render() {
    if(!this.props.categories)
      return null;
    const { files } = this.state;
    const { event_name, image_path, start_date, end_date, start_time, end_time, room, description, registration_link } = this.props;
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
          <Icon name="image"></Icon>
          <label><strong>Event Picture/Flyer</strong></label>
          <Segment>
            <Grid stackable>
              <Grid.Column width={8}>
                <Dropzone
                  multiple={false}
                  accept='image/*'
                  onDrop={this.onDrop}>
                  <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
              </Grid.Column>
              <Grid.Column width={8}>
                {
                  (files.length === 0) ?
                  <Image size='medium' src={image_path} /> :
                  <Image size='medium' src={files[0].preview} />
                }
              </Grid.Column>
            </Grid>
          </Segment>

          <Form onSubmit={this.handleSubmit}>

            <Icon name="idea"></Icon>
            <Form.Input label='Event Name' name='event_name' placeholder='Event Name' defaultValue={event_name}/>
            <Icon name="linkify"></Icon>
            <Form.Input label='Registration Link' name='registration_link' placeholder='RegistrationLink' defaultValue={registration_link}/>
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
            <Form.Input label="Location" name='location' placeholder="Where is your event going to be at?" defaultValue={room}/>
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

const categories_options = [
  { label: 'Food', value: 'Food' },
  { label: 'Music', value: 'Music' },
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
ModalEditEvent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isSuccessful: PropTypes.bool,
  isWaiting: PropTypes.bool,
  event_name: PropTypes.string,
  image_path: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  start_time: PropTypes.string,
  end_time: PropTypes.string,
  room: PropTypes.string,
  description: PropTypes.string,
  registration_link: PropTypes.string,
  categories: PropTypes.array
}

function mapStateToProps(state) {
  const { form } = state;
  const { isSuccessful, isWaiting } = form;

  return {
    isSuccessful,
    isWaiting
  };
}

export default connect(mapStateToProps)(ModalEditEvent);
