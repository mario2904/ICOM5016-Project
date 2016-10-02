import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

import AssociationsSearchBar from './associations-search-bar';

export default class Associations extends Component {
  render () {
    return (
      <div>
        <PageHeader>Associations</PageHeader>
        <AssociationsSearchBar />
      </div>
    );
  }
}
