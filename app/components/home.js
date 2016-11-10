import React, { Component } from 'react';
import { Image as ImageComponent, Item, Menu, Segment, Grid, Card, Icon, Feed } from 'semantic-ui-react';

const { Content, Description, Group, Header, Image, Meta } = Item;

import axios from 'axios';

import HomeSearchBar from './home-search-bar';
import GridList from './grid-list';
import EventsListItem from './events-list-item';

const styles = {
  title: {
    textAlign: 'center'
  },
  // Fixes Oversizing of the Thumbnail if the name is too long.
  overflow: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
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
    axios.get('/api/event/all')
    .then(function (response) {
      console.log(response);
      tick.setState({events: response.data.events})
    })
    .catch(function (error) {
      console.log(error);
    });

    // Get Associations Data to render
    axios.get('/api/association/all')
    .then(function (response) {
      console.log(response);
      tick.setState({associations: response.data.associations})
    })
    .catch(function (error) {
      console.log(error);
    });


  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderMyEvents = () => {
    return this.state.events.map((event) => {
      const { id, name, associationName, startDate, endDate, startTime, endTime, location, image, description } = event;

      return (
        <Item key={id}>
          <Image size='small' src={image} />
          <Content>
            <Header>{name}</Header>
            <Meta>
              <span>{associationName}</span>
            </Meta>
            <Description>{description}</Description>
          </Content>
        </Item>
      );
    });
  };

  renderMyAssociations = () => {
    return this.state.associations.map((association) => {
      const { id, name, initials, profileImage } = association;
      return (
        <Grid.Column mobile={16} tablet={8} computer={4} key={id} style={styles.title}>
          <Card centered>
            <ImageComponent src={profileImage} style={{ width:"500px", height:"200px"}}/>
            <Card.Content>
              <Card.Header style={styles.overflow}>{name}</Card.Header>
              <Card.Meta>{initials}</Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });
  }

  renderMyFeeds = () => <Feed events={this.props.feeds} />;

  render () {
    const { activeItem } = this.state;

    return (
      <div>
        <h2 style={styles.title}>Welcome Back!</h2>
        <Menu pointing secondary>
          <Menu.Item name='news feed' active={activeItem === 'news feed'} onClick={this.handleItemClick} />
          <Menu.Item name='events' active={activeItem === 'events'} onClick={this.handleItemClick} />
          <Menu.Item name='associations' active={activeItem === 'associations'} onClick={this.handleItemClick} />

        </Menu>

            {(this.state.activeItem === 'events') ? <Group divided>{this.renderMyEvents()}</Group>: null}
            {(this.state.activeItem === 'associations') ? <Grid padded>{this.renderMyAssociations()}</Grid>: null}
            {(this.state.activeItem === 'news feed') ? <Grid padded>{this.renderMyFeeds()}</Grid>: null}

      </div>
    );
  }
}

// For testing...
Home.defaultProps = {
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
  feeds: [{
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
