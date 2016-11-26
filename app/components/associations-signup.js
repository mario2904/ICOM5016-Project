import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Form, Checkbox, Button, Grid, Icon, Header, Segment } from 'semantic-ui-react';

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
      // If successful, go to login page
      console.log('Success');
      console.log(response);
      browserHistory.push('/login');
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
      <div style={{backgroundColor:"rgb(247, 247, 247)"}}>
        <Grid style={{width:"80%", height:"80%", margin:"auto", paddingTop:50,
        paddingBottom:75}}>
        <Header style={{width:"100%", textAlign:"center",
          backgroundColor:"rgb(35, 37, 40)", color:"white"}} as='h2' attached='top'>
          <Icon name="university" color="teal"></Icon>Association Sign-up
        </Header>
        <Segment attached>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input label='Association Name' name='name' placeholder='Association Name'/>
            <Form.Input label='Association Initials' name='initials' placeholder='Association Initials' />
            <Form.Input label='E-mail' name='email' placeholder='E-mail' type='email' />
            <Form.Input label='Password' name='password' placeholder='Password' type='password' />
            <Form.Input label='Re-enter Password' name='rePassword' placeholder='Re-enter Password' type='password' />
            <Form.Select label='Main Office Location' name='location' options={locations} placeholder='Main Office Location' />
            <Form.Input label='Association Link' name='link' placeholder='Association Link' />
            <Form.TextArea label='Bio' name='bio' placeholder='Tell us more about your association...' />
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button animated color="teal"type='submit'>
              <Button.Content visible>
              Submit
            </Button.Content>
            <Button.Content hidden>
              <Icon name="smile"></Icon>
            </Button.Content>
            </Button>
          </Form>
        </Segment>
      </Grid>
      </div>
    );
  }
}

const locations = [
  { text: 'Stefani', value: 'stefani' },
  { text: 'Ingenieria Quimica', value: 'ingenieria_quimica' },
  { text: 'Edificio de Civil', value: 'edificio_de_civil' },
  { text: 'Luchetti', value: 'luchetti' },
  { text: 'Ingenieria Industrial', value: 'ingenieria_industrial' },
  { text: 'Other', value: 'other' },
];
