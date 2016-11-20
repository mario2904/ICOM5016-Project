import React, { Component } from 'react';
import { Link } from 'react-router';
import { Image as ImageComponent, Item, Menu, Segment, Grid, Card, Icon, Feed, Button } from 'semantic-ui-react';

const { Content, Description, Group, Header, Image, Meta } = Item;

import axios from 'axios';

import HomeSearchBar from './home-search-bar';
import GridList from './grid-list';
import EventsListItem from './events-list-item';
import AssociationsListItem from './associations-list-item';
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

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        events: [],
        associations: [],
        activeItem: 'news feed'
      };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderMyAssociations = this.renderMyAssociations.bind(this);
    this.renderMyFeeds = this.renderMyFeeds.bind(this);
  }

  componentWillMount() {
    const tick = this;
    // Get Events Data to render
    axios.get('/api/home/events')
    .then(function (response) {
      console.log(response);
      tick.setState({events: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });

    // Get Associations Data to render
    axios.get('/api/home/associations')
    .then(function (response) {
      console.log(response);
      tick.setState({associations: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('/api/home')
    .then(function (response) {
      console.log(response);
      tick.setState({newsFeed: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderMyEvents = () => {
    return this.state.events.map((event) => {
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

  renderMyAssociations = () => {
    return  <GridList items={this.state.associations} ListItem={AssociationsListItem}/>;

  }

  renderMyFeeds = () => <Feed events={this.state.newsFeed} />;

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
