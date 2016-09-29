import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class NavBar extends Component {
  render () {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">E-Spotter</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">Associations</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">MEEH</NavItem>
            <NavItem eventKey={2} href="#">Login</NavItem>
              <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Profile</MenuItem>
                <MenuItem eventKey={3.2}>Settings</MenuItem>
                <MenuItem eventKey={3.3}>Log Out</MenuItem>
              </NavDropdown>
          </Nav>
        </Navbar>

        {this.props.children}
      </div>
    );
  }
}
