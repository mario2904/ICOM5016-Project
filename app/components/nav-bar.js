import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Badge } from 'react-bootstrap';

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
          <NavDropdown
            eventKey={1}
            title={<div style={{display: "inline-block"}}>Notifications <Badge style={{backgroundColor:"rgb(70, 73, 74)"}}>2</Badge></div>}
            id="notifications-nav-dropdown"
            >
            <MenuItem eventKey={1.1}>Event Update: Idea Platform's Smash Bros Tournament is tomorrow</MenuItem>
            <MenuItem divider/>
            <MenuItem eventKey={1.2}>Suggestion: You should buy your ticket for HackPR's Hackathon!</MenuItem>
          </NavDropdown>
          <NavDropdown eventKey={2} title="Account" id="basic-nav-dropdown">
            <MenuItem eventKey={2.1} href="/profile">Profile</MenuItem>
            <MenuItem eventKey={2.2} href="/settings">Settings</MenuItem>
            <MenuItem eventKey={2.3} href="/associations/:associationID">Association Profile</MenuItem>
            <MenuItem eventKey={2.4} href="/create-event">{"Create Event"}</MenuItem>
            <MenuItem eventKey={2.5} href="/administrator">Admin</MenuItem>
            <MenuItem eventKey={2.6} href="/">Log Out</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    );
  }
}
