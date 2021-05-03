import React from 'react';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import mapStyles from '../styles/mapStyles'
import {Link} from 'react-router-dom';
const libraries = ["places"];

const center = {
    lat: 4.710989,
    lng: -74.072090
};
const options = {
    styles:mapStyles,
    disableDefaultUI: true,
    zoomControl:true,
}
const mapContainerStyle = {
    height: "100vh",
    width: "100%",
    border_radius: "15px",
};



export default function MapShowPins(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PKS_GOOGLE_MAPS_API,
        libraries,
    })

    var [markers, setMarkers] = React.useState([]);
    var [selected, setSelected] = React.useState(null)
    
    const onMarkerClick = (evt,id,name) => {
       
    };

    markers = props.obtainLocations()
    
    
    
    if (loadError) return "Error loading Maps"
    if (!isLoaded) return "Loading Maps"
    return (
        <div >
            Map Show parks Component
            <GoogleMap
                id="map"
                style={{borderRadius:"300px"}}
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={center}
                options={options}
                onClick={() => {
                    setSelected(null)
                }}
                >
                    {markers.map((info)=>(
                        <Marker
                            key={`${info.location.latitude}-${info.location.longitude}`}
                            position={{lat: parseFloat(info.location.latitude), lng: parseFloat(info.location.longitude)}}
                            icon = {{
                                url: '/Pin.svg',
                                scaledSize: new window.google.maps.Size(70, 70),
                            }}
                            onClick={() => {
                                setSelected(info)
                            }}  
                        />

                    ))};
                    {selected ? (
                                <InfoWindow
                                    position={{ lat: selected.location.latitude, lng: selected.location.longitude }}
                                    onCloseClick={() => {
                                        setSelected(null);
                                    }}

                                >
                                    <div>
                                        <p>{selected.name}</p>
                                        <p>{selected.address}</p>
                                        <Link to={`/ParkingDetail/${selected.id}`}>
                                            <button>Ver Parqueadero</button>
                                        </Link>
                                        
                                    </div>
                                    
                                </InfoWindow>
                    ) : null}
                 
                    
                    
                    
            </GoogleMap>
        </div>
    );

}
