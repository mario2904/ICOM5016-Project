import React, { Component } from 'react';
import {Grid, Button, Row, Col, Image,Panel, Label} from 'react-bootstrap'

export default class EventView extends Component{
  render(){
    return(
  <Grid>
    <Row>
      <Col xs={10} xsOffset={1}>
        <Panel header={title} bsStyle="primary">
        <Image style= {imgStyle} src="https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14242492_1122310254512514_1702488471920293701_o.jpg"
         responsive rounded/>
     </Panel>
      </Col>
    </Row>
    <Row>
    <Col xs={9} style={txtStyle}><strong>HackPR 2016</strong> </Col>
    <Col xs={2}><Label bsStyle="primary" style= {labelStyle}>Competition</Label></Col>
    <Col><Button bsStyle="primary">Interested</Button></Col>
    </Row>
    </Grid>
  );
  }

}
const imgStyle = {
  //border: "50px solid black",
  //display: "block",
  margin: "auto",
  objectFit: "contain"

}

const title = (
  <h3>Panel title</h3>
);

const txtStyle ={
  //padding : "30px 170px",
  fontSize: "50px"
}

const labelStyle ={
  margin: "100px 0 0 20px"
}
