import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAssociations } from '../actions';

import AssociationList from './association-list';

const banner = '/images/banner/rfn-calendar-banner.png';

const styles = {
  banner: {
    width: '100%',
    backgroundImage: `url(${banner})`,
    height:'200px',
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
  },
  container: {
    textAlign: 'center',
    paddingTop: 20,
    paddingdown: 20,
  },
};

class Associations extends Component {
  componentWillMount () {
    // Fetch all events
    this.props.fetchAssociations();
  }

  render() {
    return (
      <div>
        <div style={styles.banner}></div>
        <div style={styles.container}>
          <h1>Associations</h1>
        </div>
        <AssociationList associations={this.props.associations}/>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {associations: state.associations};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchAssociations: fetchAssociations}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Associations);
