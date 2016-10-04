import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

import AssociationsSearchBar from './associations-search-bar';
import AssociationsListItem from './associations-list-item';
import GridList from './grid-list';

export default class Associations extends Component {
  renderAssociationsListItems (associations) {
    return associations.map((association) => {
      return <AssociationsListItem key={association.name} association={association} />;
    });
  }
  render () {
    return (
      <div>
        <PageHeader>Associations</PageHeader>
        <AssociationsSearchBar />
        <GridList items={this.props.associations} renderListItems={this.renderAssociationsListItems}/>
      </div>
    );
  }
}

// For testing...
Associations.defaultProps = {
  associations: [
    {
      initials: 'WIE',
      name: 'IEEE Women in Engineering - UPRM',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/1620402_678979328807039_689288368_n.png?oh=c6adf4b93a16348fba226e12967c533e&oe=58745346'
    },
    {
      initials: 'GK',
      name: 'UPRM Golden Key',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/257088_128567813892684_4897113_o.jpg'
    },
    {
      initials: 'HKN',
      name: 'IEEE Eta Kappa Nu - Lambda Tau Chapter',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/1617293_584946991590451_185988420_o.png'
    },
    {
      initials: 'IP',
      name: 'Idea Platform',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/11075167_628822830553054_4682981240345315035_n.png?oh=8c50c6447d46bf9d6a4d61f8974cf279&oe=58A3632B'
    },
    {
      initials: 'CAS',
      name: 'IEEE Circuits and Systems Society - UPRM',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/183118_193619493990036_1420352_n.jpg?oh=798eff36e082d94c33e887b37af9ca14&oe=58A3C9B9'
    },
    {
      initials: 'SHPE',
      name: 'Society of Hispanic Professional Engineers',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/1511592_794103793953169_1204815244615871931_n.png?oh=055f9de551f64f95a901ff880a6c5126&oe=58A573F7'
    },
    {
      initials: 'ACM-ECE',
      name: 'Association for Computing Machinery - Electrical and Computer Engineering Department',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/534293_720750617940260_16455008_n.png?oh=7b2782d5a89bb97f54f8f4340fbb641b&oe=5876855A'
    },
    {
      initials: 'NSPE',
      name: 'National Society of Professional Engineers - UPRM Chapter',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/13975419_1146447655422895_4142955561913595977_o.png'
    },
    {
      initials: 'IG',
      name: 'IncludeGirls - UPRM',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/13975419_1146447655422895_4142955561913595977_o.png'
    },
    {
      initials: 'HackUPRM',
      name: 'HackPR - UPRM Chapter',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/12891069_666961816777108_9186838969744859359_o.jpg'
    },
    {
      initials: 'ACM-BA',
      name: 'Association of Computer Machinery – College of Business Administration',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/14440967_1323900054295475_4978721172919437033_n.jpg?oh=55dbb3e6c5f0ad45e54e659e931056c9&oe=5872220B'
    },
    {
      initials: 'AIChE',
      name: 'American Institute of Chemical Engineers – CUPRM',
      img: 'http://engineering.uprm.edu/wp-content/uploads/2015/02/AiChE.jpg'
    },
    {
      initials: 'TBP-PRA',
      name: 'Tau Beta Pi - Puerto Rico Alpha',
      img: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/10635790_1405695263010619_50773097753679512_n.jpg?oh=36e735bc4675f0a006b98b4975e30d39&oe=585FC100'
    }
  ]
};
