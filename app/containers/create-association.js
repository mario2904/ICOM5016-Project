import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Form, Checkbox, Button, Grid, Icon, Header, Segment } from 'semantic-ui-react';

import { createAssociation, fetchOptionsLocation } from '../actions';

class CreateAssociation extends Component {

  state = { serializedForm: {} };

  handleSubmit = (e, serializedForm) => {
    e.preventDefault()
    const { password, re_password, terms } = serializedForm;
    if(password.length >= 8 && re_password.length >= 8 && password === re_password && terms) {
      console.log(serializedForm);
      // Send to server...
      const { dispatch } = this.props;
      dispatch(createAssociation(serializedForm));
    }
  }
  componentWillMount() {
    const { dispatch } = this.props;
    // Fetch location options
    dispatch(fetchOptionsLocation());
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
    const { location_options } = this.props;
    if(!location_options)
      return null;
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
            <Form.Input label='Association Name' name='association_name' placeholder='Association Name'/>
            <Form.Input label='Association Initials' name='initials' placeholder='Association Initials' />
            <Form.Input label='E-mail' name='email' placeholder='E-mail' type='email' />
            <Form.Input label='Password' name='password' placeholder='Password' type='password' />
            <Form.Input label='Re-enter Password' name='re_password' placeholder='Re-enter Password' type='password' />
            <Form.Select label='Main Office Location' name='location' options={location_options.map(l => {return {text: l.location, value: l.location}})} placeholder='Main Office Location' />
            <Form.Input label='Association Link' name='page_link' placeholder='Association Link' />
            <Form.TextArea label='Bio' name='bio' placeholder='Tell us more about your association...' />
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' name='terms' />
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

// Type cheking
CreateAssociation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isSuccessful: PropTypes.bool,
  isWaiting: PropTypes.bool,
  location_options: PropTypes.array
}

function mapStateToProps(state) {
  const { form, options } = state;
  const { isSuccessful, isWaiting } = form;
  const { location_options } = options;

  return {
    isSuccessful,
    isWaiting,
    location_options
  };
}

export default connect(mapStateToProps)(CreateAssociation);
