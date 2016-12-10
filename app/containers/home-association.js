import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Image as ImageComponent, Item, Menu, Segment, Grid, Card, Icon, Feed, Button, Label,
        Rating, Statistic } from 'semantic-ui-react';

const { Content, Description, Group, Header, Image, Meta } = Item;

import { fetchHomeAssociationNewsFeed, fetchHomeAssociationEvents } from '../actions';

import GridList from '../components/grid-list';
import EventsListItem from '../components/events-list-item';
import AssociationsListItem from '../components/associations-list-item';
const banner = '/images/banner/zl8K2Hy.png';

const styles = {
  title: {
    textAlign: 'center',
    color: 'white',
    paddingTop:"100px"
  },
  followers: {
    textAlign: 'center',
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
    backgroundSize: '100% 100%',

  },
  menubar: {
    borderRadius: 0
  }
}
const nameStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: 'black'
}

class HomeAssociation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeItem: 'news feed'
      };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderMyFeeds = this.renderMyFeeds.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    // Get Info to display in Home
    dispatch(fetchHomeAssociationEvents());
    dispatch(fetchHomeAssociationNewsFeed());
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });


  renderMyEvents = () => {
    return this.props.events.map((event) => {
      const { event_id, event_name, association_name, start_date, end_date, start_time, end_time, room, image_path, description } = event;

      return (
      <Grid.Column key={event_id} mobile={16} tablet={8} computer={8}>
        <Segment>
          <Label color='black' ribbon><Icon name="user"></Icon>100 followers</Label>
          <Item.Group>
        <Item>
          <Image size='small' src={image_path} />
          <Content>
            <h3 style={nameStyle}>{event_name}</h3>
            <Meta style={nameStyle}>
              <span>{association_name}</span>
            </Meta>
            <a href={"/events/" + event_id}><Button color="blue"><Icon name="linkify"></Icon>See more</Button></a>
            <Button as={Link} to={'event-stats/' + event_id} color="teal"><Icon name="line chart"></Icon>Stats</Button>
            <Rating style={{paddingTop: 10}}icon='star' defaultRating={4} maxRating={5} />
          </Content>
        </Item>
        </Item.Group>
        </Segment>
      </Grid.Column>
      );
    });
  };

renderMyFeeds = () => <Feed events={this.props.newsFeed} />;

  render () {
    const { activeItem } = this.state;

    return (
      <div>
        <div style={styles.banner}>
          <h2 style={styles.title}>Welcome Back Fellow Association!<Icon size="large" name="smile"></Icon></h2>
          <div style={styles.followers}>
            <Statistic size='huge' inverted>
              <Statistic.Label>Followers</Statistic.Label>
              <Statistic.Value><Icon name="user"></Icon> 1,509</Statistic.Value>
            </Statistic>
          </div>
          <Button as={Link} to={'create-event/'} style={{marginTop: "100px", marginLeft: "20px"}}>
            <Icon name="write"></Icon>
            Create an Event!
          </Button>
        </div>
        <div>
          <Menu inverted widths={2} pointing style={styles.menubar}>
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
          </Menu>
          <Segment style={{backgroundColor:"rgb(247, 247, 247)"}} padded>
            {(this.state.activeItem === 'events') ? <Grid padded>{this.renderMyEvents()}</Grid>: null}
            {(this.state.activeItem === 'news feed') ? <Grid padded>{this.renderMyFeeds()}</Grid>: null}
          </Segment>
        </div>
      </div>
    );
  }
}

// Type cheking
HomeAssociation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  events: PropTypes.array,
  newsFeed: PropTypes.array
}

function mapStateToProps(state) {
  const { home_association } = state;
  const { events, newsFeed } = home_association;

  return {
    events,
    newsFeed
  };
}


export default connect(mapStateToProps)(HomeAssociation);
