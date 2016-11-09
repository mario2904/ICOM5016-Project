import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents } from '../actions';
import { Grid, Row, Col } from 'react-flexbox-grid';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ActionInfo from 'material-ui/svg-icons/action/info';

import EventList from './event-list';

const banner = '/images/banner/rfn-calendar-banner.png';


const styles = {
  banner: {
    width: '100%',
    backgroundImage: `url(${banner})`,
    height:'200px',
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
  },
  container: {
    textAlign: 'center',
    paddingTop: 20,
    paddingdown: 20,
  },
  item: {
    paddingBottom: '0.5rem',
    paddingTop: '0.5rem',
  },
  item2: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  image: {
    objectFit: 'cover'
  },
  paper: {
    padding: 10,
  }
};

class Home extends Component {
  componentWillMount () {
    // Fetch all events
    this.props.fetchEvents();
  }

  render() {
    return (
      <div>
        <div style={styles.banner}></div>
        <div style={styles.container}>
          <h1>Home Page</h1>
        </div>
        <Grid>
          <Row style={styles.item}>
            <Col xs= {12} md={3}>
              <Paper style={styles.item2}>
                <List>
                  <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                  <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
                  <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                  <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                  <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                </List>
                <Divider />
                <List>
                  <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
                  <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
                  <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
                  <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
                </List>
              </Paper>
            </Col>
            <Col xs={12} md={9} >
              <Row style={styles.item}>
                <Col xs={12} md={12}>
                  <Card>
                    <CardHeader
                      title="Updates"
                      subtitle="Subtitle"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardActions>
                      <FlatButton label="Action1" />
                      <FlatButton label="Action2" />
                    </CardActions>
                    <CardText expandable={true}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <Row style={styles.item}>
                <Col xs={12} md={12}>
                  <Card>
                    <CardHeader
                      title="Without Avatar"
                      subtitle="Subtitle"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardActions>
                      <FlatButton label="Action1" />
                      <FlatButton label="Action2" />
                    </CardActions>
                    <CardText expandable={true}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <Row style={styles.item}>
                <Col xs={12} md={12}>
                  <Card>
                    <CardHeader
                      title="Without Avatar"
                      subtitle="Subtitle"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardActions>
                      <FlatButton label="Action1" />
                      <FlatButton label="Action2" />
                    </CardActions>
                    <CardText expandable={true}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <Paper style={styles.paper}>
            <h2>Followed Events</h2>
              <GridList style={styles.gridList} >
                {this.props.events.map((event) => (
                  <GridTile
                    key={event.id}
                    title={event.name}
                    actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                  >
                    <img src={event.image} style={styles.image}/>
                  </GridTile>
                ))}
              </GridList>
          </Paper>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {events: state.events};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchEvents: fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
