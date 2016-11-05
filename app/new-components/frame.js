import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import SocialGroup from 'material-ui/svg-icons/social/group';
import SocialNotifications from 'material-ui/svg-icons/social/notifications';
import SocialSchool from 'material-ui/svg-icons/social/school';
import ActionPageview from 'material-ui/svg-icons/action/pageview';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import NotificationEventNote from 'material-ui/svg-icons/notification/event-note';

import { Grid, Row, Col } from 'react-flexbox-grid';

const styles = {
  footer: {
    height: 200,
    marginTop: 100,
    backgroundColor: 'grey',
  }
}

export default class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  handleToggle = (event) => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});


  render() {
    return (
      <div>
        <AppBar
          title="E-Spotter"
          onTitleTouchTap={(event) => browserHistory.push('/home')}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <AppBar showMenuIconButton={false}/>
          <List>
            <ListItem
              disabled={true}
              leftAvatar={
                <Avatar src="images/defaults/default-profile.jpg" />
              }
            >
              Image Avatar
            </ListItem>
            <Divider />
            <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
            <ListItem primaryText="Notifications" leftIcon={<SocialNotifications />} />
            <ListItem primaryText="Settings" leftIcon={<ActionSettings />} />
            <ListItem
              primaryText="Friends"
              leftIcon={<SocialGroup />}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="Person 1"
                  leftAvatar={
                    <Avatar src="images/defaults/default-profile.jpg" />
                  }
                />,
                <ListItem
                  key={2}
                  primaryText="Person 2"
                  leftAvatar={
                    <Avatar src="images/defaults/default-profile.jpg" />
                  }
                />
              ]}
              />
            <ListItem
              primaryText="Associations"
              leftIcon={<SocialSchool />}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="Association 1"
                  leftAvatar={
                    <Avatar src="images/defaults/default-profile.jpg" />
                  }
                />,
                <ListItem
                  key={2}
                  primaryText="Association 2"
                  leftAvatar={
                    <Avatar src="images/defaults/default-profile.jpg" />
                  }
                />
              ]}
              />

            <Divider />
            <ListItem
              primaryText="Explore"
              leftIcon={<ActionPageview />}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  href="/associations"
                  primaryText="Associations"
                  leftIcon={<SocialSchool />}
                />,
                <ListItem
                  key={2}
                  href="/events"
                  primaryText="Events"
                  leftIcon={<NotificationEventNote />}
                />
              ]}
              />

          </List>
        </Drawer>
        { this.props.children }
        <div style={styles.footer}>
          <Grid fluid>
            <footer>
              <p>© E-Spotter Company 2016</p>
            </footer>
          </Grid>
        </div>
      </div>
    );
  }
}
