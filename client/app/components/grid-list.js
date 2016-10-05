import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';

export default class GridList extends Component {
  renderListItems () {
    const { ListItem, items } = this.props;
    return items.map((item) => {
      return <ListItem key={item.id} item={item} />;
    });
  }
  render () {
    return (
      <Grid>
        <Row>
          {this.renderListItems()}
        </Row>
      </Grid>
    );
  }
}
