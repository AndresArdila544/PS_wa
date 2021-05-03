import React, { Component } from 'react';
import { useQuery} from "@apollo/client";
import { GET_PARKINGS_BY_HOME_OWNER_ID  } from '../../GraphQL/Querys';

import MapShowPins from '../../components/MapShowPins'
import { set } from 'date-fns';




export default function Home (props) {
    
    const {data,loading} = useQuery(GET_PARKINGS_BY_HOME_OWNER_ID,{variables:{id:parseInt(localStorage.getItem('LoggedId'))}})
    
    if (loading) return 'Loading...';

    console.log(data)
    function goToLocation (id,name){
      alert(`Voy al Parqueadero de ${name}`)
    }
    
    function getlocations () {
       return data.par_getParkingByIdPluLoc
    }




    return (
      <div>
        <h1>HomeOwner View</h1>
        <MapShowPins obtainLocations={getlocations} alert={goToLocation}/>
        
      </div>
    );
  
}
