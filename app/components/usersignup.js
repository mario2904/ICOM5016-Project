import { Form, Checkbox, Button, Grid, Icon, Header, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class Usignup extends Component {

  state = { serializedForm: {} };

  handleGenderChange = (e, { value }) => this.setState({ gender: value });

  handleSubmit = (e, serializedForm) => {
    e.preventDefault()
    this.setState({ serializedForm })
  }

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
          <Form onSubmit={this.handleSubmit}>
            <Form.Input label='First Name' name='firstName' placeholder='First Name'/>
            <Form.Input label='Last Name' name='lastName' placeholder='Last Name' />
            <Form.Input label='E-mail' name='email' placeholder='E-mail' type='email' />
            <Form.Input label='Password' name='password' placeholder='Password' type='password' />
            <Form.Input label='Re-enter Password' name='rePassword' placeholder='Re-enter Password' type='password' />
            <Form.Input label='Birthday' name='birthday' placeholder='Birthday' type='date' />
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
            <Form.TextArea label='Bio' name='bio' placeholder='Tell us more about you...' />
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Segment>
      </div>
    );
  }
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
