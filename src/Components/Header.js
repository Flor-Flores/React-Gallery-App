import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Nav from './Nav';

export default class Header extends Component {
    
  render() {  
    return (
      <React.Fragment>
        <SearchForm onSearch={this.props.getPhotos} info={this.props} />
        <Nav />
      </React.Fragment>
      );
  }
}
