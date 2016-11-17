import React, { Component } from 'react';
import { Form, Grid, Icon,Input, Image, Search, Select } from 'semantic-ui-react';
import axios from 'axios';

import EventsSearchBar from './events-search-bar';
import EventsListItem from './events-list-item';
import GridList from './grid-list';
import _ from 'lodash';

export default class Events extends Component {
  constructor () {
    super();
    this.state = {events: [], isLoading: false, value: "", results: []};

  }
  componentWillMount () {
    const tick = this;
    // Get Events Data to render
    axios.get('/api/event/all')
    .then(function (response) {
      console.log(response);
      tick.setState({events: response.data.events})
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('/api/event')

    this.resetComponent()
  }





 resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleChange = (e, result) => this.setState({ value: this.result.event_name })

  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {

      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(this.result.event_name)
      this.setState({
        isLoading: false,

        results: _.filter(this.state.events, isMatch),
      })
    }, 500)

  }

  render () {

    return (

      <Grid padded style={{backgroundColor:"rgb(247, 247, 247)"}}centered>
        <Grid.Row style={{padding:"50px 0px 50px 0px"}}>
        <h1 style={{textAlign:"center"}}>
          <Icon color="teal" size="huge" name="paw"></Icon><strong>Search any Event on Campus</strong></h1>
        </Grid.Row>
        <Grid padded style={{padding: 40}}>
          <Search placeholder='Search by name...'
           loading={this.isLoading}
           onChange={this.handleChange}
           onSearchChange={this.handleSearchChange}
           results={this.results}
           value={this.value}/>
          <Form>
            <Form.Group>
              <Form.Field inline control={Select} label='Order by'
                options={order} placeholder='i.e. Most Popular' />
              <Form.Field inline control={Select} label='Categories'
                options={options} placeholder='i.e. Food' />
            </Form.Group>
          </Form>
        </Grid>

        <GridList items={this.state.events} ListItem={EventsListItem}/>
      </Grid>
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


// For testing...
Events.defaultProps = {
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
      img: "http://1u88jj3r4db2x4txp44yqfj1.wpengine.netdna-cdn.com/wp-content/uploads/2016/03/smashmelee.jpg",
      id: "5",
      interested: 65
    }
  ]
};
