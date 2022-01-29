import React from 'react';
import "../App.css";
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";

import mapStyles from '../styles/mapStyles'


const libraries = ["places"];
const mapContainerStyle = {
    height: "500px",
    width: "100%",
};
const center = {
    lat: 2.568449113657979,
    lng: -72.63973043023606
};
const options = {
    styles:mapStyles,
    mapTypeId: 'hybrid',
    disableDefaultUI: true,
    zoomControl:true,
}



export default function MapPutPin(props) {



    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PKS_GOOGLE_MAPS_API,
        libraries,
    })
    const [marker, setMarker] = React.useState([]);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);
    
    
    
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
        <div className="col-12 pt-3">
            
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                mapTypeId= 'hybrid'
                zoom={13}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
                >
                    {marker.map((info)=>(
                        <Marker
                            key={`${marker.lat}-${marker.lng}`}
                            position={{lat: parseFloat(info.lat), lng: parseFloat(info.lng)}}
                            icon = {{
                                url: '/pinverde.png',
                                scaledSize: new window.google.maps.Size(50, 50),
                            }}
                            
                        />

                    ))};
                 
                    
                    
                    
            </GoogleMap>
        </div>
    );
}

