import React, {useState} from 'react';
import MapParkingDetails from '../../components/MapParkingDetails'
import {useQuery,useLazyQuery} from '@apollo/client'
import { GET_PARKING_BY_ID } from '../../GraphQL/Querys';
import {useParams} from 'react-router-dom';

const ParkingView = (props) => {
  const {id} = props.match.params
  //const [getParking,{data,loading}] = useLazyQuery(GET_PARKING_BY_ID);
  const {data,loading} = useQuery(GET_PARKING_BY_ID, {variables:{
    id: parseInt(id)
  }});

  if (loading) return <p>Loading ...</p>;
  console.log(data);
  //No se porque se deben poner al reves 🤷‍♂️
  const location = {    
    lat: data.par_getParkingByIdLoc.location.longitude,
    lng: data.par_getParkingByIdLoc.location.latitude
  } 
  const parking = data.par_getParkingByIdLoc;

  return (
    <div className="row">      
      <div className="col-6">
        <MapParkingDetails location={location} />
      </div>
      <div className="col-6">
        <h1 className="col-6">{parking.name}</h1>
        <h3 className="col-6">{parking.address}</h3>
        <h3 className="col-6">Precio por minuto: ${parking.pricePerMinute}</h3>
        <h3 className="col-6">Cupos totales: {parking.totalSpaces}</h3>
        <h3 className="col-6">Horario:</h3>
        {parking.openHours[0] ? (<><text className="col-6"> Lunes: {parking.openHours[0].opening} - {parking.openHours[0].closing} </text>
        <p><text className="col-6">Lunes: {parking.openHours[0].opening} - {parking.openHours[0].closing} </text>
        <text className="col-6">Martes: {parking.openHours[1].opening} - {parking.openHours[1].closing} </text></p>
        <p><text className="col-6">Miercoles: {parking.openHours[2].opening} - {parking.openHours[2].closing} </text>
        <text className="col-6">Jueves: {parking.openHours[3].opening} - {parking.openHours[3].closing} </text></p>
        <p><text className="col-6">Viernes: {parking.openHours[4].opening} - {parking.openHours[4].closing} </text>
        <text className="col-6">Sabado: {parking.openHours[5].opening} - {parking.openHours[5].closing} </text></p>
        <text className="col-6">Domingo: {parking.openHours[6].opening} - {parking.openHours[6].closing} </text>
        </>):null}
        
      </div>
    </div>
  );
}

export default ParkingView;