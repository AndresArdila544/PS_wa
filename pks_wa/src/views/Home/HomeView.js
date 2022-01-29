import React from 'react';
import { useHistory} from 'react-router-dom'
import MapShowPins from '../../components/MapShowPins'

import CircularProgress from '@material-ui/core/CircularProgress';

const axios = require('axios')
const url = `http://localhost:8080/ApiRest/Luminary/`

export default function Home(props) {

  //AXIOS
  const [isLoading, setLoading] = React.useState(true);
  const [pokemon, setPokemon] = React.useState();
  const history = useHistory();
  React.useEffect(() => {
    axios.get(`${url}locations`).then(response => {
      setPokemon(response.data);
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
  //AXIOS
  function getlocations() {
    return pokemon
  }

  return (
    <div>
      {localStorage.getItem("LoggedId") ? null:<div>{history.push('/')}</div>}
      <MapShowPins obtainLocations={getlocations} />
    </div>
  );

}
