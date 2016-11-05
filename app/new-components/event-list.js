import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import { Grid, Row, Col } from 'react-flexbox-grid';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import SearchBarEvents from './search-bar-events';

const styles = {
  searchbar: {
    textAlign: 'center',
    paddingTop: 20,
    paddingdown: 20,
  },
  cardtext: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  image: {
    height: 200,
    objectFit: 'fill'
  },
  item: {
    paddingBottom: '0.5rem',
    paddingTop: '0.5rem'
  }
}

export default class EventList extends Component {
  renderList() {
    return this.props.events.map((event) => {
      const { id, name, associationName, startDate, endDate, startTime, endTime, location, image } = event;
      return (
        <Col xs={12} sm={6} md={3} key={id} style={styles.item}>
          <Card>
            <CardMedia>
              <img src={image} style={styles.image}/>
            </CardMedia>
            <CardTitle
              title={name}
              subtitle={associationName}
              titleStyle={styles.cardtext}
              subtitleStyle={styles.cardtext}
              />
            <CardText>
              <span>{startDate} {startDate === endDate ? null: ' - ' + endDate}</span><br/>
              <span>{startTime + ' - ' + endTime}</span><br/>
              <span style={styles.cardtext}>{location}</span>
            </CardText>
            <CardActions>
              <FlatButton label="View Event" href={'/events/' + id}/>
            </CardActions>
          </Card>
        </Col>
      );
    });
  }
  render() {
    return (
      <div>
        <div style={styles.searchbar}>
          <SearchBarEvents />
        </div>

        <br />
        <br />
        <Grid>
          <Row>
            {this.renderList()}
          </Row>
        </Grid>
      </div>
    );
  }
}

EventList.propTypes = {
  events: React.PropTypes.array
};
