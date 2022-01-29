import React from 'react';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import mapStyles from '../styles/mapStyles'
import { Link, useHistory } from 'react-router-dom';
import "../App.css";
import Button from '@material-ui/core/Button';
const libraries = ["places"];

const center = {
    lat: 2.568449113657979,
    lng: -72.63973043023606
};

const options = {
    styles: mapStyles,
    mapTypeId: 'hybrid',
    disableDefaultUI: true,
    zoomControl: true,
}
const mapContainerStyle = {
    height: "89vh",
    width: "100%",
    border_radius: "15px",
};


export default function MapShowPins(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PKS_GOOGLE_MAPS_API,
        libraries,
    })
    const history = useHistory()
    var [markers, setMarkers] = React.useState([]);
    var [selected, setSelected] = React.useState(null)

    markers = props.obtainLocations()

    if (loadError) return "Error loading Maps"
    if (!isLoaded) return "Loading Maps"
    return (
        <div>
            <div className="box">
                {localStorage.getItem('LoggedOwner') === "true" ?
                    <h1 className="Titulo"></h1>
                    :
                    <h1 className="Titulo"></h1>
                }</div>
            <GoogleMap
                id="map"
                style={{ borderRadius: "300px" }}
                mapContainerStyle={mapContainerStyle}
                mapTypeId='hybrid'
                zoom={15}
                center={center}
                options={options}
                onClick={() => {
                    setSelected(null)
                }}
            >
                {markers.map((info) => (
                    <Marker
                        key={parseInt(info[0])}
                        position={{ lat: parseFloat(info[1]), lng: parseFloat(info[2]) }}
                        icon={info[3] === 'Mantener' ? {
                            url: '/pinverde.png',
                            scaledSize: new window.google.maps.Size(16, 16),
                        } : {
                            url: '/pinrojo.png',
                            scaledSize: new window.google.maps.Size(16, 16),
                        }}

                        onClick={() => {
                            setSelected(info)
                        }}
                    >
                        {
                            selected === info ? (
                                <InfoWindow

                                    onCloseClick={() => {
                                        setSelected(null);
                                    }}
                                    className=""
                                >
                                    <div>
                                        <h2>Luminaria #{selected[0]}</h2>
                                        <div className="divbtns">
                                            <Link to={`/LuminaryView/${selected[0]}`}
                                                style={{ textDecoration: "none", color: "inherit" }}
                                                className="watchbtn">
                                                <Button >
                                                    Ver Luminaria
                                                </Button>
                                            </Link>
                                        </div>


                                    </div>

                                </InfoWindow>
                            ) : null
                        }
                    </Marker>

                ))};
            </GoogleMap>
        </div>
    );

}
