import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import  MyUrlSearch from './Components/MyUrlSearch';
import Header from './Components/Header';
import PhotoList from './Components/PhotoList';

import apiKey from './config.js'

class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true,

    }
  }

  componentDidMount() {

    // this.performSearch();
    let search1 = "snail";
    let search2 = "dog";
    let search3 = "cat";

    let urlSearch1 = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search1}&per_page=12&format=json&nojsoncallback=1`;
    let urlSearch2 = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search2}&per_page=12&format=json&nojsoncallback=1`;
    let urlSearch3 = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search3}&per_page=12&format=json&nojsoncallback=1`;
    const requestOne = axios.get(urlSearch1);
    const requestTwo = axios.get(urlSearch2);
    const requestThree = axios.get(urlSearch3);
    
    axios.all([requestOne, requestTwo, requestThree])
    .then(axios.spread((...responses) => {
      const responseOne = responses[0].data.photos.photo;
      const responseTwo = responses[1].data.photos.photo;
      const responseThree = responses[2].data.photos.photo;
      // use/access the results 
      this.setState({
        snailPhotos: responseOne,
        dogPhotos: responseTwo,
        catPhotos: responseThree
      })
    })).catch(errors => {
      // react on errors.
    })
    
  }


  performSearch = (query ) =>{
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=12&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({ 
        photos: response.data.photos.photo,
        loading: false,
        query: query
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

  }


  render() {  
    return (
      <Router>
        <div className="container">
          <Route  path="/" render={(props) => <Header {...props}  getPhotos={this.performSearch}  />} />

          <Switch>

            <Route exact path="/#/search/cats" render={ () =>  <PhotoList  data={this.state.catPhotos} />} />            
            <Route exact path="/search/dogs" render={ () =>  <PhotoList  data={this.state.dogPhotos} />} />            
            <Route exact path="/search/snails" render={ () =>  <PhotoList  data={this.state.snailPhotos} />} />     
            <Route path="/search/:mySearch" render={(props) =>
              <React.Fragment> <MyUrlSearch {...props}  getPhotos={this.performSearch} /> <PhotoList data={this.state.photos} />  </React.Fragment> } />
                 
          </Switch>
        </div>
      </Router>
    );
  


  }  
}

export default App;
