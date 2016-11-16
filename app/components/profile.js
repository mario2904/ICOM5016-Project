import React, { Component } from 'react';
import Associations from "./associations";
import GridList from "./grid-list";
import AssociationsListItem from './associations-list-item';
import EventsListItem from './events-list-item';
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
      console.log("Entered!!!!!!")
      // const temp = response.data;
      // profileInfo.first_name = temp.first_name;

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
        <p><strong>Hometown Link</strong>: {this.state.profileInfo.hometown} </p>
        <p><strong>College</strong>: {this.state.profileInfo.college}</p>
        <p><strong>Major</strong>: {this.state.profileInfo.major}</p>
        <p><strong>Bio</strong>: {this.state.profileInfo.bio}</p>
      </Segment>
    </Grid.Row>
  );
};
  renderMyAssociations = () => {

    return (<Segment style={{borderRadius:0, width:"100%"}}><h2><strong><Icon size="large"name="university">
    </Icon>Associations</strong></h2>
  <Divider/>
  <GridList items={this.state.profileInfo.followedAssociations} ListItem={AssociationsListItem}/></Segment>);
  };

  renderMyEvents = () => {

    return (<Segment style={{borderRadius:0, width:"100%"}}><h2><strong><Icon size="large"name="calendar">
  </Icon>Events</strong></h2>
<Divider/>
  <GridList items={this.state.profileInfo.interestedEvents} ListItem={EventsListItem}/>
</Segment>);
  };

  render(){
    const { activeItem } = this.state

    return (
      //<Grid>
        <Grid style={{paddingLeft:"85px", paddingRight:"85px",
          backgroundColor:"rgb(247, 247, 247)"}}>
          <Grid.Row style={{paddingBottom: 0}} >

        <Grid.Column style={{padding:"0px", margin: 0}} width={4}>
          <Image style={{width:"100%", height:"250px", padding: 0}}
            src={this.state.profileInfo.image_path}></Image>

        </Grid.Column>
          <Grid.Column style={{padding:"0px"}}width={12}>
          <Image style={{height:"250px", width:"100%"}} src={banner}></Image>
          </Grid.Column>
        </Grid.Row>

          <Grid.Row style={{paddingBottom:0}}>
          <Segment style={{borderRadius:0, width:"100%"}}>
            <h1><strong>{this.state.profileInfo.first_name + " "+ this.state.profileInfo.last_name}</strong></h1>
          </Segment>
          </Grid.Row>

          <Grid.Row style={{paddingTop: 0}}>
            <Menu inverted fluid pointing widths={4} style={{borderRadius: 0}}>
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
               <Menu.Item icon="write"
                 name='edit profile'
                 active={activeItem === 'edit profile'}
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

      // <Grid>
      //   <Row>
      //
      //     <Col lg={4} xs={5}>
      //       <Image style={imgStyle} src={this.props.profile.pic}
      //        responsive thumbnail/>
      //     </Col>
      //
      //     <Col lg={8} xs={7}>
      //       <h1 style={txt}><strong> {this.props.profile.name}</strong></h1>
      //     </Col>
      //   </Row>
      //
      //   <Row>
      //     <Col xs={12}>
      //       <Tabs defaultActiveKey={1} id="pTabs" bsStyle= "pills">
      //         <Tab eventKey={1} title="About" style={contentStyle}>
      //           <p><strong>Email</strong>: {this.props.profile.email}</p>
      //           <p><strong>Gender</strong>: {this.props.profile.gender}</p>
      //           <p><strong>Hometown</strong>: {this.props.profile.hometown} </p>
      //           <p><strong>College</strong>: {this.props.profile.college}</p>
      //           <p><strong>Major</strong>: {this.props.profile.major}</p>
      //
      //           <p><strong>Bio</strong>: {this.props.profile.bio}</p>
      //
      //         </Tab>
      //         <Tab eventKey={2} title="My Associations" style={contentStyle}>
      //           <GridList items={this.props.associations} ListItem={AssociationsListItem}/></Tab>
      //         <Tab eventKey={3} title="My Events" style={contentStyle}>
      //           <GridList items={this.props.events} ListItem={EventsListItem}/></Tab>
      //         <Tab eventKey={4} title="Edit Profile" style={contentStyle}>
      //         <ProfileForm></ProfileForm></Tab>
      //       </Tabs>
      //     </Col>
      //
      //   </Row>
      // </Grid>
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

Profile.defaultProps = {
  profile: {
    name: "Graciany A. Lebron Rodriguez",
    email: "graciany.lebron@upr.edu",
    gender: "Male",
    hometown: "Bayamón",
    college: "University of Puerto Rico Mayagüez Campus",
    major: "ICOM",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do \
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \
    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip \
    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate\
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat \
   cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id \
   est laborum",
   pic: "http://www.assc.org.au/wp-content/uploads/2016/07/profile-placeholder-image-e1469156738677.png"

  },

  associations: [
    {
      initials: 'WIE',
      association_name: 'IEEE Women in Engineering - UPRM',
      image_path: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/1620402_678979328807039_689288368_n.png?oh=c6adf4b93a16348fba226e12967c533e&oe=58745346',
      association_id:1
    },
    {
      initials: 'GK',
      association_name: 'UPRM Golden Key',
      image_path: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/257088_128567813892684_4897113_o.jpg',
      association_id: 2
    },
    {
      initials: 'HKN',
      association_name: 'IEEE Eta Kappa Nu - Lambda Tau Chapter',
      image_path: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/1617293_584946991590451_185988420_o.png',
      association_id: 3
    },
    {
      initials: 'IP',
      association_name: 'Idea Platform',
      image_path: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/11075167_628822830553054_4682981240345315035_n.png?oh=8c50c6447d46bf9d6a4d61f8974cf279&oe=58A3632B',
      association_id: 4
    },
    {
      initials: 'CAS',
      association_name: 'IEEE Circuits and Systems Society - UPRM',
      image_path: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/183118_193619493990036_1420352_n.jpg?oh=798eff36e082d94c33e887b37af9ca14&oe=58A3C9B9',
      association_id: 5
    },
    {
      initials: 'SHPE',
      association_name: 'Society of Hispanic Professional Engineers',
      image_path: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/1511592_794103793953169_1204815244615871931_n.png?oh=055f9de551f64f95a901ff880a6c5126&oe=58A573F7',
      association_id: 6
    },
    {
      initials: 'ACM-ECE',
      association_name: 'Association for Computing Machinery - Electrical and Computer Engineering Department',
      image_path: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/534293_720750617940260_16455008_n.png?oh=7b2782d5a89bb97f54f8f4340fbb641b&oe=5876855A',
      association_id: 7
    },
    {
      initials: 'NSPE',
      association_name: 'National Society of Professional Engineers - UPRM Chapter',
      image_path: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/13975419_1146447655422895_4142955561913595977_o.png',
      association_id: 8
    },
    {
      initials: 'IG',
      association_name: 'IncludeGirls - UPRM',
      image_path: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/11130142_1642967139265898_9055604660996095507_n.jpg?oh=60ac8b1ff83a95dd75e545261fd93219&oe=586CFBF1',
      association_id: 9
    },
    {
      initials: 'HackUPRM',
      association_name: 'HackPR - UPRM Chapter',
      image_path: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/12891069_666961816777108_9186838969744859359_o.jpg',
      association_id: 10
    },
    {
      initials: 'ACM-BA',
      association_name: 'Association of Computer Machinery – College of Business Administration',
      image_path: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/14440967_1323900054295475_4978721172919437033_n.jpg?oh=55dbb3e6c5f0ad45e54e659e931056c9&oe=5872220B',
      association_id: 11
    },
    {
      initials: 'AIChE',
      association_name: 'American Institute of Chemical Engineers – CUPRM',
      image_path: 'http://engineering.uprm.edu/wp-content/uploads/2015/02/AiChE.jpg',
      association_id: 12
    },
    {
      initials: 'TBP-PRA',
      association_name: 'Tau Beta Pi - Puerto Rico Alpha',
      image_path: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/10635790_1405695263010619_50773097753679512_n.jpg?oh=36e735bc4675f0a006b98b4975e30d39&oe=585FC100',
      association_id: 13
    }
  ],

  events: [
    {
      event_name: "Hackathon",
      association_name: "HackPR",
      start_date: "Oct. 15, 2016",
      end_date: "Oct. 16, 2016",
      start_time: "9:00 am",
      end_time: "5:00 pm",
      room: "Roberto Clemente",
      image_path: "http://hack.pr/wp-content/uploads/2016/09/Facebook-Banner-HackPR-1.png",
      event_id: "1",
      interested: 200
    },
    {
      event_name: "Recogido de Alimentos",
      association_name: "Organización Estudiantil de Protección de Animales",
      start_date: "Oct. 13, 2016",
      end_date: "Oct. 13, 2016",
      start_time: "8:00 am",
      end_time: "11:00 am",
      room: "Universidad de Puerto Rico, Recinto Mayaguez",
      image_path: "https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/14590297_542744765930783_7339776675739874149_n.jpg?oh=8ad85c8fcb55d4fe6404c3aaf64ce685&oe=58A83C20",
      event_id: "2",
      interested: 20
    },
    {
      event_name: "Fundraiser Neuro-RUM",
      association_name: "Neuro-RUM",
      start_date: "Sept. 28, 2016",
      end_date: "Sept. 28, 2016",
      start_time: "3:30 pm",
      end_time: "8:30 pm",
      room: "Cold Stone Creamery de Mayaguez",
      image_path: "https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14242492_1122310254512514_1702488471920293701_o.jpg",
      event_id: "3",
      interested: 50
    },
    {
      event_name: "Circuits Lab Workshop",
      association_name: "IEEE Circuits and Systems Society UPRM",
      start_date: "Oct. 5, 2016",
      end_date: "Oct. 5, 2016",
      start_time: "7:00 pm",
      end_time: "9:00 pm",
      room: "University of Puerto Rico, Mayaguez Campus - S-104A",
      image_path: "https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14543654_1328305037188137_8919927744200733943_o.png",
      event_id: "4",
      interested: 35
    },
    {
      event_name: "Smash Bros. Tournament",
      association_name: "Idea Platform",
      start_date: "Oct. 5, 2016",
      end_date: "Oct. 5, 2016",
      start_time: "6:00 pm",
      end_time: "9:00 pm",
      room: "University of Puerto Rico, Mayaguez Campus - S-228",
      image_path: "https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14500634_881246661977335_7362168074202245899_o.jpg",
      event_id: "5",
      interested: 65
    }
  ]
};
