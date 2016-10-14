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
            <Col>
              <ControlLabel>Hometown</ControlLabel>
              <FormControl type="Hometown" placeholder="Hometown" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsFile" >
            <Col>
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
            <ControlLabel style={{display:"block", textAlign:"left", margin: "10px 0px 0px 0px"}}>Gender: </ControlLabel>
              <div style={radio1}>
                <p><input id="one" type="radio" name="optradio"/> Male</p>
              </div>
            <div style={radioStyle}>
                <p><input id="two" type="radio" name="optradio"/> Female</p>
          </div>
             <div style={radioStyle}>
                <p><input id="three" type="radio" name="optradio"/> Other</p>
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

const radioStyle={
  display: "inline-block",
  padding: "0px 0px 0px 15px",
  margin: "10px 0px 0px 0px"
}

const radio1={
  display: "inline-block",
margin: "10px 0px 0px 0px"
}
