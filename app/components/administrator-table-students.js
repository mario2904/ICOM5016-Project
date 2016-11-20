import React, { Component } from 'react';
import { Table, Header, Image, Button } from 'semantic-ui-react';
import axios from 'axios';

export default class AdministratorTableStudents extends Component {
  constructor () {
    super();
    this.state = {
      students: []
    }
  }

  componentWillMount () {
    const tick = this;
    // Get Events Data to render
    axios.get('/api/admin/student/all')
    .then(function (response) {
      console.log(response);
      tick.setState({students: response.data.students})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  renderRows () {
    return this.state.students.map((student) => {
      const { account_id, user_id, first_name, last_name, hometown, college, major, gender, bio, birthdate, email, date_created, image_path } = student;
      return (
        <Table.Row key={account_id}>
          <Table.Cell>{user_id}</Table.Cell>
          <Table.Cell>
            <Image src={image_path} shape='rounded' size='mini' />
          </Table.Cell>
          <Table.Cell>
            <Header as='h4'>{first_name + ' ' + last_name}</Header>
          </Table.Cell>
          <Table.Cell>{email}</Table.Cell>
          <Table.Cell>{birthdate}</Table.Cell>
          <Table.Cell>{gender}</Table.Cell>
          <Table.Cell>{hometown}</Table.Cell>
          <Table.Cell>{college}</Table.Cell>
          <Table.Cell>{major}</Table.Cell>
          <Table.Cell>{date_created}</Table.Cell>
          <Table.Cell><Button>Edit</Button></Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <div>
        <Header as='h2'>Manage Associations Accounts</Header>
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>E-mail</Table.HeaderCell>
              <Table.HeaderCell>Birthdate</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Hometown</Table.HeaderCell>
              <Table.HeaderCell>College</Table.HeaderCell>
              <Table.HeaderCell>Major</Table.HeaderCell>
              <Table.HeaderCell>Account Created</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderRows()}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
