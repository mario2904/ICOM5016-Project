import React, { Component } from 'react';
import { Link } from 'react-router'
import { Segment, Header, Label, Form, Checkbox, Icon, Button, Modal } from 'semantic-ui-react';

export default class ModalEditStudentProfile extends Component {
  state = { serializedForm: {} };

  handleGenderChange = (e, { value }) => this.setState({ genderControl: value });

  handleSubmit = (e, serializedForm) => {
    e.preventDefault()
    this.setState({ serializedForm })
  }

  render() {

    const { serializedForm, genderControl } = this.state;
    const { birthday, gender, hometown, college, major, bio } = this.props.studentProfile;

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
        <Header icon='edit' content='Edit Student Profile' />
        <Modal.Content>
          <Form>


            <Form.Input label="Profile picture" name='image' type="file" />
            <Form.Input label='Birthday' name='birthday' placeholder='Birthday' type='date' />
            <Form.Field>
              <label>Gender</label>
              <Form.Group inline>
                <Form.Radio label='Male' name='gender' value='male' checked={genderControl === 'male'} onChange={this.handleGenderChange} />
                <Form.Radio label='Female' name='gender' value='female' checked={genderControl === 'female'} onChange={this.handleGenderChange} />
                <Form.Radio label='Other' name='gender' value='other' checked={genderControl === 'other'} onChange={this.handleGenderChange} />
              </Form.Group>
            </Form.Field>
            <Form.Input label='Hometown' name='hometown' placeholder='Hometown' />
            <Form.Select label='College' name='college' options={colleges} placeholder='College' />
            <Form.Select label='Major' name='major' options={majors} placeholder='Major' />
            <Form.TextArea label='Bio' name='bio' placeholder='Tell me more about you...' />

            <Button color="teal" type='submit'>Submit</Button>


          </Form>
        </Modal.Content>
      </Modal>
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
