const Photo = props => (
  <li className="photo-wrap">
    <img src={props.url} alt={props.title} />
    <em className="photo-caption">{props.title}</em>
  </li>

);

export default Photo;



