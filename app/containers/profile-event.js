import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { Image, Segment, Header, Grid, List, Label, Rating, Comment, Form, Icon, Button, Modal } from 'semantic-ui-react';

import ModalEditEvent from '../components/modal-edit-event';
import { fetchProfileEventInfo } from '../actions';

const styles = {
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

class ProfileEvent extends Component {

  renderInterestedUsers() {
    const { interested } = this.props;

    if(!interested) {
      return null;
    }
    return interested.map((user) => {
      return (
        <List.Item key={user.user_id}>
          <Image avatar src={user.image_path}/>
          <List.Content>
            <List.Header
              as={Link} to={'/students/' + user.user_id} >
              {user.first_name + ' ' + user.last_name}
            </List.Header>
          </List.Content>
        </List.Item>
      );
    })
  }

  renderDetails() {

    const { association_name, start_date, end_date, start_time, end_time, room, registration_link } = this.props;
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
                <Form.Input label='Credit Card Number' name='creditCard' placeholder='Card Number' />
                <Form.Input label="Expiration Date" name='expirationDate' placeholder='MM/YYYY'/>
                <Form.Input label="Security Code (CCV)" name='securityCode' placeholder="123"></Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input label="First Name" name="firstName" placeholder="First Name"/>
                <Form.Input label="Last Name" name="lastName" placeholder="Last Name"/>
              </Form.Group>

              <Form.Input label="Billing Address" name="addressLine1" placeholder="Address Line 1"/>
              <Form.Input name="addressLine2" placeholder="Address Line 2"/>

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
    const { categories } = this.props;
    if(!categories) {
      return null;
    }
    return categories.map((cat) => {
      return (
        <Label
          style={styles.label}
          icon={categoryMap[cat].icon}
          color={categoryMap[cat].color}
          key={cat}
          content={cat} />
      );
    });
  }

  renderUpdates() {
    const { updates, image_path } = this.props;

    if(!updates) {
      return null;
    }
    return updates.map((update) => {
      const { notification_id, notification_name, notification_text, date_sent } = update;
      return (
        <Comment key={notification_id}>
          <Comment.Avatar src={image_path} />
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
    const { reviews } = this.props;

    if(!reviews) {
      return null;
    }
    return reviews.map((reviews) => {
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
  componentWillMount() {
    const { dispatch, params } = this.props;
    const { eventID } = params;

    dispatch(fetchProfileEventInfo(eventID));
  }

  render() {
    const { reviews, event_name, event_id, association_name, association_id, image_path, start_date, end_date, start_time, end_time, room, description, registration_link, categories, id, role } = this.props;
    const editableInfo = { event_name, event_id, association_name, association_id, image_path, start_date, end_date, start_time, end_time, room, description, registration_link, categories };

    if(!reviews)
      return null;
    return (
      <div style={styles.background}>
        <Grid padded>
          <Grid.Row style={styles.row}>
            <Grid.Column style={styles.column} >
              <Segment>
                <Image
                  src={image_path}
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
                  {event_name} {' '}
                  { // If authenticated as an association and same id as this profile
                    // Then allow to edit this profile.
                    (role === 'association' && association_id === id) ?
                    <ModalEditEvent eventInfo={editableInfo} /> : null
                  }
                </span>
                <br />
                {this.renderCategories()}
              </Header>
              <Segment attached>
                {description}
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={styles.row}>
            <Grid.Column  computer={11} tablet={11} mobile={16} stretched>
              { reviews.length === 0 ? null:
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
              }
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
                    { reviews.length === 0 ?
                      <span>There are no reviews yet. Be the first one to write a review.</span>:
                    <Comment.Group>
                      {this.renderReviews()}
                    </Comment.Group>
                    }
                    <Form reply onSubmit={e => e.preventDefault()}>
                      <Form.TextArea />
                      <Button content='Write a Review' labelPosition='left' icon='edit' primary />
                      <Rating icon='star'  maxRating={5} />
                    </Form>
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


const categoryMap = {
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

// Type cheking
ProfileEvent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  event_name: PropTypes.string,
  association_id: PropTypes.number,
  association_name: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  start_time: PropTypes.string,
  end_time: PropTypes.string,
  room: PropTypes.string,
  image_path: PropTypes.string,
  description: PropTypes.string,
  registration_link: PropTypes.string,
  interested: PropTypes.array,
  updates: PropTypes.array,
  reviews: PropTypes.array,
  categories: PropTypes.array,
  id: PropTypes.string,
  role: PropTypes.string
}

function mapStateToProps(state) {
  const { profile, auth } = state;
  const { event_name, association_id, association_name, start_date, end_date, start_time, end_time, room, image_path, description, registration_link, interested, updates, reviews, categories } = profile;
  const { id, role } = auth;

  return {
    event_name,
    association_id,
    association_name,
    start_date,
    end_date,
    start_time,
    end_time,
    room,
    image_path,
    description,
    registration_link,
    interested,
    updates,
    reviews,
    categories,
    id,
    role
  };
}

export default connect(mapStateToProps)(ProfileEvent);
