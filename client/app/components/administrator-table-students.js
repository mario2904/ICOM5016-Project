import React, { Component } from 'react';
import { Table, Grid, PageHeader } from 'react-bootstrap';
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
    axios.get('/api/student/all')
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
      const { id, firstName, lastName, age, gender, hometown, college, major } = student;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{age}</td>
          <td>{gender}</td>
          <td>{hometown}</td>
          <td>{college}</td>
          <td>{major}</td>
          <td><a href="#">Edit</a></td>
        </tr>
      );
    });
  }

  render () {
    return (
      <div>
        <PageHeader>Manage Student Accounts</PageHeader>
          <Grid >
            <Table striped bordered condensed hover responsive>
              <thead>
                <tr>
                  <th>#id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Hometown</th>
                  <th>College</th>
                  <th>Major</th>
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
