import React from 'react';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

import Search from './Search'
import mapStyles from '../styles/mapStyles'


const libraries = ["places"];
const mapContainerStyle = {
    height: "100%",
    width: "100%",
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
        <div className="col-6">
            <Search panTo={panTo}/>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
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
                                url: '/Park_pin.svg',
                                scaledSize: new window.google.maps.Size(50, 50),
                            }}
                            
                        />

                    ))};
                 
                    
                    
                    
            </GoogleMap>
        </div>
    );
}

