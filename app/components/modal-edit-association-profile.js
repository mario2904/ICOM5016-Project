import React, { Component } from 'react';
import { Link } from 'react-router'
import { Segment, Header, Label, Form, Icon, Button, Modal } from 'semantic-ui-react';

export default class ModalEditAssociationProfile extends Component {
  state = { serializedForm: {} };

  handleSubmit = (e, serializedForm) => {
    e.preventDefault()
    this.setState({ serializedForm })
  }

  render() {

    const { name, initials, location, link, bio } = this.props.associationProfile;

    const trigger = (
      <Button
        style={{textAlign: 'middle'}}
        size='tiny'
        icon='edit'
        color='blue'
        content='Edit' />
    );
    return (
      <Modal trigger={trigger}>
        <Header inverted style={{backgroundColor:"rgb(35, 37, 40)", color:"white"}} icon='edit' content='Edit Association Profile' />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>


            <Form.Input label='Association Name' name='name' placeholder='Association Name' defaultValue={name} />
            <Form.Input label='Association Initials' name='initials' placeholder='Association Initials' defaultValue={initials} />
            <Form.Select label='Main Office Location' name='location' options={locations} placeholder='Main Office Location' />
            <Form.Input label='Association Link' name='link' placeholder='Association Link' defaultValue={link} />
            <Form.TextArea label='Bio' name='bio' placeholder='Tell us more about your association...' defaultValue={bio} />
            <Button type='submit'>Submit</Button>


          </Form>
        </Modal.Content>
      </Modal>
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
