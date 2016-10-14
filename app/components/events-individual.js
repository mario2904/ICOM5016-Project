import React, { Component } from 'react';
import {Grid, Col, Button, Panel, Row, Label, Tab, Tabs,ListGroup, ListGroupItem, FormGroup, ControlLabel,FormControl} from 'react-bootstrap';
import InterestedList from './interestedList';
import ReviewUpdateItem from './review-item';
import axios from 'axios';

export default class IndividualEvent extends Component {
  renderUpdateItems () {
    return this.props.updates.map(function(update1, i) {
      return <ReviewUpdateItem name={update1.udpateHeader} key={i} review={update1.updateBody}/>;
    });
  }
  renderReviewItems () {
    return this.props.reviews.map(function(review1, i) {
      return <ReviewUpdateItem name={review1.reviewName} key={i} review={review1.reviewBody}/>;
    });
  }

  constructor () {
    super();
    this.state = {eventInfo: []};
  }
  componentWillMount() {
    const tick = this;
    // Get Events Data to render
    axios.get('/api/event/'+this.props.params.eventID)
    .then(function (response) {
      console.log(response);
      tick.setState({eventInfo: response.data})
    })
    .catch(function (error) {
      console.log(error);
      tick.setState(
        {eventInfo:{
          name: "Hackathon",
          eventID: "1",
          associationName: "HackPR",
          associationID: "45239847",
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
          registrationLink:"google.com"
        }
        }
      )
    });
  }


  render(){
    console.log(this.props.params.eventID);
    return (
      <Grid>
        <div>
          <Panel header={this.state.eventInfo.associationName} bsStyle="primary">
            <div>
              <Panel>
                <div>
                  <img style={photoBanner} src={this.state.eventInfo.image} />
                </div>
              </Panel>
            </div>
            <div>
              <Row>
                <Col xs={6} >
                  <p style={eventNameSize}> <strong>{this.state.eventInfo.name}</strong>  </p>
                </Col>
                <Col xsOffset={10}>
                  <Button type="submit" bsStyle="danger" onClick={this.submit}>
                    Interested
                  </Button>
                </Col>
              </Row>
                <Label bsStyle="primary">Competition</Label>
                <Label bsStyle="primary">Paying Event</Label>
                <Label></Label>
              <Row> <p> </p></Row>
            </div>
            <div>
              <Panel>
                <Row>
                  <ul>
                    <p><strong>Event Date</strong>:{this.state.eventInfo.startDate} - {this.state.eventInfo.endDate}</p>
                    <p><strong>Event Time</strong>:{this.state.eventInfo.startTime} - {this.state.eventInfo.endTime}</p>
                    <p><strong>Location</strong>: {this.state.eventInfo.location}</p>
                    <p><strong>Registration Link: </strong> <a href={this.state.eventInfo.registrationLink}>{"Link"}</a></p>
                    <p><strong>Event Info: </strong>{this.state.eventInfo.description} </p>
                  </ul>
                </Row>
              </Panel>
            </div>
            <div>
              <Panel>
                <Tabs defaultActiveKey={1} id="pTabs" bsStyle= "pills">
                  <Tab eventKey={1} title="Reviews" style={contentStyle}>
                    {this.renderReviewItems()}
                    <ListGroup >
                      <ListGroupItem>

                          <FormGroup controlId="formHorizontalAname" >

                              <ControlLabel>Chewbacca</ControlLabel>
                              <FormControl
                                type="text"
                                placeholder="Enter Review"

                              />

                          </FormGroup>
                          <Button type="submit" bsStyle="primary" onClick={this.submit}>
                            Submit
                          </Button>
                      </ListGroupItem>

                    </ListGroup>
                  </Tab>
                  <Tab eventKey={2} title="Updates" style={contentStyle}>
                    {this.renderUpdateItems()}
                  </Tab>
                  <Tab eventKey={3} title="Interested List" style={contentStyle}>
                    <div style={divStyle}>
                      <InterestedList></InterestedList>
                    </div>
                  </Tab>
                </Tabs>
              </Panel>
            </div>
          </Panel>
        </div>
      </Grid>
    )
  }
}

const eventNameSize = {
  fontSize: "30px"
}
const photoBanner = {
  height: "100%",
  width: "100%"
}
const contentStyle = {
  margin: "30px 0px 0px 0px"
}
const divStyle = {
    overflow: "auto"
}
IndividualEvent.defaultProps = {
  eventData:
    {
      name: "Hackathon",
      eventID: "1",
      associationName: "HackPR",
      associationID: "45239847",
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
      registrationLink:"google.com"

    },
  reviews:[
    {
      reviewName: "Carlos Ojeda",
      reviewBody: " Critics Consensus: Ambitious and refreshing, Atlanta \
          offers a unique vehicle for star and series creator Donald Glover's \
          eccentric brand of humor -- as well as a number of \
          timely, trenchant observations."

    },
    {
      reviewName: "Harambe",
      reviewBody: " Harambe LIVES!!!! He'll be back with a vengeance.OUT FOR HARAMBE!"

    }
  ],
  updates: [
    {
    udpateHeader: "Cambio de Salon",
    updateBody:   "Saludos, el salon a cambiado al S113"
    }
  ]
};
