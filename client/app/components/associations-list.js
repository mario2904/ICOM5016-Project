import React, { Component } from 'react';
import { PageHeader, Grid, Row } from 'react-bootstrap';

import AssociationsListItem from './associations-list-item';

export default class AssociationsList extends Component {
  renderAssociationsListItems () {
    console.log(this.props);
    return this.props.associations.map((association) => {
      return <AssociationsListItem key={association.name} association={association} />;
    });
  }
  render () {
    return (
      <Grid>
        <Row>
          {this.renderAssociationsListItems()}
        </Row>
      </Grid>
    );
  }
}

// For testing...
AssociationsList.defaultProps = {
  associations: [
    {
      name: 'Example 1',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    },
    {
      name: 'Example 2',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    },
    {
      name: 'Example 3',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    },
    {
      name: 'Example 4',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    },
    {
      name: 'Example 5',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    }
  ]
};
