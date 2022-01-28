import React from 'react';
import MapParkingDetails from '../../components/MapParkingDetails'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const axios = require('axios')
const url = `http://localhost:8080/ApiRest/Luminary/`
var lat = 0;
var long = 0;
export default function LuminaryView(props) {
  const { id } = props.match.params
  //AXIOS
  const [isLoading, setLoading] = React.useState(true);
  const [luminary, setLuminary] = React.useState();

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
