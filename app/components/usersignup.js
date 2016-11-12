// import { Form, FormGroup, FormControl, Grid, Col, Checkbox, Button, ControlLabel, HelpBlock } from 'react-bootstrap';
import { Form, Checkbox, Button, Grid, Icon, Header, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';


export default class Usignup extends Component {

  state = { serializedForm: {} };

  handleGenderChange = (e, { value }) => this.setState({ gender: value });

  checkPasswordLength(string1){
    var integer = string1.length;
    if(integer>=8){return true};
    if(integer < 8){return false};
  }

  submit (event) {
    event.preventDefault();
    if(this.checkPasswordLength(this.state.password)){
      axios.post('/api/create-student', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: this.state.age,
        gender: this.state.gender,
        hometown: this.state.hometown,
        college: this.state.college,
        major: this.state.major,
        email: this.state.email,
        password: this.state.password
      })
      .then(function (response) {
        // If successful, go to home page
        console.log('Success');
        console.log(response);
        browserHistory.push('/home');
      })
      .catch(function (error) {
        // Else do nothing
        console.log('Error');
        console.log(error);
      });
    }
  }

  render() {
    const { serializedForm, gender } = this.state;

    return (
      <div>
        <Header as='h2' attached='top'>
          Student Sign-up
        </Header>
        <Segment attached>
          <Form>
            <Form.Input label='First Name' name='firstName' placeholder='First Name'/>
            <Form.Input label='Last Name' name='lastName' placeholder='Last Name' />
            <Form.Input label='E-mail' name='email' placeholder='E-mail' type='email' />
            <Form.Input label='Password' name='password' placeholder='Password' type='password' />
            <Form.Input label='Re-enter Password' name='rePassword' placeholder='Re-enter Password' type='password' />
            <Form.Field>
              <label>Gender</label>
              <Form.Group inline>
                <Form.Radio label='Male' name='gender' value='male' checked={gender === 'male'} onChange={this.handleGenderChange} />
                <Form.Radio label='Female' name='gender' value='female' checked={gender === 'female'} onChange={this.handleGenderChange} />
                <Form.Radio label='Other' name='gender' value='other' checked={gender === 'other'} onChange={this.handleGenderChange} />
              </Form.Group>
            </Form.Field>
            <Form.Input label='Hometown' name='hometown' placeholder='Hometown' />
            <Form.Select label='College' name='college' options={colleges} placeholder='College' />
            <Form.Select label='Major' name='major' options={majors} placeholder='Major' />

            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Segment>
      </div>
    );
  }

  // render () {
  //   return (
  //     <Grid>
  //
  //     <h1><strong>Welcome to E-Spotter</strong> </h1>
  //       <Form horizontal>
  //
  //       <FormGroup controlId="formHorizontalFname" >
  //         <Col sm={6}>
  //           <ControlLabel>First Name</ControlLabel>
  //           <FormControl t
  //             ype="text"
  //             placeholder="First Name"
  //             value={this.state.firstName}
  //             onChange={(e) => {this.setState({firstName: e.target.value})}}
  //           />
  //         </Col>
  //       </FormGroup>
  //
  //       <FormGroup controlId="formHorizontalLname" >
  //         <Col sm={6}>
  //           <ControlLabel>Last Name</ControlLabel>
  //           <FormControl
  //             type="text"
  //             placeholder="Last Name"
  //             value={this.state.lastName}
  //             onChange={(e) => {this.setState({lastName: e.target.value})}}
  //           />
  //         </Col>
  //       </FormGroup>
  //
  //       <FormGroup controlId="formHorizontalEmail" >
  //         <Col sm={6}>
  //           <ControlLabel>Email</ControlLabel>
  //           <FormControl
  //             type="email"
  //             placeholder="Email"
  //             value={this.state.email}
  //             onChange={(e) => {this.setState({email: e.target.value})}}
  //           />
  //         </Col>
  //       </FormGroup>
  //
  //       <FormGroup controlId="formHorizontalPassword" >
  //         <Col sm={6}>
  //           <ControlLabel>Password (Must be 8 characters or longer)</ControlLabel>
  //           <FormControl
  //             type="password"
  //             placeholder="Enter Password"
  //             value={this.state.password}
  //             onChange={(e) => {this.setState({password: e.target.value})}}
  //           />
  //         </Col>
  //       </FormGroup>
  //
  //       <FormGroup controlId="formHorizontalPassword" >
  //         <Col sm={6}>
  //           <ControlLabel>Re-enter Password</ControlLabel>
  //           <FormControl
  //             type="password"
  //             placeholder="Re-enter Password"
  //             value={this.state.passwdChk}
  //             onChange={(e) => {this.setState({passwdChk: e.target.value})}}
  //           />
  //         </Col>
  //       </FormGroup>
  //
  //       <FormGroup controlId="formHorizontalBirthday" >
  //         <Col sm={6}>
  //           <ControlLabel>{"Birthday"}</ControlLabel>
  //           <FormControl
  //             type="date"
  //             value={this.state.age}
  //             onChange={(e) => {this.setState({age: e.target.value})}}
  //           />
  //         </Col>
  //       </FormGroup>
  //
  //       <FormGroup>
  //         <Col sm={6}>
  //         <ControlLabel
  //           style={{display:"block", textAlign:"left", margin: "10px 0px 0px 0px"}}>Gender: </ControlLabel>
  //           <div style={radio1}>
  //             <p><input
  //                 id="one"
  //                 type="radio"
  //                 name="optradio"
  //                 value="Male"
  //                 onChange={(e) => {this.setState({gender: e.target.value})}}
  //                 />
  //               Male
  //             </p>
  //           </div>
  //         <div  style={radioStyle}>
  //             <p><input
  //                 id="two"
  //                 type="radio"
  //                 name="optradio"
  //                 value= "Female"
  //                 onChange={(e) => {this.setState({gender: e.target.value})}}
  //                 />
  //               Female
  //             </p>
  //       </div>
  //          <div style={radioStyle}>
  //             <p><input
  //                 id="three"
  //                 type="radio"
  //                 name="optradio"
  //                 value= "Other"
  //                 onChange={(e) => {this.setState({gender: e.target.value})}}
  //                 />
  //               Other
  //             </p>
  //          </div>
  //         </Col>
  //       </FormGroup>
  //
  //       <FormGroup controlId="formHorizontalHometown" >
  //         <Col sm={6}>
  //           <ControlLabel>{"Hometown"}</ControlLabel>
  //           <FormControl
  //             type="text"
  //             placeholder="Hometown"
  //             value={this.state.hometown}
  //             onChange={(e) => {this.setState({hometown: e.target.value})}}
  //           />
  //         </Col>
  //       </FormGroup>
  //
  //       <FormGroup controlId="formHorizontalCollege" >
  //         <Col sm={6}>
  //           <ControlLabel>{"College"}</ControlLabel>
  //           <FormControl
  //             type="text"
  //             placeholder="College"
  //             value={this.state.college}
  //             onChange={(e) => {this.setState({college: e.target.value})}}
  //           />
  //         </Col>
  //       </FormGroup>
  //
  //       <FormGroup controlId="formControlsSelect">
  //         <Col sm={6}>
  //           <ControlLabel>Major</ControlLabel>
  //           <FormControl
  //             componentClass="select"
  //             placeholder="Select Major"
  //             onChange={(e) => {this.setState({major: e.target.value})}}>
  //             <option value="select">Select</option>
  //             <option value="ICOM">ICOM</option>
  //             <option value="INEL">INEL</option>
  //             <option value="INQU">INQU</option>
  //             <option value="INCI">INCI</option>
  //             <option value="INME">INME</option>
  //             <option value="ININ">ININ</option>
  //             <option value="Other">other</option>
  //           </FormControl>
  //         </Col>
  //       </FormGroup>
  //
  //       <FormGroup>
  //         <Col >
  //
  //           <Button type="submit" bsStyle="primary" onClick={this.submit}>
  //             Submit
  //           </Button>
  //         </Col>
  //       </FormGroup>
  //
  //       </Form>
  //
  //     </Grid>
  //   );
  // }
}

const majors = [
  { text: 'ICOM', value: 'icom' },
  { text: 'INEL', value: 'inel' },
  { text: 'INQU', value: 'inqu' },
  { text: 'INCI', value: 'inci' },
  { text: 'INME', value: 'inme' },
  { text: 'ININ', value: 'inin' },
  { text: 'OTHER', value: 'other' },
];

const colleges = [
  { text: 'University of Puerto Rico, Arecibo', value: 'upra' },
  { text: 'University of Puerto Rico, Aguadilla', value: 'uprag' },
  { text: 'University of Puerto Rico, Bayamon', value: 'uprb' },
  { text: 'University of Puerto Rico, Carolina', value: 'uprc' },
  { text: 'University of Puerto Rico, Cayey', value: 'uprca' },
  { text: 'University of Puerto Rico, Ciencias Medicas', value: 'uprcm' },
  { text: 'University of Puerto Rico, Humacao', value: 'uprh' },
  { text: 'University of Puerto Rico, Mayaguez', value: 'uprm' },
  { text: 'University of Puerto Rico, Rio Piedras', value: 'uprrp' },
  { text: 'University of Puerto Rico, Ponce', value: 'uprp' },
  { text: 'University of Puerto Rico, Utuado', value: 'upru' },
];
