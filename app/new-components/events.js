import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents } from '../actions';

import EventList from './event-list';

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

class Events extends Component {
  componentWillMount () {
    // Fetch all events
    this.props.fetchEvents();
  }

  render() {
    return (
      <div>
        <div style={styles.banner}></div>
        <div style={styles.container}>
          <h1>Events</h1>
        </div>
        <EventList events={this.props.events}/>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {events: state.events};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchEvents: fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
