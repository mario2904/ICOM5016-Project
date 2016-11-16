import React, { Component } from 'react';
import { Form, Grid, Input, Item, Select, Header, Image, Segment } from 'semantic-ui-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Sector, Cell, Bar, BarChart } from 'recharts';

const styles = {
  column: {
    paddingTop: '.5rem',
    paddingBottom: '.5rem'
  },
  row: {
    paddingTop: 0,
    paddingBottom: 0
  }
};

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];


const ages = [
  {name: '17', value: 50},
  {name: '18', value: 20},
  {name: '19', value: 7},
  {name: '20', value: 19},
  {name: '21', value: 14},
  {name: '22', value: 17},
  {name: '23', value: 24},
  {name: '24', value: 26},
  // {name: '25', value: 29},
  // {name: '26', value: 21},
];

const gender = [
  {name: 'Male', value: 40},
  {name: 'Female', value: 40},
  {name: 'Other', value: 10},
];

const hometowns = [
  {name: 'Adjuntas', value: 20},
  {name: 'Aguada', value: 21},
  {name: 'Aguadilla', value: 30},
  {name: 'Aguas Buenas', value: 50},
  {name: 'Aibonito', value: 20},
  {name: 'Añasco', value: 20},
  {name: 'Arecibo', value: 20},
  // {name: 'Arroyo', value: 20},
  // {name: 'Barceloneta', value: 20},
  // {name: 'Barranquitas', value: 20},
  // {name: 'Bayamón', value: 20},
  // {name: 'Cabo Rojo', value: 20},
  // {name: 'Caguas', value: 20},
  // {name: 'Camuy', value: 20},
  // {name: 'Carolina', value: 20},
  // {name: 'Cataño', value: 20},
  // {name: 'Cayey', value: 20},
  // {name: 'Ceiba', value: 20},
  // {name: 'Ciales', value: 20},
  // {name: 'Cidra', value: 20},
  // {name: 'Coamo', value: 20},
  // {name: 'Comerío', value: 20},
  // {name: 'Corozal', value: 20},
  // {name: 'Culebra', value: 20},
  // {name: 'Dorado', value: 20},
  // {name: 'Fajardo', value: 20},
  // {name: 'Florida', value: 20},
  // {name: 'Guánica', value: 20},
  // {name: 'Guayama', value: 20},
  // {name: 'Guayanilla', value: 20},
  // {name: 'Guaynabo', value: 20},
  // {name: 'Gurabo', value: 20},
  // {name: 'Hatillo', value: 20},
  // {name: 'Hormigueros', value: 20},
  // {name: 'Humacao', value: 20},
  // {name: 'Isabela', value: 20},
  // {name: 'Jayuya', value: 20},
  // {name: 'Juana Díaz', value: 20},
  // {name: 'Juncos', value: 20},
  // {name: 'Lajas', value: 20},
  // {name: 'Lares', value: 20},
  // {name: 'Las Marías', value: 20},
  // {name: 'Las Piedras', value: 20},
  // {name: 'Loiza', value: 20},
  // {name: 'Luquillo', value: 20},
  // {name: 'Manatí', value: 20},
  // {name: 'Maricao', value: 20},
  // {name: 'Maunabo', value: 20},
  // {name: 'Mayagüez', value: 20},
  // {name: 'Moca', value: 20},
  // {name: 'Morovis', value: 20},
  // {name: 'Naguabo', value: 20},
  // {name: 'Naranjito', value: 20},
  // {name: 'Orocovis', value: 20},
  // {name: 'Patillas', value: 20},
  // {name: 'Peñuelas', value: 20},
  // {name: 'Ponce', value: 20},
  // {name: 'Quebradillas', value: 20},
  // {name: 'Rincón', value: 20},
  // {name: 'Rio Grande', value: 20},
  // {name: 'Sabana Grande', value: 20},
  // {name: 'Salinas', value: 20},
  // {name: 'San Germán', value: 20},
  // {name: 'San Juan', value: 20},
  // {name: 'San Lorenzo', value: 20},
  // {name: 'San Sebastián', value: 20},
  // {name: 'Santa Isabel', value: 20},
  // {name: 'Toa Alta', value: 20},
  // {name: 'Toa Baja', value: 20},
  // {name: 'Trujillo Alto', value: 20},
  // {name: 'Utuado', value: 20},
  // {name: 'Vega Alta', value: 20},
  // {name: 'Vega Baja', value: 20},
  // {name: 'Vieques', value: 20},
  // {name: 'Villalba', value: 20},
  // {name: 'Yabucoa', value: 20},
  // {name: 'Yauco', value: 20},

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
  {name: 'University of Puerto Rico, Utuado', students: 15},
];

