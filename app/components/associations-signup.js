import { Form, Checkbox, Button, Grid, Icon, Header, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class Asignup extends Component {

  state = { serializedForm: {} };

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
      axios.post('/api/create-association', {
        name: this.state.name,
        initials: this.state.initials,
        location: this.state.location,
        link: this.state.link,
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
    return (
      <div>
        <Header as='h2' attached='top'>
          Association Sign-up
        </Header>
        <Segment attached>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input label='Association Name' name='name' placeholder='Association Name'/>
            <Form.Input label='Association Initials' name='initials' placeholder='Association Initials' />
            <Form.Input label='E-mail' name='email' placeholder='E-mail' type='email' />
            <Form.Input label='Password' name='password' placeholder='Password' type='password' />
            <Form.Input label='Re-enter Password' name='rePassword' placeholder='Re-enter Password' type='password' />
            <Form.Select label='Main Office Location' name='location' options={location} placeholder='Main Office Location' />
            <Form.Input label='Association Link' name='link' placeholder='Association Link' />
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

const location = [
  { text: 'Stefani', value: 'stefani' },
  { text: 'Ingenieria Quimica', value: 'ingenieria_quimica' },
  { text: 'Edificio de Civil', value: 'edificio_de_civil' },
  { text: 'Luchetti', value: 'luchetti' },
  { text: 'Ingenieria Industrial', value: 'ingenieria_industrial' },
  { text: 'Other', value: 'other' },
];
