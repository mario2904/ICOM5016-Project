import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Form, Checkbox, Button, Grid, Icon, Header, Segment,Label } from 'semantic-ui-react';

import { hometown_options, college_options, major_options } from '../options';
import { createStudent } from '../actions';

class CreateStudent extends Component {

  state = { serializedForm: {} };

  handleGenderChange = (e, { value }) => this.setState({ gender: value });

  handleSubmit = (e, serializedForm) => {
    e.preventDefault();
    const { password, re_password, terms } = serializedForm;
    if(password.length >= 8 && re_password.length >= 8 && password === re_password && terms) {
      console.log(serializedForm);
      // Send to server...
      const { dispatch } = this.props;
      dispatch(createStudent(serializedForm));
    }
  }

  componentWillUpdate(nextProps) {
    const { isWaiting, isSuccessful } = nextProps;
    // Redirect to their respective homes if already authenticated
    if (!isWaiting && isSuccessful) {
      browserHistory.push('/');
    }
    if(!isWaiting && !isSuccessful) {
      console.log("Error: create student not successful.");
    }
    if(isWaiting) {
      console.log("Waiting for confirmation");
    }

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
            <Form.Select label='Hometown' name='hometown' options={hometown_options.map(h => {return {text: h, value: h}})} placeholder='Hometown' />
            <Form.Select label='College' name='college' options={college_options.map(c => {return {text: c, value: c}})} placeholder='College' />
            <Form.Select label='Major' name='major' options={major_options.map(m => {return {text: m, value: m}})} placeholder='Major' />
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


// Type cheking
CreateStudent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isSuccessful: PropTypes.bool,
  isWaiting: PropTypes.bool
}

function mapStateToProps(state) {
  const { form } = state;
  const { isSuccessful, isWaiting } = form;

  return {
    isSuccessful,
    isWaiting
  };
}

export default connect(mapStateToProps)(CreateStudent);
