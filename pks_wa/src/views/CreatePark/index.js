import React, {useState} from 'react';

import MapPutPin from '../../components/MapPutPin'
import FormTextField from '../../components/FormTextField'

const CreatePark = () => {

  const[marker,setMarker] = useState(null)

  function setLocation(childData){
    setMarker(childData)
  }

  return (
    <div className="row">
      <h1 className="col-6 offset-6">Crear Parqueadero</h1>
      
      <MapPutPin onLocationChange={setLocation}/>
    
      <div className="col-6 pt-5">
        <FormTextField name="Nombre" placeholder="Escriba el nombre del parqueadero" type="text"/>
        <FormTextField name="Cupos Totales" placeholder="Escriba Cupos Totales" type="number"/>
        <FormTextField name="Direccion" placeholder="Escriba su Direccion" type="text"/>
        <FormTextField name="hola" placeholder="Escriba su nombre" type="text"/>

      </div>
    </div>
  );
}


export default CreatePark;