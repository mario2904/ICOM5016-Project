import React, { Component } from 'react';
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';
import AdministratorTableAssociations from './administrator-table-associations';


export default class Administrator extends Component {
  render () {
    return (
      <div>
        <PageHeader>Manage Accounts and Events</PageHeader>
          <ListGroup>
            <ListGroupItem href="/administrator/associations">
              <strong>Associations</strong></ListGroupItem>
            <ListGroupItem href="/administrator/students"><strong>Students</strong></ListGroupItem>
            <ListGroupItem href="/administrator/events"><strong>Events</strong></ListGroupItem>
          </ListGroup>
      </div>


    );
  }
}
