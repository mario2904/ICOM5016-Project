import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import {Input, Select, Grid, Form, Segment} from 'semantic-ui-react';

export default class EventsSearchBar extends Component {
  render () {
    return (

      <Segment inverted color="blue" style={{borderRadius: 0}}>
      <Grid padded >
        <Input  action={{ icon: 'search'}} placeholder='Search...' />
        <Form>
          <Form.Group >

            <Form.Field inline control={Select} label='Order by'
              options={order} placeholder='i.e. Most Popular' />
            <Form.Field inline control={Select} label='Categories'
              options={options} placeholder='i.e. Food' />
          </Form.Group>
        </Form>

        </Grid>
        </Segment>


      // <Form style={style} inline>
      //   {/*Quick Fix. Try to find a better way to centralize inline form*/}
      //   <div style={{textAlign: "center"}}>
      //     <FormGroup style={searchStyle} controlId="formInlineName">
      //       <ControlLabel style={txtStyle}>Name</ControlLabel>
      //       {' '}
      //       <FormControl type="text" placeholder="i.e. Hackathon" />
      //     </FormGroup>
      //     {' '}
      //     <FormGroup style={searchStyle} controlId="formInlineFilter">
      //       <ControlLabel style={txtStyle}>Order By</ControlLabel>
      //       {' '}
      //       <FormControl componentClass="select" placeholder="Most Popular">
      //         <option value="most-popular">Most Popular</option>
      //         <option value="newest">Starting soon</option>
      //         <option value="ascending">A - Z</option>
      //         <option value="descending">Z - A</option>
      //       </FormControl>
      //     </FormGroup>
      //     {' '}
      //     <FormGroup style={searchStyle} controlId="formInlineCategory">
      //       <ControlLabel style={txtStyle}>Category</ControlLabel>
      //       {' '}
      //       <FormControl componentClass="select" placeholder="Food">
      //           <option value="Food">Food</option>
      //           <option value="Music">Music</option>
      //           <option value="Fundraiser">Fundraiser</option>
      //           <option value="Arts">Arts</option>
      //           <option value="Social">Social</option>
      //           <option value="Educational">Educational</option>
      //           <option value="Networking">Networking</option>
      //           <option value="Sport">Sport</option>
      //           <option value="Competition">Competition</option>
      //           <option value="Other">Other</option>
      //       </FormControl>
      //     </FormGroup>
      //   </div>
      // </Form>
    );
  }
}
// Add padding to searchbar
const options = [
  { text: 'Food', value: 'Food' },
  { text: 'Music', value: 'Music' },
  { text: 'Fundraiser', value: 'Fundraiser' },
  { text: 'Arts', value: 'Arts' },
  { text: 'Social', value: 'Social' },
  { text: 'Educational', value: 'Educational' },
  { text: 'Networking', value: 'Networking' },
  { text: 'Sport', value: 'Sport' },
  { text: 'Competition', value: 'Competition' },
  { text: 'Other', value: 'Other' }];

  const order = [
    { text: 'Most Popular', value: 'Most Popular' },
    { text: 'Starting Soon', value: 'Starting Soon' },
    { text: 'A - Z', value: 'A - Z' },
    { text: 'Z - A', value: 'Z - A' }];

const style = {
    padding: "50px"
};

const searchStyle={
  margin: "0px 30px 0px 0px"
};

const txtStyle={
  padding: "0px 10px 0px 0px"
}
