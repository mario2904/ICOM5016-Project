import React, { Component } from 'react';
import { Link } from 'react-router'
import { Image, Segment, Header, Grid, List, Label, Rating, Comment, Form, Icon, Button, Modal } from 'semantic-ui-react';

import ModalEditEvent from './modal-edit-event';

import axios from 'axios';

const styles = {
  image: {
    // marginTop: '-10%'
  },
  background: {
    backgroundColor:"rgb(247, 247, 247)"
  },
  label: {
    marginTop: '2px'
  },
  column: {
    paddingTop: '.5rem',
    paddingBottom: '.5rem'
  },
  row: {
    paddingTop: 0,
    paddingBottom: 0
  }
};



export default class IndividualEvent extends Component {

  renderInterestedUsers() {
    if(!this.state.eventInfo.interested) {
      return null;
    }
    return this.state.eventInfo.interested.map((user) => {
      return (
        <List.Item key={user.user_id}>
          <Image avatar src={user.image_path}/>
          <List.Content>
            <List.Header
              as={Link} to={'/student/' + user.user_id} >
              {user.first_name + ' ' + user.last_name}
            </List.Header>
          </List.Content>
        </List.Item>
      );
    })
  }

  renderDetails() {
    if(!this.state.eventInfo) {
      return null;
    }
    const { association_name, start_date, end_date, start_time, end_time, room, registration_link } = this.state.eventInfo;
    return (
      <List>
        <List.Item
          icon='users'
          content={association_name} />
        <List.Item
          icon='wait'
          content={start_time + ' - ' + end_time} />
        <List.Item
          icon='calendar'
          content={start_date + ((start_date === end_date) ? '': ' - ' + end_date)} />
        <List.Item
          icon='marker'
          content={room} />
        {(registration_link === '')? null:
          <List.Item
            icon='linkify'
            content={<a href={registration_link}>Registration</a>} />
        }
        <Modal trigger={<Button color="teal">Entrance Fee</Button>}>
    <Modal.Header style={{backgroundColor:"rgb(35, 37, 40)", color:"white"}}>Event Payment <Icon name="payment"></Icon></Modal.Header>
    <Modal.Content>
      <Form>

        <Form.Group widths="equal">
           <Form.Input label='Credit Card Number' name='creditCard'
             placeholder='Card Number' />
           <Form.Input label="Expiration Date" name='expirationDate'
             placeholder='MM/YYYY'/>
           <Form.Input label="Security Code (CCV)" name="securityCode"
             placeholder="123"></Form.Input>
         </Form.Group>

       <Form.Group widths="equal">
         <Form.Input label="First Name" name="firstName" placeholder="First Name"/>
         <Form.Input label="Last Name" name="lastName" placeholder="Last Name"/>
       </Form.Group>


       <Form.Input label="Billing Address" name="addressLine1"
         placeholder="Address Line 1"/>
       <Form.Input name="addressLine2"
         placeholder="Address Line 2"/>

       <Form.Group widths="equal">
         <Form.Input label="City" name="city" placeholder="City"/>
         <Form.Input label="State" name="state" placeholder="State"/>
       </Form.Group>

       <Form.Group widths="equal">
         <Form.Input label="Post Code" name="postCode" placeholder="Post Code"/>
         <Form.Select label="Country" name="country"/>
       </Form.Group>

      </Form>
      <Modal.Description>
        <Header>Proceed to Checkout</Header>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions style={{backgroundColor:"rgb(35, 37, 40)", color:"white"}}>
      <Button primary>
        Proceed <Icon name='right chevron' />
      </Button>
    </Modal.Actions>
  </Modal>
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

  renderUpdates() {
    if(!this.state.eventInfo.updates) {
      return null;
    }
    return this.state.eventInfo.updates.map((update) => {
      const { notification_id, notification_name, notification_text, date_sent } = update;
      return (
        <Comment key={notification_id}>
          <Comment.Avatar src={this.state.eventInfo.image_path} />
          <Comment.Content>
            <Comment.Author as='span'>{notification_name}</Comment.Author>
            <Comment.Metadata>
              <span>{date_sent}</span>
            </Comment.Metadata>
            <Comment.Text>
              <span>{notification_text}</span>
            </Comment.Text>
          </Comment.Content>
        </Comment>
      );
    });
  }

  renderReviews() {
    if(!this.state.eventInfo.reviews) {
      return null;
    }
    return this.state.eventInfo.reviews.map((reviews) => {
      const { review_id, first_name, last_name, image_path, review, date_created, rating, user_id } = reviews;
      return (
        <Comment key={review_id}>
          <Comment.Avatar src={image_path} />
          <Comment.Content>
            <Comment.Author as={Link} to={'/students/' + user_id}>{first_name + ' ' + last_name}</Comment.Author>
            <Comment.Metadata>
              <span>{date_created}</span>
            </Comment.Metadata>
            <Comment.Text>
              <Rating icon='star' defaultRating={rating} maxRating={5} />
              <br />
              <span>{review}</span>
            </Comment.Text>
          </Comment.Content>
        </Comment>
      );
    })
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
      // temp.interested = interested;
      // temp.categories = eventCategories;
      // temp.updates = updates;
      // temp.reviews = reviews;
      temp.associationImage = "/images/defaults/default-profile.jpg";
      tick.setState({eventInfo: temp})
    })
    .catch(function (error) {
      console.log(error);
      tick.setState(
        {
          eventInfo:{
          name: "Hackathon",
          id: "1",
          associationName: "HackPR",
          associationId: "45239847",
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
          categories: eventCategories,
          updates: updates,
          reviews: reviews,
          associationImage: "/images/defaults/default-profile.jpg"
        }
      })
    });
  }

