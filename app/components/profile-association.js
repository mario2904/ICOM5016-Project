import React, { Component } from 'react';

import Associations from "./associations";
import GridList from "./grid-list";
import AssociationsListItem from './associations-list-item';
import EventsListItem from './events-list-item';
import SponsorsListItem from './sponsors-list-item';
import ModalEditAssociationProfile from './modal-edit-association-profile';

import axios from 'axios';

import { Form, Grid, Icon,Input, Image, Segment,Item, Menu, Divider, Button } from 'semantic-ui-react'

const banner = '/images/banner/mountains.png';

export default class ProfileAssociation extends Component{

  constructor () {
    super();
    this.state = {
      associationInfo: [],
      activeEvents: [],
      sponsors:[],
      pastEvents: [],
      activeItem: 'about',
      color: "blue",
      content:"follow"
    };
  }
  componentWillMount() {
    const tick = this;
    // Get Events Data to render
    axios.get('/api/association/'+this.props.params.associationID)
    .then(function (response) {
      console.log(response);
      tick.setState({associationInfo: response.data})

    })
    .catch(function (error) {
      console.log(error);

    });
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleOnClick = (e) => this.setState({ color:(this.state.color === "red" ? "blue": "red"),
    content:(this.state.content === "unfollow" ? "follow": "unfollow" )});

  renderAbout = () => {
    return(
    <Grid.Row style={{paddingTop:"10px", paddingBottom:"100px"}}>
      <Segment style={{borderRadius:0, width:"100%", paddingBottom:"100px"}}>
        <h2><strong><Icon name="info circle" size="large"></Icon>About</strong></h2>
        <Divider></Divider>
        <p><strong>Email</strong>: {this.state.associationInfo.email}</p>
        <p><strong>Location</strong>: {this.state.associationInfo.room}</p>
        <p><strong>Page Link</strong>: {this.state.associationInfo.page_link} </p>
        <p><strong>Description</strong>: {this.state.associationInfo.bio}</p>
      </Segment>
    </Grid.Row>
  );

  };
  renderMyCurrentEvents = () => {
    return (
      <Segment style={{borderRadius:0, width:"100%"}}>
        <h2><strong><Icon size="large"name="checked calendar"></Icon>Current Events</strong></h2>
        <Divider/>
        <GridList items={this.state.associationInfo.activeEvents} ListItem={EventsListItem}/>
      </Segment>
    );
  };

  renderMyPastEvents = () => {
    return (
      <Segment style={{borderRadius:0, width:"100%"}}>
        <h2><strong><Icon size="large" name="delete calendar"></Icon>Past Events</strong></h2>
        <Divider/>
        <GridList items={this.state.associationInfo.pastEvents} ListItem={EventsListItem}/>
      </Segment>
    );
  };

  renderSponsors = () => {
      return (
        <Segment style={{borderRadius:0, width:"100%"}}>
          <h2><strong><Icon size="large" name="hand spock"></Icon>Sponsors</strong></h2>
          <Divider />
          <GridList items={this.state.associationInfo.sponsors} ListItem={SponsorsListItem} />
        </Segment>
      );
    };

  render(){
    const { activeItem } = this.state;
    // TODO: CHeck in more detail later.
    if(this.state.associationInfo.followers === undefined) {
      return null;
    }
      return (
        <Grid style={{paddingLeft:"100px", paddingRight:"100px", backgroundColor:"rgb(247, 247, 247)"}}>

          <Grid.Row style={{paddingBottom: 0}} >

            <Grid.Column style={{padding:"0px", margin: 0}} width={4}>
              <Image
                style={{width:"100%", height:"250px", padding: 0}}
                src={this.state.associationInfo.image_path}>
              </Image>
            </Grid.Column>

            <Grid.Column style={{padding:"0px"}}width={12}>
              <Image style={{height:"250px", width:"100%"}} src={banner}></Image>
            </Grid.Column>

          </Grid.Row>

          <Grid.Row style={{paddingBottom:0}}>
            <Segment style={{borderRadius:0, width:"100%"}}>

            <h1 style={{display: 'inline'}}>
              <strong>{this.state.associationInfo.association_name}</strong>{ ' ' }
              <div style={{display:"inline", float:"right"}}>
                <Button
                  style={{verticalAlign: 'middle'}}
                  color={this.state.color}
                  content={this.state.content}
                  icon='user'
                  size="tiny"
                  onClick={this.handleOnClick}
                  label={{ basic: true, color:this.state.color, pointing: 'left', content:this.state.associationInfo.followers.count }}/>
              </div>
            </h1>
            <ModalEditAssociationProfile associationProfile={this.state.associationInfo}/>

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
