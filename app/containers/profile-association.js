import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchProfileAssociationInfo, followAssociation, isFollowingAssociation } from '../actions';

import GridList from "../components/grid-list";
import AssociationsListItem from '../components/associations-list-item';
import EventsListItem from '../components/events-list-item';
import SponsorsListItem from '../components/sponsors-list-item';
import ModalEditAssociationProfile from '../components/modal-edit-association-profile';

import { Form, Grid, Icon,Input, Image, Segment,Item, Menu, Divider, Button } from 'semantic-ui-react'

const banner = '/images/banner/mountains.png';

class ProfileAssociation extends Component{

  constructor () {
    super();
    this.state = {
      activeItem: 'about',
      color: "blue",
      content:"follow"
    };
  }
  componentWillMount() {
    // Get Info to display in Profile Page
    const { dispatch, params } = this.props;
    const { associationID } = params;
    dispatch(fetchProfileAssociationInfo(associationID));
    dispatch(isFollowingAssociation(associationID));

  }
  // componentWillUpdate(nextProps) {
  //   // Get Info to display in Profile Page
  //   const { dispatch, params } = nextProps;
  //   const { associationID } = params;
  //   dispatch(fetchProfileAssociationInfo(associationID));
  //   dispatch(isFollowingAssociation(associationID));
  //
  // }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleOnClick = (e) => this.setState({ color:(this.state.color === "red" ? "blue": "red"),
    content:(this.state.content === "unfollow" ? "follow": "unfollow" )});

  renderAbout = () => {
    const { email, room, page_link, bio } = this.props;

    return(
    <Grid.Row style={{paddingTop:"10px", paddingBottom:"100px"}}>
      <Segment style={{borderRadius:0, width:"100%", paddingBottom:"100px"}}>
        <h2><strong><Icon name="info circle" size="large"></Icon>About</strong></h2>
        <Divider></Divider>
        <p><strong>Email</strong>: {email}</p>
        <p><strong>Location</strong>: {room}</p>
        <p><strong>Page Link</strong>: {page_link} </p>
        <p><strong>Description</strong>: {bio}</p>
      </Segment>
    </Grid.Row>
  );

  };
  renderMyCurrentEvents = () => {
    const { activeEvents } = this.props;

    return (
      <Segment style={{borderRadius:0, width:"100%"}}>
        <h2><strong><Icon size="large"name="checked calendar"></Icon>Current Events</strong></h2>
        <Divider/>
        <GridList items={activeEvents} ListItem={EventsListItem}/>
      </Segment>
    );
  };

  renderMyPastEvents = () => {
    const { pastEvents } = this.props;

    return (
      <Segment style={{borderRadius:0, width:"100%"}}>
        <h2><strong><Icon size="large" name="delete calendar"></Icon>Past Events</strong></h2>
        <Divider/>
        <GridList items={pastEvents} ListItem={EventsListItem}/>
      </Segment>
    );
  };

  renderSponsors = () => {
    const { sponsors } = this.props;

    return (
      <Segment style={{borderRadius:0, width:"100%"}}>
        <h2><strong><Icon size="large" name="hand spock"></Icon>Sponsors</strong></h2>
        <Divider />
        <GridList items={sponsors} ListItem={SponsorsListItem} />
      </Segment>
    );
  };

  render(){
    const { activeItem } = this.state;
    const { followers, image_path, association_name, initials, room, page_link, bio, isFollowing, id, role, params, dispatch } = this.props;
    const { associationID } = params;

    const FollowingButton = () => (
      <Button
        animated
        color='grey'
        onClick={() => {dispatch(followAssociation({association_id: associationID, action: false}))}}
        >
        <Button.Content visible>
          <Icon name='checkmark' /> {' '}
          following
        </Button.Content>
        <Button.Content hidden>
          <Icon name='remove' /> {' '}
          unfollow
        </Button.Content>
      </Button>
    );

    const FollowButton = () => (
      <Button
        primary
        onClick={() => {dispatch(followAssociation({association_id: associationID, action: true}))}}
        >
        <Button.Content>
          <Icon name='plus' /> {' '}
          follow
        </Button.Content>
      </Button>
    );

    const CurrentFollowButton = isFollowing ? FollowingButton:  FollowButton;

    // TODO: CHeck in more detail later.
    if(followers === undefined) {
      return null;
    }
      return (
        <Grid style={{paddingLeft:"100px", paddingRight:"100px", backgroundColor:"rgb(247, 247, 247)"}}>

          <Grid.Row style={{paddingBottom: 0}} >

            <Grid.Column style={{padding:"0px", margin: 0}} width={4}>
              <Image
                style={{width:"100%", height:"250px", padding: 0}}
                src={image_path}>
              </Image>
            </Grid.Column>

            <Grid.Column style={{padding:"0px"}}width={12}>
              <Image style={{height:"250px", width:"100%"}} src={banner}></Image>
            </Grid.Column>

          </Grid.Row>

          <Grid.Row style={{paddingBottom:0}}>
            <Segment style={{borderRadius:0, width:"100%"}}>

            <h1 style={{display: 'inline'}}>
              <strong>{association_name}</strong>{ ' ' }
              <div style={{display:"inline", float:"right"}}>
                { // Change button format depending if it's following or not
                  (role === 'student') ? <CurrentFollowButton /> : null
                }
              </div>
            </h1>
            { // If authenticated as an association and same id as this profile
              // Then allow to edit this profile.
              (role === 'association' && associationID === id) ?
              <ModalEditAssociationProfile associationProfile={{association_name, initials, room, page_link, bio}}/> : null
            }
            </Segment>
          </Grid.Row>

       <Grid.Row style={{paddingTop: 0}}>
         <Menu inverted fluid pointing widths={4} style={{borderRadius: 0}}>
            <Menu.Item icon="info circle"
              name='about'
              active={activeItem === 'about'}
              onClick={this.handleItemClick} />
            <Menu.Item icon="checked calendar"
              name='current events' active={activeItem === 'current events'}
              onClick={this.handleItemClick} />
            <Menu.Item icon="delete calendar"
              name='past events'
              active={activeItem === 'past events'}
              onClick={this.handleItemClick} />
            <Menu.Item icon="hand spock"
              name='sponsors'
              active={activeItem === 'sponsors'}
              onClick={this.handleItemClick} />
         </Menu>
      </Grid.Row>

      <Grid.Row style={{paddingBottom:"50px"}}>
        <Segment  style={{ backgroundColor: "rgb(236,238,238)", borderRadius: 0, width:"100%"}} padded>
          {(this.state.activeItem === 'about') ? <Grid padded>{this.renderAbout()}</Grid>: null}
          {(this.state.activeItem === 'current events') ? <div>{this.renderMyCurrentEvents()}</div>: null}
          {(this.state.activeItem === 'past events') ? <Grid padded>{this.renderMyPastEvents()}</Grid>: null}
          {(this.state.activeItem === 'sponsors') ? <Grid padded>{this.renderSponsors()}</Grid>: null}
        </Segment>
      </Grid.Row>
    </Grid>
    );
  }
}

// Type cheking
ProfileAssociation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  association_name: PropTypes.string,
  initials: PropTypes.string,
  room: PropTypes.string,
  page_link: PropTypes.string,
  email: PropTypes.string,
  image_path: PropTypes.string,
  bio: PropTypes.string,
  activeEvents: PropTypes.array,
  pastEvents: PropTypes.array,
  sponsors: PropTypes.array,
  followers: PropTypes.object,
  isFollowing: PropTypes.bool,
  id: PropTypes.string,
  role: PropTypes.string
}

function mapStateToProps(state) {
  const { profile, auth } = state;
  const { association_name, initials, room, page_link, email, image_path, bio, activeEvents, pastEvents, sponsors, followers, isFollowing } = profile;
  const { id, role } = auth;

  return {
    association_name,
    initials,
    room,
    page_link,
    email,
    image_path,
    bio,
    activeEvents,
    pastEvents,
    sponsors,
    followers,
    isFollowing,
    id,
    role
  };
}

export default connect(mapStateToProps)(ProfileAssociation);
