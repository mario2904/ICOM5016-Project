import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

import AssociationsSearchBar from './associations-search-bar';
import AssociationsListItem from './associations-list-item';
import GridList from './grid-list';

export default class Associations extends Component {
  renderAssociationsListItems (associations) {
    return associations.map((association) => {
      return <AssociationsListItem key={association.name} association={association} />;
    });
  }
  render () {
    return (
      <div>
        <PageHeader>Associations</PageHeader>
        <AssociationsSearchBar />
        <GridList items={this.props.associations} renderListItems={this.renderAssociationsListItems}/>
      </div>
    );
  }
}

// For testing...
Associations.defaultProps = {
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
