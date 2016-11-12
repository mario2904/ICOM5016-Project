import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
export default class GridList extends Component {
  renderListItems () {
    const { ListItem, items } = this.props;
    return items.map((item) => {
      return <ListItem key={item.id} item={item} />;
    });
  }
  render () {
    return (
      <Grid padded>
          {this.renderListItems()}
      </Grid>
    );
  }
}
