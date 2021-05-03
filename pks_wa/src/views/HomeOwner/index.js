import React, { Component } from 'react';
import { useQuery} from "@apollo/client";
import { GET_PARKINGS_BY_HOME_OWNER_ID  } from '../../GraphQL/Querys';

import MapShowPins from '../../components/MapShowPins'





export default function Home (props) {
    
    const {data,loading} = useQuery(GET_PARKINGS_BY_HOME_OWNER_ID,{variables:{id:parseInt(localStorage.getItem('LoggedId'))}})
    
    if (loading) return 'Loading...';
    
    function getlocations () {
       return data.par_getParkingByIdPluLoc
    }




    return (
      <div>
        <h1>HomeOwner View</h1>
        <MapShowPins obtainLocations={getlocations} />
        
      </div>
    );
  
}
