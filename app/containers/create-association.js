import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Form, Checkbox, Button, Grid, Icon, Header, Segment, Message, Confirm } from 'semantic-ui-react';

import _ from 'lodash';
import validate, { create_association } from '../validate';

import { createAssociation } from '../actions';

class CreateAssociation extends Component {

  state = { error: {}, open: false };

  handleConfirm = () => {
    this.setState({open: false})
    browserHistory.push('/');
    // Small 'hack' to reload and reset reducers
    window.location.reload();
  }

  handleSubmit = (e, serializedForm) => {
    e.preventDefault()
    const error = validate(serializedForm, create_association);
    if(!error) {
      this.setState({error: {}});
      const { dispatch } = this.props;
      dispatch(createAssociation(serializedForm));
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

  renderSponsorsCheckboxes() {
    return sponsors.map((sponsor) => {
      return (
        <Form.Checkbox label={sponsor} name='sponsors' value={sponsor} key={sponsor}/>
      );
    });
  }

  render() {
    const { error } = this.state;
    const { isWaiting } = this.props;
    const { association_name, initials, location, page_link, email, password, confirm_password, bio, terms } = error;

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
        <Message
          style={{width:"100%"}}
          header='Please fix the following errors: '
          list={_.flatten(_.values(error))}
          hidden={_.isEmpty(error)}
          error
          />
        <Header style={{width:"100%", textAlign:"center",
          backgroundColor:"rgb(35, 37, 40)", color:"white"}} as='h2' attached='top'>
          <Icon name="university" color="teal"></Icon>Association Sign-up
        </Header>
        <Segment attached>
          <Form onSubmit={this.handleSubmit} loading={isWaiting}>
            <Form.Input label='Association Name' name='association_name' placeholder='Association Name' error={association_name !== undefined}/>
            <Form.Input label='Association Initials' name='initials' placeholder='Association Initials' error={initials !== undefined}/>
            <Form.Input label='E-mail' name='email' placeholder='E-mail' type='email' />
            <Form.Input label='Password' name='password' placeholder='Password' type='password' error={password !== undefined} />
            <Form.Input label='Re-enter Password' name='confirm_password' placeholder='Re-enter Password' type='password' error={confirm_password !== undefined}/>
            <Form.Input label='Main Office Location' name='location' placeholder='Main Office Location' error={location !== undefined}/>
            <Form.Input label='Association Link' name='page_link' placeholder='Association Link' error={page_link !== undefined}/>
            <Form.TextArea label='Bio' name='bio' placeholder='Tell us more about your association...' error={bio !== undefined}/>
            <Form.Field>
              <label><strong>Sponsors</strong></label>
              <Form.Group>
                {this.renderSponsorsCheckboxes()}
              </Form.Group>
            </Form.Field>
            <br/>
            <Form.Field error={terms !== undefined}>
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

const sponsors = [
  'Verizon',
  'Spotify',
  'Chevron',
  'Exxon Mobile',
  'Boeing',
  'Harris',
  'Lockheed Martin',
  'UPRM',
  'General Electric',
  'General Motors'
]

// Type cheking
CreateAssociation.propTypes = {
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

export default connect(mapStateToProps)(CreateAssociation);
