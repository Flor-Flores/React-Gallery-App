import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="page-not-found" >
      <h3>Looks like this page does not exists</h3>
      <p>Do another search using the Search Form above</p>
      <p>Or get page <NavLink to="/search/clown"> surprise search! </NavLink> </p>
      <h1>  ¯\_(ツ)_/¯ </h1>
    </div>

  )
}

export default PageNotFound;