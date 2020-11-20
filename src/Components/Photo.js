import react from 'react';

const Photo = props => (
  <li className="photo-wrap">
    <img src={props.url} alt="{props.description}" />
  </li>

);

export default Photo;



