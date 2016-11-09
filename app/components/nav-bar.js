import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Badge } from 'react-bootstrap';
import {Menu, Segment,Icon, Dropdown, Grid} from 'semantic-ui-react'

export default class NavBar extends Component {
state = { activeItem: 'home' };
handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
     const { activeItem } = this.state

    return (

        <Menu color="teal" style={{backgroundColor:"black",
           margin:"0px 0px 14px 0px"}} inverted secondary>
          <Menu.Item  style={{color:"white"}} name='home'
            active={activeItem === 'home'} onClick={this.handleItemClick}
            href="/home">
            E-Spotter <Icon name="marker"  size="large"color= "blue"/>
            </Menu.Item>

          <Menu.Item color="red" style={{color:"white"}} name='associations'
            active={activeItem === 'associations'} onClick={this.handleItemClick}
            href="/associations">
            Associations <Icon name="university" color= "green"/> </Menu.Item>

        <Menu.Item style={{color:"white"}} name='events'

           active={activeItem === 'events'} onClick={this.handleItemClick} href="/events">
           Events <Icon name="calendar outline"  color= "red"/> </Menu.Item>

          <Menu.Menu position='right'>
          <Dropdown as={Menu.Item} text="Account" icon='user' simple
            name="account" active={activeItem === 'account'} onClick={this.handleItemClick}>
                   <Dropdown.Menu>
                     <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                     <Dropdown.Item href="/associations/:associationID">Association Profile</Dropdown.Item>
                     <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                     <Dropdown.Divider />
                     <Dropdown.Item href="/create-event">Create Event</Dropdown.Item>
                     <Dropdown.Item href="/administrator">Admin</Dropdown.Item>
                     <Dropdown.Item href="/">Log Out</Dropdown.Item>
                   </Dropdown.Menu>
                 </Dropdown>
           </Menu.Menu>

        </Menu>

    );
  }
}

const navStyle ={
  borderStyle: "solid",
  borderColor: "black",
  borderWidth: "5px",
  width: "100%"
}
