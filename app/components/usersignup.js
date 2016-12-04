import { Form, Checkbox, Button, Grid, Icon, Header, Segment,Label } from 'semantic-ui-react';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class Usignup extends Component {

  state = { serializedForm: {} };

  handleGenderChange = (e, { value }) => this.setState({ gender: value });

  handleSubmit = (e, serializedForm) => {
    e.preventDefault();
    console.log(serializedForm);
    const { password, re_password, terms } = serializedForm;
    if(password.length >= 8 && re_password.length >= 8 && password === re_password && terms) {
      // Send to server...
      axios.post('/api/create/student', serializedForm)
        .then(function (response) {
          browserHistory.push('/');
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    //this.setState({ serializedForm });
  }

  checkPassword(pass, re_pass){
    return (pass.length >= 8 && re_pass.length >= 8 && pass === re_pass);
  }

  render() {
    const { serializedForm, gender } = this.state;

    return (
      <div style={{backgroundColor:"rgb(247, 247, 247)"}}>
      <Grid style={{width:"80%", height:"80%", margin:"auto", paddingTop:50,
      paddingBottom:75}}>
        <Grid.Row>
        <Header style={{width:"100%", textAlign:"center",
          backgroundColor:"rgb(35, 37, 40)", color:"white"}} as='h2' attached='top'>
          <Icon name="student" color="blue"></Icon>Student Sign-up
        </Header>
        <Segment attached style={{width:"100%"}}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input label='First Name' name='first_name' placeholder='First Name'/>
            <Form.Input label='Last Name' name='last_name' placeholder='Last Name' />
            <Form.Input label='E-mail' name='email' placeholder='E-mail' type='email' />
            <Form.Input label='Password' name='password' placeholder='Password' type='password' />
            <Form.Input label='Re-enter Password' name='re_password' placeholder='Re-enter Password' type='password' />
            <Form.Input label='Birthday' name='birthdate' placeholder='Birthday' type='date' />
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
              <Checkbox name='terms' label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button animated color="blue"type='submit'>
              <Button.Content visible>
              Submit
            </Button.Content>
            <Button.Content hidden>
              <Icon name="smile"></Icon>
            </Button.Content>
            </Button>
          </Form>
        </Segment>
        </Grid.Row>
      </Grid>
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
