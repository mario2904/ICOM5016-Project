import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';

export default class GridList extends Component {
  render () {
    return (
      <Grid>
        <Row>
          {this.props.renderListItems(this.props.items)}
        </Row>
      </Grid>
    );
  }
}
