import React from 'react';
import MapParkingDetails from '../../components/MapParkingDetails'
import { useQuery } from '@apollo/client'
import { GET_PARKING_BY_ID } from '../../GraphQL/Querys';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import LocalParkingIcon from '@material-ui/icons/LocalParking';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

//import "../../App.css";

const axios = require('axios')
const url = `http://localhost:8080/ApiRest/Luminary/`
var lat = 0;
var long = 0;
export default function ParkingView(props) {
  const { id } = props.match.params
  //AXIOS
  const [isLoading, setLoading] = React.useState(true);
  const [luminary, setLuminary] = React.useState();
  const [location, setLocation] = React.useState();

  React.useEffect(() => {
    axios.get(`${url}${parseInt(id)}`).then(response => {

      setLuminary(response.data);

      setLoading(false);
    });
  }, []);
  //AXIOS
  //AXIOS
  if (isLoading) {
    return <div>
      <CircularProgress color="inherit" />
    </div>;
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 400,
    },
  });


  return (
    <div className="row col-12">
      <div className="col-6">
        <MapParkingDetails location={{ lat: luminary.latitude, lng: luminary.longitude }} />
      </div>
      <div className="col-6">
        <h1 className="col-12">Luminaria #{luminary.idLuminary}</h1>
        <div className={useStyles.demo}>
          <List dense={false}>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText disableTypography="true" primary={<h5>Longitud: {luminary.longitude} </h5>} />
              <ListItemText disableTypography="true" primary={<h5>Latitud: {luminary.latitude} </h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Direccion: {luminary.address} </h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Barrio: {luminary.neighborhood}</h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Sector: {luminary.sector}</h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Potencia: {luminary.power}w</h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Longitud de brazo: {luminary.arm_length}m</h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Tecnología: {luminary.tecnology}</h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Control: {luminary.control}</h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Estado: {luminary.state}</h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Acción: {luminary.action}</h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Dia registro: {luminary.date}</h5>} />
            </ListItem>
            <h3>Poste #{luminary.idLampost.idLampost}</h3>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Tipo: {luminary.idLampost.type}</h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Material: {luminary.idLampost.material}</h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Altura: {luminary.idLampost.length}m</h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Tipo de infraestructura: {luminary.idLampost.infraType}</h5>} />
            </ListItem>
            <ListItem>
              <ListItemText disableTypography="true" primary={<h5>Tipo de red: {luminary.idLampost.network}</h5>} />
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
}
