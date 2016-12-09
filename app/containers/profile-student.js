import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchProfileStudentInfo } from '../actions';

import GridList from "../components/grid-list";
import AssociationsListItem from '../components/associations-list-item';
import EventsListItem from '../components/events-list-item';
import ModalEditStudentProfile from '../components/modal-edit-student-profile'

import { Form, Grid, Icon, Input, Image, Segment, Item, Menu, Divider } from 'semantic-ui-react';
const banner = '/images/banner/867870-minimalist-iphone-5.jpg';

class ProfileStudent extends Component{
  constructor () {
    super();
    this.state = {
      activeItem: 'about'
    };
  }

  componentWillMount() {
    const { dispatch, params } = this.props;
    const { userID } = params;
    dispatch(fetchProfileStudentInfo(userID));

  }

  state = { activeItem: 'about' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderAbout = () => {
    const { email, gender, hometown, college, major, bio } = this.props;

    return(
    <Grid.Row style={{paddingTop:"10px", paddingBottom:"100px"}}>
      <Segment style={{borderRadius:0, width:"100%", paddingBottom:"100px"}}>
        <h2><strong><Icon size="large"name="info circle"></Icon>About</strong></h2>
        <Divider></Divider>
        <p><strong>Email</strong>: {email}</p>
        <p><strong>Gender</strong>: {gender}</p>
        <p><strong>Hometown</strong>: {hometown} </p>
        <p><strong>College</strong>: {college}</p>
        <p><strong>Major</strong>: {major}</p>
        <p><strong>Bio</strong>: {bio}</p>
      </Segment>
    </Grid.Row>
  );
};
  renderMyAssociations = () => {
    const { followedAssociations } = this.props;
    return (
      <Segment style={{borderRadius:0, width:"100%"}}><h2><strong><Icon size="large"name="university">
        </Icon>Associations</strong></h2>
        <Divider/>
        <GridList items={followedAssociations} ListItem={AssociationsListItem}/>
      </Segment>
    );
  };

  renderMyEvents = () => {
    const { interestedEvents } = this.props;
    return (
      <Segment style={{borderRadius:0, width:"100%"}}><h2><strong><Icon size="large"name="calendar">
        </Icon>Events</strong></h2>
        <Divider/>
        <GridList items={interestedEvents} ListItem={EventsListItem}/>
      </Segment>
    );
  };

  render(){
    const { activeItem } = this.state
    const { first_name, last_name, image_path, gender, hometown, college, major, bio, id, role, params } = this.props;
    const editableInfo = { first_name, last_name, image_path, gender, hometown, college, major, bio };
    const { userID } = params;
    console.log(role);
    console.log(id);

    return (
      <Grid style={{paddingLeft:"85px", paddingRight:"85px", backgroundColor:"rgb(247, 247, 247)"}}>
        <Grid.Row style={{paddingBottom: 0}} >
          <Grid.Column style={{padding:"0px", margin: 0}} width={4}>
            <Image
              style={{width:"100%", height:"250px", padding: 0}}
              src={image_path}>
            </Image>
          </Grid.Column>
          <Grid.Column style={{padding:"0px"}} width={12}>
            <Image
              style={{height:"250px", width:"100%"}}
              src={banner}>
            </Image>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{paddingBottom:0}}>
          <Segment style={{borderRadius:0, width:"100%"}}>
            <h1
              style={{display:"inline",verticalAlign: 'middle'}}>
              <strong>{first_name + " "+ last_name}</strong>
            </h1>
            {' '}
            <div style={{display:"inline",verticalAlign: 'middle'}}>
              { // If authenticated as student and same id as this profile
                // Then allow to edit this profile. // Quick fix. modal-edit
                (role === 'student' && userID === id) && gender ?
                <ModalEditStudentProfile {...editableInfo} /> : null
              }
            </div>
          </Segment>
        </Grid.Row>
        <Grid.Row style={{paddingTop: 0}}>
          <Menu inverted fluid pointing widths={3} style={{borderRadius: 0}}>
             <Menu.Item icon="info circle"
               name='about'
               active={activeItem === 'about'}
               onClick={this.handleItemClick} />
             <Menu.Item icon="university"
               name='myAssociations' active={activeItem === 'myAssociations'}
               onClick={this.handleItemClick} />
             <Menu.Item icon="calendar"
               name='myEvents'
               active={activeItem === 'myEvents'}
               onClick={this.handleItemClick} />
          </Menu>
        </Grid.Row>
        <Grid.Row style={{paddingBottom:"50px"}}>
          <Segment style={{backgroundColor:"rgb(236, 238, 238)", borderRadius: 0, width:"100%"}} padded>
             {(this.state.activeItem === 'about') ? <Grid padded>{this.renderAbout()}</Grid>: null}
             {(this.state.activeItem === 'myAssociations') ? <div>{this.renderMyAssociations()}</div>: null}
             {(this.state.activeItem === 'myEvents') ? <Grid padded>{this.renderMyEvents()}</Grid>: null}
             {(this.state.activeItem === 'sponsors') ? <Grid centered padded>{this.renderSponsors()}</Grid>: null}
             {(this.state.activeItem === 'edit profile') ?
               <h1 style={{textAlign:"center"}}>Nothing to Show Here<Icon name="meh" size="huge"></Icon></h1> : null}
           </Segment>
        </Grid.Row>
      </Grid>
    );
  }
}

// Type cheking
ProfileStudent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  gender: PropTypes.string,
  hometown: PropTypes.string,
  college: PropTypes.string,
  major: PropTypes.string,
  image_path: PropTypes.string,
  bio: PropTypes.string,
  email: PropTypes.string,
  interestedEvents: PropTypes.array,
  followedAssociations: PropTypes.array,
  id: PropTypes.string,
  role: PropTypes.string
}

function mapStateToProps(state) {
  const { profile, auth } = state;
  const { first_name, last_name, gender, hometown, college, major, image_path, bio, email, interestedEvents, followedAssociations } = profile;
  const { id, role } = auth;
  return {
    first_name,
    last_name,
    gender,
    hometown,
    college,
    major,
    image_path,
    bio,
    email,
    interestedEvents,
    followedAssociations,
    id,
    role
  };
}

export default connect(mapStateToProps)(ProfileStudent);
