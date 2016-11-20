import React, { Component } from 'react';
import { Link } from 'react-router';
import { Header, List, Icon, Button } from 'semantic-ui-react';
import AdministratorTableAssociations from './administrator-table-associations';


export default class Administrator extends Component {
  render () {
    return (
      <div>
        <Header size='huge'>Administrator Dashboard</Header>
          <List celled>
            <List.Item>
              <List.Content floated='right'>
                <Button as={Link} to='/administrator/associations'>View All</Button>
              </List.Content>
              <Header as='h3'>
                <Icon name='university'/>
                {' '} Associations
               </Header>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                <Button as={Link} to='/administrator/students'>View All</Button>
              </List.Content>
              <Header as='h3'>
                <Icon name='user'/>
                {' '} Students
               </Header>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                <Button as={Link} to='/administrator/events'>View All</Button>
              </List.Content>
              <Header as='h3'>
                <Icon name='calendar'/>
                {' '} Events
               </Header>
            </List.Item>
          </List>
      </div>
    );
  }
}
