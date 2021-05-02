import React, { Component } from 'react';
import { useQuery} from "@apollo/client";
import { GET_PARKINGS, GET_LOCATION } from '../../GraphQL/Querys';

import MapShowPins from '../../components/MapShowPins'
import { set } from 'date-fns';




export default function Home (props) {
    
    const {data,loading} = useQuery(GET_PARKINGS)
    
    if (loading) return 'Loading...';

    console.log(data)
    function goToLocation (id,name){
      alert(`Voy al Parqueadero de ${name}`)
    }
    
    function getlocations () {
       return data.par_getParkingsLocation
    }



    
    
    /*function getlocation (id){
      get_locations({
        variables: {
          id: id,
        }
      })
    }*/

    //var locations = []

   
    
    //console.log(data2)


    
    

    return (
      <div>
        <h1>Home View</h1>
        <MapShowPins obtainLocations={getlocations} alert={goToLocation}/>
      </div>
    );
  
}
