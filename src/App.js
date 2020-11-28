import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import  MyUrlSearch from './Components/MyUrlSearch';
import Header from './Components/Header';
import PhotoList from './Components/PhotoList';
import PageNotFound from './Components/PageNotFound';

import apiKey from './config.js'

class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true,
    }
  }


  // Gets 3 different sets of photos and saves them into the state
  componentDidMount() {
    let search1 = "snail";
    let search2 = "dog";
    let search3 = "cat";
    let photoCount = 24;

    let urlSearch1 = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search1}&per_page=${photoCount}&format=json&nojsoncallback=1`;
    let urlSearch2 = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search2}&per_page=${photoCount}&format=json&nojsoncallback=1`;
    let urlSearch3 = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search3}&per_page=${photoCount}&format=json&nojsoncallback=1`;
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

//Uses query parameter to fetch images, saves to state.photos
  performSearch = (query ) =>{
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
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
      <Router >
        <div className="container">
          <Route   path="/" render={(props) => <Header {...props}  getPhotos={this.performSearch}  />} />

          <Switch>
            <Route  path="/search/cats" render={ () =>  <PhotoList title={"Cats"}  data={this.state.catPhotos} />} />            
            <Route exact path="/search/dogs" render={ () =>  <PhotoList title={"Dogs"}  data={this.state.dogPhotos} />} />            
            <Route exact path="/search/snails" render={ () =>  <PhotoList title={"snails"}  data={this.state.snailPhotos} />} />     
            {/* search route, uses the mySearch param and gets the performSearch as params, passed to MyUrlSearch, MyUrlSearch triggers a search and replaces the state.photos with the new results. Then PhotoList renders them. */}
            <Route path="/search/:mySearch" render={(props) =>
              <React.Fragment> 
                <MyUrlSearch {...props}  getPhotos={this.performSearch} /> 
                <PhotoList data={this.state.photos} title={this.state.query} />  
              </React.Fragment> } 
            />
            <Route>
                <PageNotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }  
}

export default App;
