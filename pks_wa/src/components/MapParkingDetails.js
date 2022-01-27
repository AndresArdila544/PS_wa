import React from 'react';

import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";
import mapStyles from '../styles/mapStyles'

const mapContainerStyle = {
    height: "89vh",
    width: "100%",
};

const options = {
    styles:mapStyles,
    disableDefaultUI: true,
    zoomControl:true,
}

export default function MapParkingDetails(props){

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PKS_GOOGLE_MAPS_API
    })

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);


    if(props===null){
        props = {location:{lng: 4.710989, lat: -74.072090 }}
    }

    if (loadError) return "Error loading Maps"
    if (!isLoaded) return "Loading Maps"
    const center = props.location;
    
    return (
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={18}
                center={center}
                options={options}
                onLoad={onMapLoad}
                >                    
                        <Marker
                            key={`${center.lat}-${center.lng}`}
                            position={{lat: parseFloat(center.lat), lng: parseFloat(center.lng)}}
                            icon = {{}}                            
                        />  
            </GoogleMap>
    );
}