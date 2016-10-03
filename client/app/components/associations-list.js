import React, { Component } from 'react';
import { PageHeader, Grid, Row, Clearfix } from 'react-bootstrap';

import AssociationsListItem from './associations-list-item';

export default class AssociationsList extends Component {
  renderAssociationsListItems () {
    return this.props.associations.map((association) => {
      return <AssociationsListItem key={association.name} association={association} />;
    });
  }
  render () {
    return (
      <Grid>
        {this.renderAssociationsListItems()}
      </Grid>
    );
  }
}

// For testing...
AssociationsList.defaultProps = {
  associations: [
    {
      initials: 'TEST',
      name: 'Example 1',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    },
    {
      initials: 'TEST',
      name: 'Example 2 Longer title to Overflow Thumbnail',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    },
    {
      initials: 'TEST',
      name: 'Example 3',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    },
    {
      initials: 'TEST',
      name: 'Example 4',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    },
    {
      initials: 'TEST',
      name: 'Example 5',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    },
    {
      initials: 'TEST',
      name: 'Example 6 Longer title to Overflow Thumbnail',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    },
    {
      initials: 'TEST',
      name: 'Example 7',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    },
    {
      initials: 'TEST',
      name: 'Example 8',
      img: 'http://www.freeiconspng.com/uploads/success-icon-2.png'
    }
  ]
};
