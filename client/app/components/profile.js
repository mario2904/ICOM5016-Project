import React, { Component } from 'react';
import { Grid, Button, Row, Col, Tab, Tabs, Image} from 'react-bootstrap';
import ModalOverlay from "./modal-overlay";
import Associations from "./associations";
import GridList from "./grid-list";
import AssociationsListItem from './associations-list-item';
import EventsListItem from './events-list-item'
import ProfileForm from './profile-form'
export default class Profile extends Component{
  render(){
    return (
      <Grid>
        <Row>
          <Col xs={4}>
            <Image style={imgStyle} src="http://orig01.deviantart.net/a3f5/f/2013/082/c/e/riku___kh_hd_1_5_remix_by_uxianxiii-d5yyrvu.jpg"
            width="200px" responsive rounded/>
          </Col>
          <Col xs={8}>
            <h1><strong> Graciany Lebrón Rodríguez</strong></h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Tabs defaultActiveKey={1} id="pTabs" bsStyle= "pills">
              <Tab eventKey={1} title="About" style={contentStyle}>
                <p><strong>Email</strong>: graciany.lebron@upr.edu</p>
                <p><strong>Gender</strong>: Male</p>
                <p><strong>Hometown</strong>: Bayamón </p>
                <p><strong>College</strong>: University of Puerto Rico Mayagüez Campus</p>
                <p><strong>Major</strong>: ICOM </p>

                <p><strong>Bio</strong>: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum</p>

              </Tab>
              <Tab eventKey={2} title="My Associations" style={contentStyle}>
                <GridList items={this.props.associations} ListItem={AssociationsListItem}/></Tab>
              <Tab eventKey={3} title="My Events" style={contentStyle}>
                <GridList items={this.props.events} ListItem={EventsListItem}/></Tab>
              <Tab eventKey={4} title="Edit Profile" style={contentStyle}>
              <ProfileForm></ProfileForm></Tab>
            </Tabs>
          </Col>

        </Row>
      </Grid>
    );
  }
}

const imgStyle = {
  backgroundColor: "blue",
  margin: "0px 0px 30px 0px"
}
const contentStyle = {
  margin: "30px 0px 0px 0px"
}

const tabStyle = {
  color: "red",
  backgroundColor: "yellow"
}

Profile.defaultProps = {
  associations: [
    {
      initials: 'WIE',
      name: 'IEEE Women in Engineering - UPRM',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/1620402_678979328807039_689288368_n.png?oh=c6adf4b93a16348fba226e12967c533e&oe=58745346',
      id:1
    },
    {
      initials: 'GK',
      name: 'UPRM Golden Key',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/257088_128567813892684_4897113_o.jpg',
      id: 2
    },
    {
      initials: 'HKN',
      name: 'IEEE Eta Kappa Nu - Lambda Tau Chapter',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/1617293_584946991590451_185988420_o.png',
      id: 3
    },
    {
      initials: 'IP',
      name: 'Idea Platform',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/11075167_628822830553054_4682981240345315035_n.png?oh=8c50c6447d46bf9d6a4d61f8974cf279&oe=58A3632B',
      id: 4
    },
    {
      initials: 'CAS',
      name: 'IEEE Circuits and Systems Society - UPRM',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/183118_193619493990036_1420352_n.jpg?oh=798eff36e082d94c33e887b37af9ca14&oe=58A3C9B9',
      id: 5
    },
    {
      initials: 'SHPE',
      name: 'Society of Hispanic Professional Engineers',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/1511592_794103793953169_1204815244615871931_n.png?oh=055f9de551f64f95a901ff880a6c5126&oe=58A573F7',
      id: 6
    },
    {
      initials: 'ACM-ECE',
      name: 'Association for Computing Machinery - Electrical and Computer Engineering Department',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/534293_720750617940260_16455008_n.png?oh=7b2782d5a89bb97f54f8f4340fbb641b&oe=5876855A',
      id: 7
    },
    {
      initials: 'NSPE',
      name: 'National Society of Professional Engineers - UPRM Chapter',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/13975419_1146447655422895_4142955561913595977_o.png',
      id: 8
    },
    {
      initials: 'IG',
      name: 'IncludeGirls - UPRM',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/11130142_1642967139265898_9055604660996095507_n.jpg?oh=60ac8b1ff83a95dd75e545261fd93219&oe=586CFBF1',
      id: 9
    },
    {
      initials: 'HackUPRM',
      name: 'HackPR - UPRM Chapter',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/12891069_666961816777108_9186838969744859359_o.jpg',
      id: 10
    },
    {
      initials: 'ACM-BA',
      name: 'Association of Computer Machinery – College of Business Administration',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/14440967_1323900054295475_4978721172919437033_n.jpg?oh=55dbb3e6c5f0ad45e54e659e931056c9&oe=5872220B',
      id: 11
    },
    {
      initials: 'AIChE',
      name: 'American Institute of Chemical Engineers – CUPRM',
      img: 'http://engineering.uprm.edu/wp-content/uploads/2015/02/AiChE.jpg',
      id: 12
    },
    {
      initials: 'TBP-PRA',
      name: 'Tau Beta Pi - Puerto Rico Alpha',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/10635790_1405695263010619_50773097753679512_n.jpg?oh=36e735bc4675f0a006b98b4975e30d39&oe=585FC100',
      id: 13
    }
  ],

  events: [
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
  ]
};
