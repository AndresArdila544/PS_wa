import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MapShowPins from '../../components/MapShowPins'

import CircularProgress from '@material-ui/core/CircularProgress';

const axios = require('axios')
const url = `http://localhost:8080/ApiRest/Luminary/`

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));






export default function Home(props) {

  //AXIOS
  const [isLoading, setLoading] = React.useState(true);
  const [pokemon, setPokemon] = React.useState();
  React.useEffect(() => {
    axios.get(`${url}locations`).then(response => {
      setPokemon(response.data);
      setLoading(false);
    });
  }, []);
  //AXIOS


  const classes = useStyles();

  //AXIOS
  if (isLoading) {
    return <div>
      <CircularProgress color="inherit" />
    </div>;
  }
  //AXIOS
  function getlocations() {
    return pokemon
  }

  return (
    <div>
      <MapShowPins obtainLocations={getlocations} />
    </div>
  );

}