  render(){
    return (
      <div style={styles.background}>
        <Grid padded>
          <Grid.Row style={styles.row}>
            <Grid.Column style={styles.column} >
              <Segment>
                <Image
                  src={this.state.eventInfo.image_path}
                  size='big'
                  style={{width:"90%", marginTop:10, marginBottom:10}}
                  bordered
                  centered/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={styles.row} verticalAlign='bottom'>
            <Grid.Column width={16} style={styles.column}>
              <Header inverted style={{backgroundColor:"rgb(35, 37, 40)", color:"white"}}
                 as='h2' attached='top'>
                <span>
                  {this.state.eventInfo.name} {' '}
                  <ModalEditEvent eventInfo={this.state.eventInfo} />
                </span>
                <br />
                {this.renderCategories()}
              </Header>
              <Segment attached>
                {this.state.eventInfo.description}
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={styles.row}>
            <Grid.Column  computer={11} tablet={11} mobile={16} stretched>
              <Grid.Row style={styles.row}>
                <Grid.Column width={16} style={styles.column}>
                  <Header inverted style={{backgroundColor:"rgb(35, 37, 40)", color:"white"}}
                     as='h2' attached='top'>
                    <span>
                      <Icon color="red"name='announcement'/>
                      Updates
                    </span>
                  </Header>
                  <Segment attached>
                    <Comment.Group>
                      {this.renderUpdates()}
                    </Comment.Group>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={styles.row}>
                <Grid.Column width={16} style={styles.column}>
                  <Header inverted style={{backgroundColor:"rgb(35, 37, 40)", color:"white"}}
                     as='h2' attached='top'>
                    <span>
                      <Icon color="blue"name='comments'/>
                      Reviews
                      <Rating icon='star' defaultRating={3} maxRating={5} />
                    </span>
                  </Header>
                  <Segment attached>
                    <Comment.Group>
                      {this.renderReviews()}
                    </Comment.Group>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16} >
              <Grid.Row style={styles.row}>
                <Grid.Column width={16} style={styles.column}>
                  <Header inverted style={{backgroundColor:"rgb(35, 37, 40)", color:"white"}}
                     as='h2' attached='top'>
                    <span>
                      <Icon color="teal"name='search' />
                      Details
                    </span>
                  </Header>
                  <Segment attached>
                    {this.renderDetails()}
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={styles.row}>
                <Grid.Column width={16} style={styles.column}>
                  <Header inverted style={{backgroundColor:"rgb(35, 37, 40)", color:"white"}}
                     as='h2' attached='top'>
                    <span>
                      <Icon color="yellow"name='users'/>
                      Interested
                    </span>
                  </Header>
                  <Segment attached>
                    <List>
                      {this.renderInterestedUsers()}
                    </List>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const updates = [
  {
    id: 1,
    title: 'Title of the Update',
    text: 'Update 1',
    timestamp: 'Time'
  },
  {
    id: 2,
    title: 'Title of the Update',
    text: 'Update 2',
    timestamp: 'Time'
  },
  {
    id: 3,
    title: 'Title of the Update',
    text: 'Update 3',
    timestamp: 'Time'
  },
  {
    id: 4,
    title: 'Title of the Update',
    text: 'Update 4',
    timestamp: 'Time'
  }
];

const reviews = [
  {
    id: 1,
    firstName: 'Joe',
    lastName: 'Doe',
    image: 'http://semantic-ui.com/images/avatar/small/joe.jpg',
    comment: 'Thats Pretty Good!',
    timestamp: 'Time',
    stars: 5,
    userId: 1
  },
  {
    id: 2,
    firstName: 'Christian',
    lastName: 'Hendrix',
    image: 'http://semantic-ui.com/images/avatar/small/christian.jpg',
    comment: 'It was aight...',
    timestamp: 'Time',
    stars: 3,
    userId: 2
  },
  {
    id: 3,
    firstName: 'Jenny',
    lastName: 'Murphy',
    image: 'http://semantic-ui.com/images/avatar/small/jenny.jpg',
    comment: 'It suuucked!',
    timestamp: 'Time',
    stars: 0,
    userId: 3
  }
];

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
    firstName: 'Joe',
    lastName: 'Doe',
    image: 'http://semantic-ui.com/images/avatar/small/joe.jpg',
    id: 3
  },
  {
    firstName: 'Elliot',
    lastName: 'Fu',
    image: 'http://semantic-ui.com/images/avatar/small/elliot.jpg',
    id: 4
  },
  {
    firstName: 'Paola',
    lastName: 'Xiau',
    image: 'http://semantic-ui.com/images/avatar/small/stevie.jpg',
    id: 5
  },
  {
    firstName: 'Christian',
    lastName: 'Hendrix',
    image: 'http://semantic-ui.com/images/avatar/small/christian.jpg',
    id: 6
  },
  {
    firstName: 'Jenny',
    lastName: 'Murphy',
    image: 'http://semantic-ui.com/images/avatar/small/jenny.jpg',
    id: 7
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
  'Sports',
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
  Sports: {
    color: 'grey',
    icon: 'soccer'
  },
  Competition: {
    color: 'purple',
    icon: 'trophy'
  },
  Other: {
    color: 'olive',
    icon: 'idea'
  }
};
