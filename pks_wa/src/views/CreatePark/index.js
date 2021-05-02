import React, {useState} from 'react';

import MapPutPin from '../../components/MapPutPin'


const CreatePark = () => {

  const[marker,setMarker] = useState(null)

  function setLocation(childData){
    setMarker(childData)
  }

  return (
    <div>
      <h1>CreatePark View</h1>
      
      <MapPutPin className="col-5" onLocationChange={setLocation}/>
    </div>
  );
}


export default CreatePark;