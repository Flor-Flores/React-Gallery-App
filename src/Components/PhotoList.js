import Photo from './Photo';
import NotFound from './NotFound';

const PhotoList = props => {
  const results = props.data;
  if(props.getPhotos){alert("i can get the photos! for " + props.myQuery)}
  console.log(props.getPhotos)
  console.log(results);
  let photos;
  if (results.length > 0 ){
      photos = results.map(photo => <Photo key={photo.id} url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />)

  }else {
    photos = <NotFound />
  }
  return (

  <div className="photo-container">
    <h2>Results</h2>
    <h1>{props.title}</h1>
    <ul>
      {photos}
    </ul>
  </div>
  )
}

export default PhotoList;

