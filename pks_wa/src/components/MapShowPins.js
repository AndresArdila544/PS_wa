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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DELETE_PARKING_BY_ID } from '../GraphQL/Mutations';
import { useMutation } from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const libraries = ["places"];

const center = {
    lat: 2.568449113657979,
    lng: -72.63973043023606
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}
const mapContainerStyle = {
    height: "89vh",
    width: "100%",
    border_radius: "15px",
};
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));



export default function MapShowPins(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PKS_GOOGLE_MAPS_API,
        libraries,
    })
    const history = useHistory()
    const classes = useStyles();
    var [markers, setMarkers] = React.useState([]);
    var [selected, setSelected] = React.useState(null)
    const sendOwnerOnClick = () => history.go('/InicioDueno');
    const [deletepark, { data, loading, error }] = useMutation(DELETE_PARKING_BY_ID, {
        onCompleted: (data) => {
            sendOwnerOnClick()
        },
        onError: (error) => {
            console.log("error cant delete parking")
        }

    });
    if (loading) return (
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );




    markers = props.obtainLocations()

    const deleteParking = async (id) => {
        await deletepark({
            variables: {
                id: parseInt(id)
            },

        });
    }

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
                        icon={info[3]==='Mantener'?{
                            url: '/pinverde.png',
                            scaledSize: new window.google.maps.Size(16, 16),
                        }:{
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
                                            <Link to={`/ParkingDetail/${selected[0]}`}
                                                style={{ textDecoration: "none", color: "inherit" }}
                                                className="watchbtn">
                                                <Button >
                                                    Ver Luminaria
                                                </Button>
                                            </Link>

                                            {localStorage.getItem('LoggedOwner') === "true" ?
                                                <Link to={'/InicioDueno'}
                                                    style={{ textDecoration: "none", color: "inherit" }}
                                                    className="deleteicon"
                                                >
                                                    <IconButton
                                                        onClick={(event) => { event.stopPropagation(); deleteParking(selected.id) }}>
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                </Link>
                                                :
                                                null
                                            }
                                        </div>


                                    </div>

                                </InfoWindow>
                            ) : null
                        }
                    </Marker>

                ))};
                {/* {selected ? (
                                <InfoWindow
                                    
                                    onCloseClick={() => {
                                        setSelected(null);
                                    }}

                                >
                                    <div>
                                        <h2>{selected.name}</h2>
                                        <h5>{selected.address}</h5>
                                        <Link to={`/ParkingDetail/${selected.id}`}>
                                            <Button >
                                                Ver Parqueadero
                                            </Button>
                                        </Link>
                                        
                                        {localStorage.getItem('LoggedOwner') === "true" ? 
                                            <Link to={'/InicioDueno'}>
                                                <button 
                                                    onClick={(event) => {event.stopPropagation();deleteParking(selected.id)}}>
                                                    Eliminar Parqueadero
                                                </button>
                                            </Link>
                                        :
                                            null
                                        }
                                        
                                        
                                        
                                    </div>
                                    
                                </InfoWindow>
                    ) : null} */}




            </GoogleMap>
        </div>
    );

}
