import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { Menu, Segment, Icon, Grid, Dropdown } from 'semantic-ui-react';

import { logoutUser } from '../actions';

const styles = {
  navbar: {
    borderRadius: 0,
    margin: 0
  }
}

class NavBar extends Component {

  state = { activeItem: 'E-Spotter' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { dispatch, isAuthenticated } = this.props;
    const { activeItem } = this.state;
    return (
      <div style={this.props.style}>
        <Segment inverted style={styles.navbar}>
          <Grid>
            <Grid.Row only='computer'>
              <Menu inverted pointing secondary fluid >
                <Menu.Item
                  fitted
                  name='E-Spotter'
                  as={Link} to='/'
                  active={activeItem === 'E-Spotter'}
                  icon='marker'
                  onClick={this.handleItemClick} />

                <Menu.Item
                  fitted
                  name='associations'
                  as={Link} to='/associations'
                  active={activeItem === 'associations'}
                  icon='university'
                  onClick={this.handleItemClick}>
                </Menu.Item>


                <Menu.Item
                  fitted
                  name='events'
                  as={Link} to='/events'
                  active={activeItem === 'events'}
                  icon='calendar outline'
                  onClick={this.handleItemClick} />
                { !isAuthenticated ? null :
                <Menu.Menu position='right' >
                  <Menu.Item
                    fitted
                    name='account'
                    active={activeItem === 'account'}
                    >

                    <Dropdown trigger={<span><Icon name='cogs' /> Account </span>} icon={null}>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          text='profile'
                          as={Link} to={'/' + this.props.role  + 's/' + this.props.id}
                          icon='user' />
                        <Dropdown.Divider></Dropdown.Divider>
                        <Dropdown.Item
                          text='Logout'
                          as={Link} to ='/'
                          icon='sign out'
                          onClick={(e) => {dispatch(logoutUser())}} />
                      </Dropdown.Menu>
                    </Dropdown>

                  </Menu.Item>
                </Menu.Menu>
                }
              </Menu>
            </Grid.Row>
            <Grid.Row only='tablet mobile'>
              <Dropdown trigger={<span><Icon name='content' /> E-Spotter</span>} icon={null}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    text='Home'
                    as={Link} to='/'
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
                      text='profile'
                      as={Link} to={'/' + this.props.role  + 's/' + this.props.id}
                      icon='marker' />

                    <Dropdown.Item
                      text='Logout'
                      as={Link} to ='/'
                      icon='sign out'
                      onClick={(e) => {dispatch(logoutUser())}} />
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

function mapStateToProps(state){
  const { auth } = state;
  const { isFetching, isAuthenticated, id, role, user_name} = auth;

  return {
    isFetching,
    isAuthenticated,
    id,
    role,
    user_name
  };
}

export default connect(mapStateToProps)(NavBar);
