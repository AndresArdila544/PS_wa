import React from 'react';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import mapStyles from '../styles/mapStyles'
import {Link, useHistory} from 'react-router-dom';
import "../App.css";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DELETE_PARKING_BY_ID } from '../GraphQL/Mutations';
import { useMutation } from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
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
    const [deletepark, { data, loading ,error }] = useMutation(DELETE_PARKING_BY_ID, {
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
            id:parseInt(id)
          },
    
        });
    }

    
    
    
    if (loadError) return "Error loading Maps"
    if (!isLoaded) return "Loading Maps"
    return (
        <div>
            <div className="box">
            {localStorage.getItem('LoggedOwner') === "true" ?
                <h1 className="Titulo">Mis Parqueaderos</h1>
            :
                <h1 className="Titulo">Parqueaderos disponibles</h1>
            }</div>
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
                    ) : null}
                 
                    
                    
                    
            </GoogleMap>
        </div>
    );

}
