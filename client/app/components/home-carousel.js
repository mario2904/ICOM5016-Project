import React, { Component } from 'react';
import { Button, PageHeader, Jumbotron,Carousel } from 'react-bootstrap';

import EventsSearchBar from './events-search-bar';
import GridList from './grid-list';
import EventsListItem from './events-list-item';

export default class HomeCarousel extends Component {
  constructor(){
    super();
    this.state ={index:0, direction: null};
    this.handleSelect = this.handleSelect.bind(this);
  }

 handleSelect(selectedIndex, e) {
   console.log(selectedIndex);
   console.log(e);
   //alert('selected=' + selectedIndex + ', direction =' + e.direction);
   this.setState({
     index: selectedIndex,
     direction: e.direction
   });
 }

 render() {
   return (
     <Carousel style={carouselStyle} activeIndex={this.state.index} direction={this.state.direction} onSelect={(i,e) => {this.handleSelect(i,e)}}>
       <Carousel.Item>
         <img width={900} height={500} alt="900x500" src="http://static.giantbomb.com/uploads/original/0/7888/351029-traverse_town2.jpg"/>
         <Carousel.Caption>
           <h3>First slide label</h3>
           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
         </Carousel.Caption>
       </Carousel.Item>
       <Carousel.Item>
         <img width={900} height={500} alt="900x500" src="http://d352ltojookjzf.cloudfront.net/wp-content/uploads/2013/12/15-icon-patterns.jpg"/>
         <Carousel.Caption>
           <h3>Second slide label</h3>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
         </Carousel.Caption>
       </Carousel.Item>
       <Carousel.Item>
         <img width={900} height={500} alt="900x500" src="http://az616578.vo.msecnd.net/files/2016/04/15/6359633929809316592035809433_stock%20market.jpg"/>
         <Carousel.Caption>
           <h3>Third slide label</h3>
           <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
         </Carousel.Caption>
       </Carousel.Item>
     </Carousel>
   );
 }
}

const carouselStyle={
  margin:"-100px 0px 0px 0px",
  padding:"0px 0px 0px 0px"
}
