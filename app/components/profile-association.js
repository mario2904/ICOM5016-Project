import React, { Component } from 'react';
import { Grid, Button, Row, Col, Tab, Tabs, Image} from 'react-bootstrap';
import ModalOverlay from "./modal-overlay";
import Associations from "./associations";
import GridList from "./grid-list";
import AssociationsListItem from './associations-list-item';
import EventsListItem from './events-list-item';
import SponsorsListItem from './sponsors-list-item';
import ProfileAssociationForm from './profile-association-form';
import axios from 'axios';

export default class ProfileAssociation extends Component{

  constructor () {
    super();
    this.state = {
      associationInfo: [],
      activeEvents: [],
      sponsors:[],
      pastEvents: []

    };
  }
  componentWillMount() {
    const tick = this;
    // Get Events Data to render
    axios.get('/api/association/'+this.props.params.associationID)
    .then(function (response) {
      console.log(response);
      tick.setState({associationInfo: response.data})
      // tick.setState({activeEvents: response.data.activeEvents})
      // console.log(tick.state.activeEvents);

      response.data.activeEvents.map((id) => {
        axios.get('/api/event/'+id)
        .then(function (response) {
          console.log(response);
          tick.setState({activeEvents: tick.state.activeEvents.concat(response.data)})
        })
        .catch(function (error) {
          console.log(error);
        });
      });


      response.data.sponsors.map((id) => {
        axios.get('/api/sponsors/'+id)
        .then(function (response) {
          console.log(response);
          tick.setState({sponsors: tick.state.sponsors.concat(response.data)})
        })
        .catch(function (error) {
          console.log(error);
        });
      });



    })
    .catch(function (error) {
      console.log(error);

      // tick.setState(
      //   {
      //     associationInfo:{
      //     name: 'Neuro-RUM / Club Literario en Neurociencias',
      //     initials: 'Neuro-RUM',
      //     location: 'University of Puerto Rico, Mayagüez Campus, Student Center, 3rd Floor',
      //     link: 'http://neurorum.wordpress.com/',
      //     email: 'neuro_rum@uprm.edu',
      //     password: 'password',
      //     profileImage: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/10421498_737130869697123_3967938647967576555_n.jpg?oh=fe06bd1bb04ee5eaf42411221548dc23&oe=58AD9751',
      //     bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, \
      //     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
      //     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
      //     nisi ut aliquip exea commodo consequat. Duis aute irure dolor in \
      //     reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla \
      //     pariatur. Excepteur sint occaecatcupidatat non proident, sunt in culpa\
      //      qui officia deserunt mollit anim id est laborum.'
      //
      //   }
      //   }
      // )






    });
  }


  render(){
    return (
      <Grid>
        <Row>

          <Col lg={4} xs={5}>

            <Image style={imgStyle} src={this.state.associationInfo.profileImage} responsive thumbnail/>

          </Col>

          <Col lg={8} xs={7}>
            <h1 style={txt}><strong> {this.state.associationInfo.name}</strong></h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Tabs defaultActiveKey={1} id="pTabs" bsStyle= "pills">
              <Tab eventKey={1} title="About" style={contentStyle}>
                <p><strong>Email</strong>: {this.state.associationInfo.email}</p>
                <p><strong>Location</strong>: {this.state.associationInfo.location}</p>
                <p><strong>Page Link</strong>: {this.state.associationInfo.link} </p>
                <p><strong>Description</strong>: {this.state.associationInfo.bio}</p>
              </Tab>

              <Tab eventKey={2} title="Live/Future Events" style={contentStyle}>
                <GridList items={this.state.activeEvents} ListItem={EventsListItem}/></Tab>
              <Tab eventKey={3} title="Past Events" style={contentStyle}>
                <GridList items={this.props.events} ListItem={EventsListItem}/></Tab>
              <Tab eventKey={4} title="Sponsors" style={contentStyle}>
                <GridList items={this.state.sponsors} ListItem={SponsorsListItem}/>
              </Tab>
              <Tab eventKey={5} title="Edit Profile" style={contentStyle}>
              <ProfileAssociationForm></ProfileAssociationForm></Tab>
            </Tabs>
          </Col>

        </Row>
      </Grid>
    );
  }
}

const txt={
  fontSize:"40px"
}

const imgStyle = {

  margin: "0px 0px 30px 0px"

}
const contentStyle = {
  margin: "30px 0px 0px 0px"
}

const tabStyle = {
  color: "red",
  backgroundColor: "yellow"
}

ProfileAssociation.defaultProps = {

  events: [
    {
      name: "How to's Obtaining a Summer Research Experience within a Top University",
      association: "Idea Platform",
      startDate: "Sept. 14, 2015",
      endDate: "Sept. 14, 2015",
      startHour: "4:30 am",
      endHour: "6:30 pm",
      location: "AE-242 UPRM",
      image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/12006342_691745294260807_6070613382749021088_n.png?oh=7b77c4998b758f002e2dc50f3ec714c6&oe=58703196",
      id: "1",
      interested: 70
    },
    {
      name: "TEDxNight",
      association: "Idea Platform",
      startDate: "Nov. 18, 2015",
      endDate: "Nov. 18, 2015",
      startHour: "6:00 pm",
      endHour: "8:00 pm",
      location: "UPRM, Cueva de Tarzan",
      image: "https://scontent-atl3-1.xx.fbcdn.net/t31.0-8/905747_714654865303183_4209403577516947442_o.jpg",
      id: "2",
      interested: 33
    },
    {
      name: "Idea Platform Info-Session",
      association: "Idea Platform",
      startDate: "Aug. 18, 2016",
      endDate: "Aug. 18, 2016",
      startHour: "10:30 am",
      endHour: "12:00 pm",
      location: "UPRM: Celis 008",
      image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/14021501_847850748650260_1591931888775191426_n.jpg?oh=a9a5c15a9b927ab1f037409468bf81a5&oe=58A8E370",
      id: "3",
      interested: 31
    },
    {
      name: "App Creators Info-Session",
      association: "Idea Platform",
      startDate: "Dec. 1, 2015",
      endDate: "Dec. 1, 2015",
      startHour: "10:30 am",
      endHour: "12:00 pm",
      location: "UPRM: 1st Floor of Student Center, In Front of Café Colegial",
      image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/12243280_717010345067635_3087706880041792762_n.jpg?oh=1e06997e75b675a0da683af2fe7f36f1&oe=58A114D7",
      id: "4",
      interested: 5
    },
    {
      name: "Smash Bros. Tournament",
      association: "Idea Platform",
      startDate: "Oct. 5, 2016",
      endDate: "Oct. 5, 2016",
      startHour: "6:00 pm",
      endHour: "9:00 pm",
      location: "University of Puerto Rico, Mayaguez Campus - S-228",
      image: "https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14500634_881246661977335_7362168074202245899_o.jpg",
      id: "5",
      interested: 65
    }
  ]
};
