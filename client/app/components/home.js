import React, { Component } from 'react';
import { Button, PageHeader, Jumbotron, Image} from 'react-bootstrap';

import EventsSearchBar from './events-search-bar';
import GridList from './grid-list';
import EventsListItem from './events-list-item';

export default class Home extends Component {
  render () {
    return (
      <div>

          <Image responsive style={picStyle} src="http://nceft.org/wp-content/uploads/2014/12/calendar-graphic-wide.jpg"/>
          <h3 style={{textAlign: "center", fontSize:"4em"}}><strong>Interested Events</strong></h3>
          <EventsSearchBar />
          <GridList items={this.props.interestedEvents} ListItem={EventsListItem}/>
      </div>
    );
  }
}

// For testing...
Home.defaultProps = {
  interestedEvents: [
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

const homeStyle={
  objectFit: "fill",
  width: "auto",
  height: "500px",
  maxHeight: "500px",
  margin: "-25px 0px 0px 0px"
}

 const picStyle={
  width: "100%",
  maxHeight:"400px",
  height: "100%",
  margin: "-25px 0px 0px 0px",
  padding: "0px 0px 0px 0px",
  display:"inline-block" /*Inline block is life*/


}
