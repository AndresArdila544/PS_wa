import React from 'react';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import mapStyles from '../styles/mapStyles'


const libraries = ["places"];
const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };
const center = {
    lat: 4.710989,
    lng: -74.072090
};
const options = {
    styles:mapStyles,
    disableDefaultUI: true,
    zoomControl:true,
}



export default function MapPutPin(props) {



    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PKS_GOOGLE_MAPS_API,
        libraries,
    })
    const [marker, setMarker] = React.useState([]);

    
    
    
    
    const onMapClick = React.useCallback((event) => {
        setMarker(
            (current) => [{
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            }]
        )
        props.onLocationChange({lat:event.latLng.lat(),lng: event.latLng.lng()})
        
    }, [])


    if (loadError) return "Error loading Maps"
    if (!isLoaded) return "Loading Maps"

    

    return (
        <div>
            Map Pin Component
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={center}
                options={options}
                onClick={onMapClick}
                >
                    {marker.map((info)=>(
                        <Marker
                            key={`${marker.lat}-${marker.lng}`}
                            position={{lat: parseFloat(info.lat), lng: parseFloat(info.lng)}}
                            icon = {{
                                url: '/Park_pin.svg',
                                scaledSize: new window.google.maps.Size(25, 25),
                            }}
                            
                        />

                    ))};
                 
                    
                    
                    
            </GoogleMap>
        </div>
    );
}

