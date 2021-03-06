import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Dropzone from 'react-dropzone';
import { Segment, Header, Label, Form, Checkbox, Icon, Button, Modal, Grid, Image } from 'semantic-ui-react';

import { hometown_options, college_options, major_options } from '../options';
import { editStudent } from '../actions';

class ModalEditStudentProfile extends Component {
  state = { files: []};

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({files: acceptedFiles});
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
  }

  handleGenderChange = (e, { value }) => this.setState({ gender: value });

  handleSubmit = (e, serializedForm) => {
    e.preventDefault();
    const { files, gender } = this.state;
    const { dispatch } = this.props;
    console.log({...serializedForm, image_path: files[0], gender});
    dispatch(editStudent({...serializedForm, image_path: files[0]}));
  }
  componentWillMount() {
    this.setState({ gender: this.props.gender });
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

    const { files, gender } = this.state;
    const { first_name, last_name, image_path, hometown, college, major, bio } = this.props;
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
        <Header inverted style={{backgroundColor:"rgb(35, 37, 40)", color:"white"}} icon='edit' content='Edit Student Profile' />
        <Modal.Content>
          <Icon name="image"></Icon>
          <label><strong>Profile Picture</strong></label>
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
            <Form.Input label='First Name' name='first_name' placeholder='First Name' defaultValue={first_name} />
            <Form.Input label='Last Name' name='last_name' placeholder='Last Name' defaultValue={last_name} />
            <Form.Field>
              <label>Gender</label>
              <Form.Group inline>
                <Form.Radio label='Male' name='gender' value='Male' checked={gender === 'Male'} onChange={this.handleGenderChange} />
                <Form.Radio label='Female' name='gender' value='Female' checked={gender === 'Female'} onChange={this.handleGenderChange} />
                <Form.Radio label='Other' name='gender' value='Other' checked={gender === 'Other'} onChange={this.handleGenderChange} />
              </Form.Group>
            </Form.Field>
            <Form.Select label='Hometown' name='hometown' options={hometown_options.map(h => {return {text: h, value: h}})} placeholder='Hometown' defaultValue={hometown} />
            <Form.Select label='College' name='college' options={college_options.map(c => {return {text: c, value: c}})} placeholder='College' defaultValue={college} />
            <Form.Select label='Major' name='major' options={major_options.map(m => {return {text: m, value: m}})} placeholder='Major' defaultValue={major} />
            <Form.TextArea label='Bio' name='bio' placeholder='Tell us more about you...' defaultValue={bio}/>
            <Button color="teal" type='submit'>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}


ModalEditStudentProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isSuccessful: PropTypes.bool,
  isWaiting: PropTypes.bool,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  gender: PropTypes.string,
  hometown: PropTypes.string,
  college: PropTypes.string,
  major: PropTypes.string,
  bio: PropTypes.string
}

function mapStateToProps(state) {
  const { form } = state;
  const { isSuccessful, isWaiting } = form;

  return {
    isSuccessful,
    isWaiting,
  };
}

export default connect(mapStateToProps)(ModalEditStudentProfile);
