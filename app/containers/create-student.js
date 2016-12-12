import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Form, Checkbox, Button, Grid, Icon, Header, Segment, Label, Message, Confirm } from 'semantic-ui-react';
import _ from 'lodash';
import validate, { create_student } from '../validate';

import { hometown_options, college_options, major_options } from '../options';
import { createStudent } from '../actions';

class CreateStudent extends Component {

  state = { error: {}, open: false };

  handleGenderChange = (e, { value }) => this.setState({ genderControl: value });

  handleConfirm = () => {
    this.setState({open: false})
    browserHistory.push('/');
    // Small 'hack' to reload and reset reducers
    window.location.reload();
  }

  handleSubmit = (e, serializedForm) => {
    e.preventDefault();
    // Validate
    const error = validate(serializedForm, create_student);

    if(!error) {
      this.setState({error: {}});
      // Send to server...
      const { dispatch } = this.props;
      dispatch(createStudent(serializedForm));
    }
    else {
      console.log(error);
      this.setState({error});
    }
  }

  componentWillUpdate(nextProps) {
    const { open } = this.state;
    const { isWaiting, isSuccessful } = nextProps;
    // Redirect to their respective homes if already authenticated
    if (!isWaiting && isSuccessful && !open) {
      this.setState({open: true});
      console.log('Success');
    }
    if(!isWaiting && !isSuccessful) {
      console.log("Error: create student not successful.");
    }
    if(isWaiting) {
      console.log("Waiting for confirmation");
    }

  }

  render() {
    const { isWaiting } = this.props;
    const { genderControl, error } = this.state;
    const { first_name, last_name, email, password, confirm_password, birthdate, gender, hometown, college, major, bio, terms } = error;
    return (
      <div style={{backgroundColor:"rgb(247, 247, 247)"}}>
        <Confirm
          open={this.state.open}
          header='Congratulations!'
          content='An E-mail has been sent for confirmation. Please verify your e-mail before trying to log in to your account.'
          onCancel={this.handleConfirm}
          onConfirm={this.handleConfirm}
        />
      <Grid style={{width:"80%", height:"80%", margin:"auto", paddingTop:50, paddingBottom:75}}>
        <Grid.Row>
        <Message
          style={{width:"100%"}}
          header='Please fix the following errors: '
          list={_.flatten(_.values(error))}
          hidden={_.isEmpty(error)}
          error
          />
        <Header style={{width:"100%", textAlign:"center",
          backgroundColor:"rgb(35, 37, 40)", color:"white"}} as='h2' attached='top'>
          <Icon name="student" color="blue"></Icon>Student Sign-up
        </Header>
        <Segment attached style={{width:"100%"}}>
          <Form onSubmit={this.handleSubmit} loading={isWaiting}>
            <Form.Input label='First Name' name='first_name' placeholder='First Name' error={first_name !== undefined} />
            <Form.Input label='Last Name' name='last_name' placeholder='Last Name' error={last_name !== undefined} />
            <Form.Input label='E-mail' name='email' placeholder='E-mail' type='email' error={email !== undefined} />
            <Form.Input label='Password' name='password' placeholder='Password' type='password' error={password !== undefined} />
            <Form.Input label='Re-enter Password' name='confirm_password' placeholder='Re-enter Password' type='password' error={confirm_password !== undefined} />
            <Form.Input label='Birthday' name='birthdate' placeholder='Birthday' type='date' error={birthdate !== undefined} />
            <Form.Field error={gender !== undefined} >
              <label>Gender</label>
              <Form.Group inline>
                <Form.Radio label='Male' name='gender' value='male' checked={genderControl === 'male'} onChange={this.handleGenderChange} />
                <Form.Radio label='Female' name='gender' value='female' checked={genderControl === 'female'} onChange={this.handleGenderChange} />
                <Form.Radio label='Other' name='gender' value='other' checked={genderControl === 'other'} onChange={this.handleGenderChange} />
              </Form.Group>
            </Form.Field>
            <Form.Select label='Hometown' name='hometown' options={hometown_options.map(h => {return {text: h, value: h}})} placeholder='Hometown' error={hometown !== undefined} />
            <Form.Select label='College' name='college' options={college_options.map(c => {return {text: c, value: c}})} placeholder='College' error={college !== undefined} />
            <Form.Select label='Major' name='major' options={major_options.map(m => {return {text: m, value: m}})} placeholder='Major' error={major !== undefined} />
            <Form.TextArea label='Bio' name='bio' placeholder='Tell us more about you...' />
            <Form.Field error={terms !== undefined}>
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
