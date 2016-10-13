import React, { Component } from 'react';
import { Table, Grid, PageHeader } from 'react-bootstrap';
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
    axios.get('/api/event/all')
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
      const { id, name, associationName, startDate, endDate, startTime, endTime } = event;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{associationName}</td>
          <td>{startDate}</td>
          <td>{endDate}</td>
          <td>{startTime}</td>
          <td>{endTime}</td>
          <td><a href="#">Edit</a></td>
        </tr>
      );
    });
  }

  render () {
    return (
      <div>
        <PageHeader>Manage Events</PageHeader>
          <Grid >
            <Table striped bordered condensed hover responsive>
              <thead>
                <tr>
                  <th>#id</th>
                  <th>Name</th>
                  <th>Association</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.renderRows()}
              </tbody>
            </Table>
          </Grid>
      </div>

    );
  }
}
