import React, { Component } from 'react';

export default class MyUrlSearch extends Component {
  
  componentDidMount() {
    // is there a better way to go about this?
    // having this component just to past it the params, to trigger a search.
    // and sometimes you have to refresh for the results to be displayed
    // how do you save the results from searches so that they are accessible to browser back forward navigation?
    
    {/* search route, uses the mySearch param and gets the performSearch as params,
     passed to MyUrlSearch, MyUrlSearch triggers a search and replaces the state.photos with the new results.
     */}

    let myUrlSearch = this.props.match.params.mySearch;
    this.props.getPhotos(myUrlSearch)
    }
    
  
  render() {  
    return (
      <div className="photo-container">
      <ul>
      </ul>
    </div>
      );
  }
}
