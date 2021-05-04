import React from 'react';
import MapParkingDetails from '../../components/MapParkingDetails'
import { useQuery} from '@apollo/client'
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

import LocalParkingIcon from '@material-ui/icons/LocalParking';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

//import "../../App.css";

const ParkingView = (props) => {
  const { id } = props.match.params

  const { data, loading } = useQuery(GET_PARKING_BY_ID, {
    variables: {
      id: parseInt(id)
    }
  });

  if (loading) return <li>Loading ...</li>;

  const location = {
    lat: data.par_getParkingByIdLoc.location.latitude,
    lng: data.par_getParkingByIdLoc.location.longitude
  }
  const parking = data.par_getParkingByIdLoc;

  const useStyles = makeStyles({
    table: {
      minWidth: 400,
    },
  });

  return (
    <div className="row col-12">
      <div className="col-6">
        <MapParkingDetails location={location} />
      </div>
      <div className="col-6">
        <h1 className="col-12">{parking.name}</h1>
        <div className={useStyles.demo}>
            <List dense={false}>
            <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText disableTypography="true" primary={<h5>{parking.address}</h5>}/>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText disableTypography="true" primary={<h5>{parking.pricePerMinute}/min</h5>}/>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocalParkingIcon />
                  </ListItemIcon>
                  <ListItemText disableTypography="true" primary={<h5>Cupos totales: {parking.totalSpaces}</h5>}/>
                </ListItem>
            </List>
          </div>
        {parking.openHours[0] ? (<>
          <div className="col-12">
            <TableContainer component={Paper}>
              <Table className={useStyles.table} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left"><h5>Dia</h5></TableCell>
                    <TableCell align="left"><h5>Horario</h5></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left"><h6>Lunes</h6></TableCell>
                    <TableCell align="left"><h6>{parking.openHours[0].opening} - {parking.openHours[0].closing}</h6></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left"><h6>Martes</h6></TableCell>
                    <TableCell align="left"><h6>{parking.openHours[1].opening} - {parking.openHours[1].closing}</h6></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left"><h6>Miércoles</h6></TableCell>
                    <TableCell align="left"><h6>{parking.openHours[2].opening} - {parking.openHours[2].closing}</h6></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left"><h6>Jueves</h6></TableCell>
                    <TableCell align="left"><h6>{parking.openHours[3].opening} - {parking.openHours[3].closing}</h6></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left"><h6>Viernes</h6></TableCell>
                    <TableCell align="left"><h6>{parking.openHours[4].opening} - {parking.openHours[4].closing}</h6></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left"><h6>Sabado</h6></TableCell>
                    <TableCell align="left"><h6>{parking.openHours[5].opening} - {parking.openHours[5].closing}</h6></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left"><h6>Domingo</h6></TableCell>
                    <TableCell align="left"><h6>{parking.openHours[6].opening} - {parking.openHours[6].closing}</h6></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>) : null}
      </div>
    </div>
  );
}

export default ParkingView;