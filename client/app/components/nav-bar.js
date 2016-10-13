import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class NavBar extends Component {
  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/home">E-Spotter</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/associations">Associations</NavItem>
          <NavItem eventKey={2} href="/events">Events</NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">Notifications</NavItem>
          <NavDropdown eventKey={2} title="Account" id="basic-nav-dropdown">
            <MenuItem eventKey={2.1} href="/profile">Profile</MenuItem>
            <MenuItem eventKey={2.2} href="/settings">Settings</MenuItem>
            <MenuItem eventKey={2.3} href="/">Log Out</MenuItem>
            <MenuItem eventKey={2.4} href="/associations/:associationID">Association Profile</MenuItem>
            <MenuItem eventKey={2.5} href="/create-event">{"Create Event"}</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    );
  }
}
