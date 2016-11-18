import React, { Component } from 'react';
import { Image as ImageComponent, Item, Menu, Segment, Grid, Card, Icon, Feed, Button, Label,
       Link, Rating, Statistic } from 'semantic-ui-react';


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
    axios.get('/api/event/all')
    .then(function (response) {
      console.log(response);
      tick.setState({events: response.data.events})
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
      <Grid.Column key={event_id} mobile={16} tablet={8} computer={6}>
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
            <a href={"/events/" + event_id}><Button color="blue"><Icon name="write"></Icon>Edit</Button></a>
            <Button color="teal"><Icon name="line chart"></Icon>Stats</Button>
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
            {(this.state.activeItem === 'events') ? <Grid divided>{this.renderMyEvents()}</Grid>: null}
            {(this.state.activeItem === 'associations') ? <Grid padded>{this.renderMyAssociations()}</Grid>: null}
            {(this.state.activeItem === 'news feed') ? <Grid padded>{this.renderMyFeeds()}</Grid>: null}
          </Segment>
        </div>
      </div>
    );
  }
  }

  HomeAssociation.defaultProps = {
    interestedEvents: [
      {
        name: "Hackathon",
        association: "HackPR",
        startDate: "Oct. 15, 2016",
        endDate: "Oct. 16, 2016",
        startHour: "9:00 am",
        endHour: "5:00 pm",
        location: "Roberto Clemente",
        img: "http://hack.pr/wp-content/uploads/2016/09/Facebook-Banner-HackPR-1.png",
        id: "1",
        interested: 200
      },
      {
        name: "Recogido de Alimentos",
        association: "Organización Estudiantil de Protección de Animales",
        startDate: "Oct. 13, 2016",
        endDate: "Oct. 13, 2016",
        startHour: "8:00 am",
        endHour: "11:00 am",
        location: "Universidad de Puerto Rico, Recinto Mayaguez",
        img: "https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/14590297_542744765930783_7339776675739874149_n.jpg?oh=8ad85c8fcb55d4fe6404c3aaf64ce685&oe=58A83C20",
        id: "2",
        interested: 20
      },
      {
        name: "Fundraiser Neuro-RUM",
        association: "Neuro-RUM",
        startDate: "Sept. 28, 2016",
        endDate: "Sept. 28, 2016",
        startHour: "3:30 pm",
        endHour: "8:30 pm",
        location: "Cold Stone Creamery de Mayaguez",
        img: "https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14242492_1122310254512514_1702488471920293701_o.jpg",
        id: "3",
        interested: 50
      },
      {
        name: "Circuits Lab Workshop",
        association: "IEEE Circuits and Systems Society UPRM",
        startDate: "Oct. 5, 2016",
        endDate: "Oct. 5, 2016",
        startHour: "7:00 pm",
        endHour: "9:00 pm",
        location: "University of Puerto Rico, Mayaguez Campus - S-104A",
        img: "https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14543654_1328305037188137_8919927744200733943_o.png",
        id: "4",
        interested: 35
      },
      {
        name: "Smash Bros. Tournament",
        association: "Idea Platform",
        startDate: "Oct. 5, 2016",
        endDate: "Oct. 5, 2016",
        startHour: "6:00 pm",
        endHour: "9:00 pm",
        location: "University of Puerto Rico, Mayaguez Campus - S-228",
        img: "https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14500634_881246661977335_7362168074202245899_o.jpg",
        id: "5",
        interested: 65
      }
    ],
    feeds: [
    {
      date: '1 Hour Ago',
      image: 'http://semantic-ui.com/images/avatar/small/elliot.jpg',
      meta: '4 Likes',
      summary: 'Elliot Fu added you as a friend',
    }, {
      date: '4 days ago',
      image: 'http://semantic-ui.com/images/avatar/small/helen.jpg',
      meta: '1 Like',
      summary: 'Helen Troy added 2 new illustrations',
      extraImages: [
        'http://semantic-ui.com/images/wireframe/image.png',
        'http://semantic-ui.com/images/wireframe/image.png',
      ],
    }, {
      date: '3 days ago',
      image: 'http://semantic-ui.com/images/avatar/small/joe.jpg',
      meta: '8 Likes',
      summary: 'Joe Henderson posted on his page',
      extraText: "Ours is a life of constant reruns. We're always circling back to where we'd we started.",
    }, {
      date: '4 days ago',
      image: 'http://semantic-ui.com/images/avatar/small/justen.jpg',
      meta: '41 Likes',
      summary: 'Justen Kitsune added 2 new photos of you',
      extraText: 'Look at these fun pics I found from a few years ago. Good times.',
      extraImages: [
        'http://semantic-ui.com/images/wireframe/image.png',
        'http://semantic-ui.com/images/wireframe/image.png',
      ],
    }]
  };

  const homeStyle={
    objectFit: "fill",
    width: "auto",
    height: "500px",
    maxHeight: "500px",
    margin: "-25px 0px 0px 0px"
  }

   const picStyle={
    width: "100%",
    maxHeight:"400px",
    height: "100%",
    margin: "-25px 0px 0px 0px",
    padding: "0px 0px 0px 0px",
    display:"inline-block" /*Inline block is life*/
  }

  const nameStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'black'
  }
