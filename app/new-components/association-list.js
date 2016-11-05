import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import { Grid, Row, Col } from 'react-flexbox-grid';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import SearchBarAssociations from './search-bar-associations';

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

export default class AssociationList extends Component {
  renderList() {
    return this.props.associations.map((association) => {
      const { id, name, initials, profileImage } = association;
      return (
        <Col xs={12} sm={6} md={3} key={id} style={styles.item}>
          <Card>
            <CardMedia>
              <img src={profileImage} style={styles.image}/>
            </CardMedia>
            <CardTitle
              title={initials}
              subtitle={name}
              titleStyle={styles.cardtext}
              subtitleStyle={styles.cardtext}
              />
            <CardActions>
              <FlatButton label="View Association" href={'/association/' + id}/>
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
          <SearchBarAssociations />
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

AssociationList.propTypes = {
  associations: React.PropTypes.array
};
