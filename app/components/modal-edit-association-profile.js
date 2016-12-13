import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Dropzone from 'react-dropzone';
import { Segment, Header, Label, Form, Icon, Button, Modal, Image, Grid } from 'semantic-ui-react';

import { editAssociation } from '../actions';

class ModalEditAssociationProfile extends Component {
  state = { files: []};

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({files: acceptedFiles});
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
  }

  handleSubmit = (e, serializedForm) => {
    e.preventDefault();
    const { files } = this.state;
    const { dispatch } = this.props;
    console.log({...serializedForm, image_path: files[0]});
    dispatch(editAssociation({...serializedForm, image_path: files[0]}));

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

    const { association_name, image_path, initials, association_location, page_link, bio } = this.props;
    const { files } = this.state;
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
        <Header inverted style={{backgroundColor:"rgb(35, 37, 40)", color:"white"}} icon='edit' content='Edit Association Profile' />
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

            <Form.Input label='Association Name' name='association_name' placeholder='Association Name' defaultValue={association_name} />
            <Form.Input label='Association Initials' name='initials' placeholder='Association Initials' defaultValue={initials} />
            <Form.Input label='Main Office Location' name='location' placeholder='Main Office Location' defaultValue={association_location}  />
            <Form.Input label='Association Link' name='page_link' placeholder='Association Link' defaultValue={page_link} />
            <Form.TextArea label='Bio' name='bio' placeholder='Tell us more about your association...' defaultValue={bio} />
            <Button type='submit'>Submit</Button>

          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

ModalEditAssociationProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isSuccessful: PropTypes.bool,
  isWaiting: PropTypes.bool,
  association_name: PropTypes.string,
  image_path: PropTypes.string,
  initials: PropTypes.string,
  association_location: PropTypes.string,
  page_link: PropTypes.string,
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

export default connect(mapStateToProps)(ModalEditAssociationProfile);
