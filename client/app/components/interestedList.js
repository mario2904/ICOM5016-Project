import React, { Component } from 'react';
import GridList from './grid-list';
import InterestedListItem from './interestedList-ListItem'

export default class InterestedList extends Component {
  render () {
    return (
        <GridList items={this.props.interested} ListItem={InterestedListItem}/>
    );
  }
}

// For testing...
InterestedList.defaultProps = {
  interested: [
    {
      name: "Harambe",
      img: "http://media.comicbook.com/2016/08/harambe2-195980.jpg",
      id: "1"
    },
    {
      name: "Harambe",
      img: "http://media.comicbook.com/2016/08/harambe2-195980.jpg",
      id: "2"
    },
    {
      name: "Harambe",
      img: "http://media.comicbook.com/2016/08/harambe2-195980.jpg",
      id: "3"
    },
    {
      name: "Harambe",
      img: "http://media.comicbook.com/2016/08/harambe2-195980.jpg",
      id: "4"
    },
    {
      name: "Harambe",
      img: "http://media.comicbook.com/2016/08/harambe2-195980.jpg",
      id: "5"
    }
  ]
};
