import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
export default class GridList extends Component {
  renderListItems () {
    const { ListItem, items } = this.props;
    return items.map((item, i) => {
      return <ListItem key={i} item={item} />;
    });
  }
  render () {
    return (
      <Grid style={{width:"100%"}} padded>
          {this.renderListItems()}
      </Grid>
    );
  }
}
