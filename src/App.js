import './App.css';
import React, { Component } from 'react';

import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import PhotoList from './Components/PhotoList';

import data from './dataTest.json';

const CirclePhotosUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0ef5517bf8fc0b00125e1e5c1f257bc9&tags=circle&per_page=24&format=json&nojsoncallback=1';
class App extends Component {
  state = {
    photos: data.photos.photo,
    loading: true
  }

  render() {  
    // console.log(this.state.photos);
    console.log(this.state.photos)
    return (
      <div className="container">
      <p> {this.state.photos.length}</p>
        <SearchForm />
        <Nav />
        <PhotoList data={this.state.photos} />
        
      </div>
    );
  


  }  
}

export default App;
