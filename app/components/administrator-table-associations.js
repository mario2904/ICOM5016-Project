import React, { Component } from 'react';
import { Table, Grid, PageHeader } from 'react-bootstrap';
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
    axios.get('/api/association/all')
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
      const { id, name, initials, link, email } = association;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{initials}</td>
          <td><a href={link}>{link}</a></td>
          <td>{email}</td>
          <td><a href="#">Edit</a></td>
        </tr>
      );
    });
  }

  render () {
    return (
      <div>
        <PageHeader>Manage Associations Accounts</PageHeader>
          <Grid >
            <Table striped bordered condensed hover responsive>
              <thead>
                <tr>
                  <th>#id</th>
                  <th>Name</th>
                  <th>Initials</th>
                  <th>Link</th>
                  <th>E-mail</th>
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
