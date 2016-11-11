import React, { Component } from 'react';
// import { Sparklines, SparklinesLine, SparklinesBars } from 'react-sparklines';
// import {Grid, Col, Button, Panel, Row, Label, Tab, Tabs,ListGroup, ListGroupItem, FormGroup, ControlLabel,FormControl} from 'react-bootstrap';
import { Link } from 'react-router'
import { Image, Segment, Header, Grid, List, Label } from 'semantic-ui-react';


import InterestedList from './interestedList';
import ReviewUpdateItem from './review-item';
import axios from 'axios';

const banner = '/images/banner/tumblr_nhq4cr4lOz1u7bj7uo1_1280.png';

const styles = {
  banner: {
    width: '100%',
    backgroundImage: `url(${banner})`,
    height:'400px',
    backgroundPosition: 'center',
    backgroundSize: '100% 100%'
  },
  image: {
    // marginTop: '-10%'
  },
  background: {
    backgroundColor:"rgb(247, 247, 247)"
  },
  label: {
    marginTop: '2px'
  }
}

export default class IndividualEvent extends Component {
  renderUpdateItems () {
    return this.props.updates.map(function(update1, i) {
      return <ReviewUpdateItem name={update1.udpateHeader} key={i} review={update1.updateBody}/>;
    });
  }
  renderReviewItems () {
    return this.props.reviews.map(function(review1, i) {
      return <ReviewUpdateItem name={review1.reviewName} key={i} review={review1.reviewBody}/>;
    });
  }
  renderInterestedUsers() {
    if(!this.state.eventInfo.interested) {
      return null;
    }
    return this.state.eventInfo.interested.map((user) => {
      return (
        <List.Item key={user.id}>
          <Image avatar src={user.image}/>
          <List.Content>
            <List.Header
              as={Link} to={'/student/' + user.id} >
              {user.firstName + ' ' + user.lastName}
            </List.Header>
          </List.Content>
        </List.Item>
      );
    })
  }
  renderDetails() {
    const { associationName, startDate, endDate, startTime, endTime, location, registrationLink } = this.state.eventInfo;
    return (
      <List>
        <List.Item
          icon='users'
          content={associationName} />
        <List.Item
          icon='wait'
          content={startTime + ' - ' + endTime} />
        <List.Item
          icon='calendar'
          content={startDate + ((startDate === endDate) ? '': ' - ' + endDate)} />
        <List.Item
          icon='marker'
          content={location} />
        {(registrationLink === '')? null:
          <List.Item
            icon='linkify'
            content={<a href={registrationLink}>Registration</a>} />
        }
      </List>

    );
  }

  renderCategories() {
    if(!this.state.eventInfo.categories) {
      return null;
    }
    console.log(this.state.eventInfo.categories);
    return this.state.eventInfo.categories.map((cat) => {
      return (
        <Label
          style={styles.label}
          icon={categories[cat].icon}
          color={categories[cat].color}
          key={cat}
          content={cat} />
      );
    });
  }

  constructor () {
    super();
    this.state = {eventInfo: {}};
  }
  componentWillMount() {
    const tick = this;
    // Get Events Data to render
    axios.get('/api/event/'+this.props.params.eventID)
    .then(function (response) {
      console.log(response);
      const temp = response.data;
      temp.interested = interested;
      temp.categories = eventCategories;
      tick.setState({eventInfo: temp})
    })
    .catch(function (error) {
      console.log(error);
      tick.setState(
        {
          eventInfo:{
          name: "Hackathon",
          eventID: "1",
          associationName: "HackPR",
          associationID: "45239847",
          image: "http://hack.pr/wp-content/uploads/2016/09/Facebook-Banner-HackPR-1.png",
          startDate: "Oct. 15, 2016",
          endDate: "Oct. 16, 2016",
          startTime: "9:00 am",
          endTime: "5:00 pm",
          location: "Roberto Clemente",
          description: "HackPR 2016 is the perfect \
            meeting place for the hacker and technology innovation \
            community in Puerto Rico. Join us as a student or \
            professional hacker to win more than {'5k'} in prizes or \
            as a  visitors to participate in our job fair, \
            exhibitors area, workshops and final hacks (projects) \
            presentation at the end of the event. ",
          registrationLink:"google.com",
          interested: interested,
          categories: eventCategories
        }
      })
    });
  }

