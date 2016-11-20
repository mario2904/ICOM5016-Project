import React, { Component } from 'react';
import { Link } from 'react-router';
import { Image as ImageComponent, Item, Menu, Segment, Grid, Card, Icon, Feed, Button, Label,
        Rating, Statistic } from 'semantic-ui-react';


const { Content, Description, Group, Header, Image, Meta } = Item;

import axios from 'axios';

import HomeSearchBar from './home-search-bar';
import GridList from './grid-list';
import EventsListItem from './events-list-item';
import AssociationsListItem from './associations-list-item';
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

export default class HomeAssociation extends Component{
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
    axios.get('/api/home-associations/events')
    .then(function (response) {
      console.log(response);
      tick.setState({events: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });

    // Get Associations Data to render
    axios.get('/api/home-associations/reviews')
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

  renderMyAssociations = () => {
    return  <GridList items={this.state.associations} ListItem={AssociationsListItem}/>;

  }

  renderMyFeeds = () => <Feed events={this.state.newsFeed} />;

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
            {(this.state.activeItem === 'associations') ? <Grid padded>{this.renderMyAssociations()}</Grid>: null}
            {(this.state.activeItem === 'news feed') ? <Grid padded>{this.renderMyFeeds()}</Grid>: null}
          </Segment>
        </div>
      </div>
    );
  }
}
