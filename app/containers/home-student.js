import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchHomeStudentAssociations, fetchHomeStudentNewsFeed, fetchHomeStudentEvents } from '../actions';

import { Image as ImageComponent, Item, Menu, Segment, Grid, Card, Icon, Feed, Button } from 'semantic-ui-react';

const { Content, Description, Group, Header, Image, Meta } = Item;

import GridList from '../components/grid-list';
import EventsListItem from '../components/events-list-item';
import AssociationsListItem from '../components/associations-list-item';
const banner = '/images/banner/Deer-overlooking-a-lake-at-sunset.jpg';

const styles = {
  title: {
    textAlign: 'center',
    color: 'white',
    paddingTop:"100px"
  },
  // Fixes Oversizing of the Thumbnail if the name is too long.
  overflow: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  banner: {
    width: '100%',
    backgroundImage: `url(${banner})`,
    height:'500px',
    backgroundPosition: 'center',
    backgroundSize: '100% 100%'
  },
  menubar: {
    borderRadius: 0
  }
}

class HomeStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeItem: 'news feed'
      };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderMyAssociations = this.renderMyAssociations.bind(this);
    this.renderMyFeeds = this.renderMyFeeds.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    // Get Info to display in Home
    dispatch(fetchHomeStudentEvents());
    dispatch(fetchHomeStudentAssociations());
    dispatch(fetchHomeStudentNewsFeed());
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderMyEvents = () => {
    return this.props.events.map((event) => {
      const { event_id, event_name, association_id, association_name, start_date, end_date, start_time, end_time, room, image_path, description } = event;
      return (

        <Item key={event_id}>
          <Image size='small' src={image_path} />
          <Content>
            <Header as={Link} to={'events/' + event_id}>{event_name}</Header>
            <Meta>
              <span><Link to={'associations/' + association_id}>{association_name}</Link></span>
            </Meta>
            <Description>{description}</Description>
          </Content>
        </Item>
      );
    });
  };

  renderMyAssociations = () => <GridList items={this.props.associations} ListItem={AssociationsListItem}/>;

  renderMyFeeds = () => <Feed events={this.props.newsFeed} />;

  render () {
    const { activeItem } = this.state;
    return (
      <div>
        <div style={styles.banner}>
          <h2 style={styles.title}>Welcome Back!<Icon size="large" name="smile"></Icon></h2>
        </div>
        <div>
          <Menu inverted widths={3} pointing style={styles.menubar}>
            <Menu.Item
              name='news feed'
              icon='feed'
              active={activeItem === 'news feed'}
              onClick={this.handleItemClick} />
            <Menu.Item
              name='events'
              icon='calendar'
              active={activeItem === 'events'}
              onClick={this.handleItemClick} />
            <Menu.Item
              name='associations'
              icon='university'
              active={activeItem === 'associations'}
              onClick={this.handleItemClick} />
          </Menu>
          <Segment style={{backgroundColor:"rgb(247, 247, 247)"}} padded>
            {(this.state.activeItem === 'events') ? <Group divided>{this.renderMyEvents()}</Group>: null}
            {(this.state.activeItem === 'associations') ? <Grid padded>{this.renderMyAssociations()}</Grid>: null}
            {(this.state.activeItem === 'news feed') ? <Grid padded>{this.renderMyFeeds()}</Grid>: null}
          </Segment>
        </div>
      </div>
    );
  }
}

// Type cheking
HomeStudent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  associations: PropTypes.array,
  events: PropTypes.array,
  newsFeed: PropTypes.array
}

function mapStateToProps(state) {
  const { auth, home_student } = state;
  const { associations, events, newsFeed } = home_student;

  return {
    associations,
    events,
    newsFeed
  };
}

export default connect (mapStateToProps)(HomeStudent);