  render(){
    return (
      <div style={styles.background}>
        <Image
          src={this.state.eventInfo.image}
          size='large'
          style={styles.image}
          bordered
          centered/>
        <Grid padded>
          <Grid.Row>
            <Grid.Column stretched computer={11} tablet={11} mobile={16} >
              <Segment>
                <Header as='h2'>
                  {this.state.eventInfo.name}
                </Header>
                {this.renderCategories()}
                <br /><br />
                <span>
                  {this.state.eventInfo.description}
                </span>
              </Segment>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16} >
              <Segment padded>
                {this.renderDetails()}
              </Segment>
            </Grid.Column>

          </Grid.Row>
          <Grid.Row>
            <Grid.Column stretched computer={11} tablet={11} mobile={16} >
              <Segment>
                <Header as='h2'>Updates</Header>
              </Segment>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16} floated='right'>
              <Segment>
                <List>
                  {this.renderInterestedUsers()}
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>

          </Grid.Row>

        </Grid>
      </div>
    );
  }
}

const eventNameSize = {
  fontSize: "30px"
}
const photoBanner = {
  height: "100%",
  width: "100%"
}
const contentStyle = {
  margin: "30px 0px 0px 0px"
}
const divStyle = {
    overflow: "auto"
}
IndividualEvent.defaultProps = {
  eventData:
    {
      name: "Hackathon",
      eventID: "1",
      associationName: "HackPR",
      associationID: "45239847",
      image: "http://hack.pr/wp-content/uploads/2016/09/Facebook-Banner-HackPR-1.png",
      startDate: "Oct. 15, 2016",
      endDate: "Oct. 16, 2016",
      startTime: "9:00 am",
      endTime: "5:00 pm",
      location: "Roberto Clemente",
      description: "HackPR 2016 is the perfect \
        meeting place for the hacker and technology innovation \
        community in Puerto Rico. Join us as a student or \
        professional hacker to win more than {'5k'} in prizes or \
        as a  visitors to participate in our job fair, \
        exhibitors area, workshops and final hacks (projects) \
        presentation at the end of the event. ",
      registrationLink:"google.com"
    },
  reviews:[
    {
      reviewName: "Carlos Ojeda",
      reviewBody: " Critics Consensus: Ambitious and refreshing, Atlanta \
          offers a unique vehicle for star and series creator Donald Glover's \
          eccentric brand of humor -- as well as a number of \
          timely, trenchant observations."

    },
    {
      reviewName: "Harambe",
      reviewBody: " Harambe LIVES!!!! He'll be back with a vengeance.OUT FOR HARAMBE!"

    }
  ],
  updates: [
    {
    udpateHeader: "Cambio de Salon",
    updateBody:   "Saludos, el salon a cambiado al S113"
    }
  ]
};

const interested = [
  {
    firstName: 'Maria',
    lastName: 'Jimenez',
    image: 'http://semantic-ui.com/images/avatar/small/helen.jpg',
    id: 1
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    image: 'http://semantic-ui.com/images/avatar/small/daniel.jpg',
    id: 2,
  },
  {
    firstName: 'Elliot',
    lastName: 'Fu',
    image: 'http://semantic-ui.com/images/avatar/small/elliot.jpg',
    id: 3
  },
  {
    firstName: 'Paola',
    lastName: 'Xiau',
    image: 'http://semantic-ui.com/images/avatar/small/stevie.jpg',
    id: 4
  }
];

const eventCategories = [
  'Food',
  'Music',
  'Fundraiser',
  'Arts',
  'Social',
  'Educational',
  'Business',
  'Sport',
  'Competition',
  'Other'
];

const categories = {
  Food: {
    color: 'red',
    icon: 'food'// food or spoon
  },
  Music: {
    color: 'blue',
    icon: 'music'// music or unmute or sound
  },
  Fundraiser: {
    color: 'violet',
    icon: 'ticket' // ticket or money
  },
  Arts: {
    color: 'teal',
    icon: 'paint brush'
  },
  Social: {
    color: 'green',
    icon: 'users'
  },
  Educational: {
    color: 'orange',
    icon: 'student' // student or book
  },
  Business: {
    color: 'yellow',
    icon: 'travel'
  },
  Sport: {
    color: 'black',
    icon: 'soccer'
  },
  Competition: {
    color: 'purple',
    icon: 'trophy'
  },
  Other: {
    color: 'grey',
    icon: 'idea'
  }
};
