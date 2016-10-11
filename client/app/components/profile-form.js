import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel, Radio} from 'react-bootstrap';

export default class ProfileForm extends Component {
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


          <FormGroup controlId="formHorizontalEmail" >
            <Col sm={6}>
              <ControlLabel>Hometown</ControlLabel>
              <FormControl type="Hometown" placeholder="Hometown" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsFile" >
            <Col sm={6}>
              <ControlLabel>Profile Pic</ControlLabel>
              <input type="file" id="formsControlsFile"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalMajor">
            <Col sm={6}>
            <ControlLabel>Major</ControlLabel>
              <FormControl type="major" placeholder="Major"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalCollege">
            <Col sm={6}>
            <ControlLabel>College</ControlLabel>
              <FormControl type="college" placeholder="College"/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={6}>
            <ControlLabel>Gender</ControlLabel>
              <div class="radio">
                <p><input type="radio" name="optradio"/> Male</p>
              </div>
            <div class="radio">
                <p><input type="radio" name="optradio"/> Female</p>
          </div>
             <div class="radio">
                <p><input type="radio" name="optradio"/> Other</p>
             </div>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea">
            <Col sm={6}>
            <ControlLabel>Bio</ControlLabel>
            <FormControl componentClass="textarea" placeholder="textarea"
            type="Biography" placeholder="Biography" />
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
