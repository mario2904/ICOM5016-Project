import React, { Component } from 'react';
import { Form, Grid, Input, Item, Select, Header, Image, Segment } from 'semantic-ui-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Sector, Cell, Bar, BarChart } from 'recharts';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const gender = [
  {name: 'Male', value: 20},
  {name: 'Female', value: 30},
  {name: 'Other', value: 10},
];

const colleges = [
  {name: 'University of Puerto Rico, Arecibo', students: 20},
  {name: 'University of Puerto Rico, Aguadilla', students: 3},
  {name: 'University of Puerto Rico, Bayamon', students: 15},
  {name: 'University of Puerto Rico, Carolina', students: 30},
  {name: 'University of Puerto Rico, Cayey', students: 22},
  {name: 'University of Puerto Rico, Ciencias Medicas', students: 27},
  {name: 'University of Puerto Rico, Humacao', students: 18},
  {name: 'University of Puerto Rico, Mayaguez', students: 13},
  {name: 'University of Puerto Rico, Rio Piedras', students: 40},
  {name: 'University of Puerto Rico, Ponce', students: 17},
  {name: 'University of Puerto Rico, Rio Piedras', students: 30},
  {name: 'University of Puerto Rico, Utuado', students: 15},
  {name: 'University of Puerto Rico, Rio Piedras', students: 20},

];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

export default class EventStats extends Component {
  render() {
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column  computer={11} tablet={11} mobile={16}>
            <Header as='h2' attached='top'>
              Interested Students
            </Header>
            <Segment attached>
              <ResponsiveContainer aspect={2} >
                <LineChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <XAxis dataKey="name"/>
                 <YAxis/>
                 <CartesianGrid strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Legend />
                 <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                 <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <Header as='h2' attached='top'>
              Gender
            </Header>
            <Segment attached>
              <ResponsiveContainer aspect={2} >
                <PieChart margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <Pie data={gender} fill="#8884d8" label/>
                  <Tooltip/>
                  <Legend />
                 </PieChart>
              </ResponsiveContainer>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} tablet={8} mobile={16}>
            <Header as='h2' attached='top'>
              Colleges
            </Header>
            <Segment attached>
              <ResponsiveContainer aspect={2} >


                <BarChart  data={colleges}>
                 <XAxis dataKey="name" hide/>
                 <YAxis label="Student count"/>
                 <CartesianGrid strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="students" fill="#82ca9d" />
                </BarChart>


              </ResponsiveContainer>
            </Segment>
          </Grid.Column>

          <Grid.Column computer={8} tablet={8} mobile={16}>
            <Header as='h2' attached='top'>
              Major
            </Header>
            <Segment attached>
              <ResponsiveContainer aspect={2} >




              </ResponsiveContainer>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

EventStats.defaultProps = {
  id: 1,
  name: 'Event Name',
  image: 'http://hack.pr/wp-content/uploads/2016/09/Facebook-Banner-HackPR-1.png',
  stats: {

  }
}
