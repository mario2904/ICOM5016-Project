import React, { Component } from 'react';
import { Link } from 'react-router'
import { Menu, Segment, Icon, Grid, Dropdown } from 'semantic-ui-react';

const styles = {
  navbar: {
    borderRadius: 0,
    margin: 0
  }
}

export default class NavBar extends Component {

  state = { activeItem: 'E-Spotter' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Segment inverted style={styles.navbar}>
        <Grid>
          <Grid.Row only='computer'>
            <Menu inverted pointing secondary fluid >
              <Menu.Item
                fitted
                name='E-Spotter'
                as={Link} to='/home'
                active={activeItem === 'E-Spotter'}
                icon='marker'
                onClick={this.handleItemClick} />

              <Menu.Item
                fitted
                name='associations'
                as={Link} to='/associations'
                active={activeItem === 'associations'}
                icon='university'
                onClick={this.handleItemClick} />

              <Menu.Item
                fitted
                name='events'
                as={Link} to='/events'
                active={activeItem === 'events'}
                icon='calendar outline'
                onClick={this.handleItemClick} />
              <Menu.Menu position='right' >
                <Menu.Item
                  fitted
                  name='account'
                  as={Link} to='/#'
                  active={activeItem === 'account'}
                  icon='user'
                  onClick={this.handleItemClick} />
              </Menu.Menu>
            </Menu>
          </Grid.Row>
          <Grid.Row only='tablet mobile'>
            <Dropdown trigger={<span><Icon name='content' /> E-Spotter</span>} icon={null}>
              <Dropdown.Menu>
                <Dropdown.Item
                  text='Home'
                  as={Link} to='/home'
                  icon='marker' />
                <Dropdown.Item
                  text='Associations'
                  as={Link} to='/associations'
                  icon='university' />
                <Dropdown.Item
                  text='Events'
                  as={Link} to='/events'
                  icon='calendar outline' />
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item
                  text='Account'
                  as={Link} to='/#'
                  icon='user' />

              </Dropdown.Menu>
            </Dropdown>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}
