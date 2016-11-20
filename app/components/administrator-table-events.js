import React, { Component } from 'react';
import { Table, Header, Image, Button } from 'semantic-ui-react';
import axios from 'axios';

export default class AdministratorTableEvents extends Component {
  constructor () {
    super();
    this.state = {
      events: []
    }
  }

  componentWillMount () {
    const tick = this;
    // Get Events Data to render
    axios.get('/api/admin/event/all')
    .then(function (response) {
      console.log(response);
      tick.setState({events: response.data.events})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  renderRows () {
    return this.state.events.map((event) => {
      const { event_id, event_name, is_live, registration_link, start_date, end_date, start_time, end_time, room, building, city, image_path, time_stamp } = event;
      return (
        <Table.Row key={event_id}>
          <Table.Cell>{event_id}</Table.Cell>
          <Table.Cell>
            <Image src={image_path} shape='rounded' size='mini' />
          </Table.Cell>
          <Table.Cell>
            <Header as='h4'>{event_name}</Header>
          </Table.Cell>
          <Table.Cell>{is_live}</Table.Cell>
          <Table.Cell>{registration_link}</Table.Cell>
          <Table.Cell>{start_date}</Table.Cell>
          <Table.Cell>{end_date}</Table.Cell>
          <Table.Cell>{start_time}</Table.Cell>
          <Table.Cell>{end_time}</Table.Cell>
          <Table.Cell>{room}</Table.Cell>
          <Table.Cell>{building}</Table.Cell>
          <Table.Cell>{city}</Table.Cell>
          <Table.Cell>{time_stamp}</Table.Cell>
          <Table.Cell><Button>Edit</Button></Table.Cell>
        </Table.Row>
      );
    });
  }

  render () {
    return (
      <div>
        <Header as='h2'>Manage Events</Header>
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan='2'>ID</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Image</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Is Live</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Registration</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2' >Start Date</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2' >End Date</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Start Time</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>End Time</Table.HeaderCell>
              <Table.HeaderCell colSpan='3'>Location</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Date Created</Table.HeaderCell>
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