const majors = [
  {name: 'ICOM', students: 10},
  {name: 'INEL', students: 20},
  {name: 'INQU', students: 26},
  {name: 'INCI', students: 13},
  {name: 'INME', students: 30},
  {name: 'ININ', students: 20},
  {name: 'OTHER', students: 23},
];

const hack = `
.recharts-wrapper {
  height: auto !important;
  width: auto !important;
}`;


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#408042', '#6FF0F2', '#6F0042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.80;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={'middle'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class EventStats extends Component {
  render() {
    return (
      <Grid padded>
        <style type="text/css">
          {hack}
        </style>
        <Header as='h1' style={{marginTop: 10}}>
          <Image shape='circular' size='medium' src={this.props.image}/>
          {' '}{this.props.name}
        </Header>
        <Grid.Row style={styles.row}>
          <Grid.Column  width={16} style={styles.column}>
            <Header as='h2' attached='top'>
              Interested Students
            </Header>
            <Segment attached>
              <ResponsiveContainer aspect={2}>
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
        </Grid.Row>
        <Grid.Row style={styles.row} centered>
          <Grid.Column computer={5} tablet={5} mobile={16} style={styles.column} >
            <Header as='h2' attached='top'>
              Gender
            </Header>
            <Segment attached>
              <ResponsiveContainer aspect={1} >
                <PieChart >
                  <Pie
                    data={gender}
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}>
                    {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)}
                  </Pie>
                  <Tooltip/>
                  <Legend wrapperStyle={{position: 'relative'}}/>
                 </PieChart>
              </ResponsiveContainer>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16} style={styles.column}>
            <Header as='h2' attached='top'>
              Ages
            </Header>
            <Segment attached >
              <ResponsiveContainer aspect={1} >
                <PieChart  >
                  <Pie
                    data={ages}
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}>
                    {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)}
                  </Pie>
                  <Tooltip/>
                  <Legend wrapperStyle={{position: 'relative'}}/>
                 </PieChart>
              </ResponsiveContainer>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16} style={styles.column}>
            <Header as='h2' attached='top'>
              Hometowns
            </Header>
            <Segment attached >
              <ResponsiveContainer aspect={1} >
                <PieChart  >
                  <Pie
                    data={hometowns}
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}>
                    {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)}
                  </Pie>
                  <Tooltip/>
                  <Legend wrapperStyle={{position: 'relative'}}/>
                 </PieChart>
              </ResponsiveContainer>
            </Segment>
          </Grid.Column>
        </Grid.Row >
        <Grid.Row stretched style={styles.row}>
          <Grid.Column stretched computer={8} tablet={8} mobile={16} style={styles.column}>
            <Header as='h2' attached='top'>
              Colleges
            </Header>
            <Segment attached>
              <ResponsiveContainer aspect={2} >


                <BarChart data={colleges}>
                 <XAxis label="Height" dataKey="name" hide/>
                 <YAxis label="Student count"/>
                 <CartesianGrid strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Bar dataKey="students" fill="#82ca9d" />
                </BarChart>


              </ResponsiveContainer>
            </Segment>
          </Grid.Column>

          <Grid.Column stretched computer={8} tablet={8} mobile={16} style={styles.column}>
            <Header as='h2' attached='top'>
              Majors
            </Header>
            <Segment attached>
              <ResponsiveContainer aspect={2} >


                <BarChart data={majors}>
                 <XAxis label="Height" dataKey="name" hide/>
                 <YAxis label="Student count"/>
                 <CartesianGrid strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Bar dataKey="students" fill="#82ca9d" />
                </BarChart>


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
