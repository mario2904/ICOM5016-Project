import React, { Component } from 'react';
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';
import AdministratorTableAssociations from './administrator-table-associations';


export default class Administrator extends Component {
  render () {
    return (
      <div>
        <PageHeader>Manage Accounts and Events</PageHeader>
          <ListGroup>
            <ListGroupItem href="/administrator/associations">Associations</ListGroupItem>
            <ListGroupItem href="/administrator/students">Students</ListGroupItem>
            <ListGroupItem href="/administrator/events">Events</ListGroupItem>
          </ListGroup>
      </div>


    );
  }
}
