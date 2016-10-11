import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel, Radio} from 'react-bootstrap';
import ProfileAssociationModal from "./profile-association-modal";
export default class ProfileAssociationForm extends Component {
  submit (event) {
    event.preventDefault();
    // Do the sign-in validation here...

    // If successful, go to prof page
    browserHistory.push('/profile');
  }
  render () {
    return (
      <Grid>
        <Form horizontal>
          <FormGroup controlId="formHorizontalLocation" >
            <Col sm={6}>
              <ControlLabel>Location</ControlLabel>
              <FormControl type="Location" placeholder="Location" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsFile" >
            <Col sm={6}>
              <ControlLabel>Profile Pic</ControlLabel>
              <input type="file" id="formsControlsFile"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPageLink">
            <Col sm={6}>
            <ControlLabel>Official Page Link</ControlLabel>
              <FormControl type="pagelink" placeholder="Page Link"/>
            </Col>
          </FormGroup>

        <FormGroup controlId="formControlsSelectMultiple">
           <Col sm={6}>
           <ControlLabel>Sponsors</ControlLabel>
             <FormControl componentClass="select" multiple>
               <option value="select">select (multiple)</option>
               <option value="other">...</option>
             </FormControl>
               <Radio>Add</Radio>
               <Radio>Remove</Radio>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col sm={6}>
            <ControlLabel>Sponsors</ControlLabel>
              <ProfileAssociationModal></ProfileAssociationModal>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea">
            <Col sm={6}>
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="textarea"
            type="Description" placeholder="Description"/>
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
