import React, { Component } from 'react';
import { Table, Header, Image, Button } from 'semantic-ui-react';
import axios from 'axios';

export default class AdministratorTableAssociations extends Component {
  constructor () {
    super();
    this.state = {
      associations: []
    }
  }

  componentWillMount () {
    const tick = this;
    // Get Events Data to render
    axios.get('/api/admin/association/all')
    .then(function (response) {
      console.log(response);
      tick.setState({associations: response.data.associations})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  renderRows () {
    return this.state.associations.map((association) => {
      const { account_id, association_id, association_name, initials, image_path, page_link, email, room, building, city, date_created } = association;
      return (
        <Table.Row key={account_id}>
          <Table.Cell>{association_id}</Table.Cell>
          <Table.Cell>
            <Image src={image_path} shape='rounded' size='mini' />
          </Table.Cell>
          <Table.Cell>
            <Header as='h4'>{association_name}</Header>
          </Table.Cell>
          <Table.Cell>{initials}</Table.Cell>
          <Table.Cell>{email}</Table.Cell>
          <Table.Cell>{page_link}</Table.Cell>
          <Table.Cell>{room}</Table.Cell>
          <Table.Cell>{building}</Table.Cell>
          <Table.Cell>{city}</Table.Cell>
          <Table.Cell>{date_created}</Table.Cell>
          <Table.Cell><Button>Edit</Button></Table.Cell>
        </Table.Row>
      );
    });
  }

  render () {
    return (
      <div>
        <Header as='h2'>Manage Associations Accounts</Header>
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan='2'>ID</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Image</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Initials</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>E-mail</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2' >Link</Table.HeaderCell>
              <Table.HeaderCell colSpan='3' >Location</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Account Created</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Edit</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Room</Table.HeaderCell>
              <Table.HeaderCell>Building</Table.HeaderCell>
              <Table.HeaderCell>City</Table.HeaderCell>
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
