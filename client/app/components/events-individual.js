import React, { Component } from 'react';
import {Grid, Col, Button, Panel, Row, Label, Tab, Tabs, GridList,ListGroup, ListGroupItem} from 'react-bootstrap';
import InterestedList from './interestedList';

export default class IndividualEvent extends Component{
  render(){
    return (
      <Grid>
        <div>
          <Panel header="HackPR" bsStyle="primary">
            <div>
              <Panel>
                <div>
                  <img style={photoBanner} src="http://hack.pr/wp-content/uploads/2016/09/Facebook-Banner-HackPR-1.png" responsive/>
                </div>
              </Panel>
            </div>
            <div>
              <Row>
                <Col xs={6} >
                  <p style={eventNameSize}> <strong>Hackathon</strong>  </p>
                </Col>
                <Col xsOffset={10}>
                  <Button type="submit" bsStyle="danger" onClick={this.submit}>
                    Interestd
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
                    <p><strong>Event Time</strong>: {"9:00am-5:00pm"}  </p>
                    <p><strong>Location</strong>: Roberto Clemente</p>
                    <p><strong>Registration Link: </strong> <a href="hack.pr">{"Hack.PR"}</a></p>
                    <p><strong>Event Info:</strong>: HackPR 2016 is the perfect
                      meeting place for the hacker and technology innovation
                      community in Puerto Rico. Join us as a student or
                      professional hacker to win more than {"5k"} in prizes or
                      as a  visitors to participate in our job fair,
                      exhibitors area, workshops and final hacks (projects)
                      presentation at the end of the event. </p>
                  </ul>
                </Row>
              </Panel>
            </div>
            <div>
              <Panel>
                <Tabs defaultActiveKey={1} id="pTabs" bsStyle= "pills">
                  <Tab eventKey={1} title="Reviews" style={contentStyle}>
                    <ListGroup >
                      <ListGroupItem><h4> <strong>Carlos Ojeda</strong></h4></ListGroupItem>
                      <ListGroupItem>
                        <p>Critics Consensus: Ambitious and refreshing, Atlanta
                            offers a unique vehicle for star and series creator Donald Glover's
                            eccentric brand of humor -- as well as a number of
                            timely, trenchant observations.
                        </p>
                      </ListGroupItem>
                    </ListGroup>
                    <ListGroup >
                      <ListGroupItem><h4> <strong>Harambe</strong></h4></ListGroupItem>
                      <ListGroupItem><p>{"Harambe LIVES!!!! He'll be back with a vengeance. DICKS OUT FOR HARAMBE!"}</p></ListGroupItem>
                    </ListGroup>
                  </Tab>
                  <Tab eventKey={2} title="Updates" style={contentStyle}>
                    <ListGroup >
                      <ListGroupItem><h4> <strong>Cambio de Salon</strong></h4></ListGroupItem>
                      <ListGroupItem>
                        <p> Saludos el salon a cambiado al S113</p>
                      </ListGroupItem>
                    </ListGroup>
                  
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
const divStyle = {

    overflow: "auto"
}
