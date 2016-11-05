import React, { Component } from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

const styles = {
  searchbar: {
    display: 'inline-block',
    textAlign: 'left',
    element : {
      verticalAlign: 'bottom',
      marginRight: 10,
      marginLeft: 10
    },
  },
};

class SearchBarEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      orderby: 1,
      category: 1
    };
  }
  handleSearchChange = (event) => this.setState({search: event.target.value});
  handleOrderByChange = (event, index, value) => this.setState({orderby: value});
  handleCategoryChange = (event, index, value) => this.setState({category: value});

  render() {
    return (
      <Paper zDepth={3} style={{...styles.searchbar, backgroundColor: this.props.muiTheme.palette.primary1Color, ...this.props.style}}>
        <TextField
          style={styles.searchbar.element}
          floatingLabelText="Search..."
          hintText="i.e. Workshop"
          value={this.state.search}
          onChange={this.handleSearchChange}
          />

        <SelectField
          style={styles.searchbar.element}
          floatingLabelText="Order by"
          value={this.state.orderby}
          onChange={this.handleOrderByChange} >

          <MenuItem value={1} primaryText="Most Popular" />
          <MenuItem value={2} primaryText="Starting Soon" />
          <MenuItem value={3} primaryText="A - Z" />
          <MenuItem value={4} primaryText="Z - A" />
        </SelectField>
        <SelectField
          style={styles.searchbar.element}
          floatingLabelText="Category"
          value={this.state.category}
          onChange={this.handleCategoryChange} >

          <MenuItem value={1} primaryText="Any" />
          <MenuItem value={2} primaryText="Fundraiser" />
          <MenuItem value={3} primaryText="Educational" />
          <MenuItem value={4} primaryText="Networking" />
          <MenuItem value={5} primaryText="Competition" />
          <MenuItem value={6} primaryText="Workshop" />
          <MenuItem value={7} primaryText="Social" />
          <MenuItem value={8} primaryText="Music" />
          <MenuItem value={9} primaryText="Sport" />
          <MenuItem value={10} primaryText="Arts" />
          <MenuItem value={11} primaryText="Food" />
        </SelectField>
      </Paper>
    );
  }
}

export default muiThemeable()(SearchBarEvents);
