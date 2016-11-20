import React, { Component } from 'react';
import Associations from "./associations";
import GridList from "./grid-list";
import AssociationsListItem from './associations-list-item';
import EventsListItem from './events-list-item';
import ModalEditStudentProfile from './modal-edit-student-profile'
import axios from 'axios';

import { Form, Grid, Icon, Input, Image, Segment, Item, Menu, Divider } from 'semantic-ui-react';
const banner = '/images/banner/867870-minimalist-iphone-5.jpg';

export default class Profile extends Component{
  constructor () {
    super();
    this.state = {
      activeItem: 'about',
      profileInfo: {}
    };
  }

  componentWillMount() {
    const tick = this;
    // Get Events Data to render
    axios.get('/api/student/'+this.props.params.userID)
    .then(function (response) {
      console.log(response);

      tick.setState({profileInfo: response.data})
    })
    .catch(function (error) {
      console.log(error);
      console.log("e")
    });
  }

  state = { activeItem: 'about' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderAbout = () => {
    return(
    <Grid.Row style={{paddingTop:"10px", paddingBottom:"100px"}}>
      <Segment style={{borderRadius:0, width:"100%", paddingBottom:"100px"}}>
        <h2><strong><Icon size="large"name="info circle"></Icon>About</strong></h2>
        <Divider></Divider>
        <p><strong>Email</strong>: {this.state.profileInfo.email}</p>
        <p><strong>Gender</strong>: {this.state.profileInfo.gender}</p>
        <p><strong>Hometown</strong>: {this.state.profileInfo.hometown} </p>
        <p><strong>College</strong>: {this.state.profileInfo.college}</p>
        <p><strong>Major</strong>: {this.state.profileInfo.major}</p>
        <p><strong>Bio</strong>: {this.state.profileInfo.bio}</p>
      </Segment>
    </Grid.Row>
  );
};
  renderMyAssociations = () => {

    return (
      <Segment style={{borderRadius:0, width:"100%"}}><h2><strong><Icon size="large"name="university">
        </Icon>Associations</strong></h2>
        <Divider/>
        <GridList items={this.state.profileInfo.followedAssociations} ListItem={AssociationsListItem}/>
      </Segment>
    );
  };

  renderMyEvents = () => {

    return (
      <Segment style={{borderRadius:0, width:"100%"}}><h2><strong><Icon size="large"name="calendar">
        </Icon>Events</strong></h2>
        <Divider/>
        <GridList items={this.state.profileInfo.interestedEvents} ListItem={EventsListItem}/>
      </Segment>
    );
  };

  render(){
    const { activeItem } = this.state

    return (
      <Grid style={{paddingLeft:"85px", paddingRight:"85px", backgroundColor:"rgb(247, 247, 247)"}}>
        <Grid.Row style={{paddingBottom: 0}} >
          <Grid.Column style={{padding:"0px", margin: 0}} width={4}>
            <Image
              style={{width:"100%", height:"250px", padding: 0}}
              src={this.state.profileInfo.image_path}>
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
              <strong>{this.state.profileInfo.first_name + " "+ this.state.profileInfo.last_name}</strong>
            </h1>
            {' '}
            <div style={{display:"inline",verticalAlign: 'middle'}}>
              <ModalEditStudentProfile studentProfile={this.state.profileInfo}> </ModalEditStudentProfile>
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
