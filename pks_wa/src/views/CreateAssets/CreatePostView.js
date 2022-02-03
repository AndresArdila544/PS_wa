import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import FormTextField from '../../components/FormTextField'
import { useHistory, Link } from 'react-router-dom'
import "react-widgets/styles.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import {makePostPost} from '../../API/api';

const axios = require('axios');
const url = `https://liaterap-back.herokuapp.com/ApiRest/Lampost/`



export default function CreatePost(props) {

  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [length, setLength] = useState("");
  const [infraType, setInfraType] = useState("");
  const [network, setNetwork] = useState("");
  const [isLoading, setLoading] = React.useState(true);
  const [pokemon, setPokemon] = React.useState();
  const history = useHistory();

  const typeCallbackFunction = (childData) => {
    setType(childData)
  }
  const materialCallbackFunction = (childData) => {
    setMaterial(childData)
  }
  const lengthCallbackFunction = (childData) => {
    setLength(childData)
  }
  const infraTypeCallbackFunction = (childData) => {
    setInfraType(childData)
  }
  const infraNetworkCallbackFunction = (childData) => {
    setNetwork(childData)
  }
  //AXIOS
  
  React.useEffect(() => {
    axios.get(`${url}last`).then(response => {
      setPokemon(response.data);
      setLoading(false);
    });
  }, []);

  const sendClientOnClick = () => history.go('/InicioDueno');

  const createPost=()=>{
    let post={
      idLampost:pokemon+1,
      type:type,
      material:material,
      length:length,
      infraType:infraType,
      network:network
    }
    console.log("poste:")
    console.log(post);
    makePostPost(post);
  }
  
  
  //AXIOS

   //AXIOS
   if (isLoading) {
    return <div>
      <CircularProgress color="inherit" />
    </div>;
  }

  return (
    <div className="row">
      {localStorage.getItem("LoggedId") ? null:<div>{history.push('/')}</div>}
      {localStorage.getItem("LoggedAdmin") === "false" ? <div>{history.push('/Inicio')}</div>:null}
      <h1 className="col-12 offset-3 ">Registrar Poste</h1>
      <div className="col-5 offset-3 pt-3">
        <h5>Registrando poste con ID: {parseInt(pokemon)+1}</h5>
        <FormTextField name="Tipo" placeholder="Tipo" type="text" parentCallback={typeCallbackFunction} />
        <FormTextField name="Material" placeholder="Material" type="text" parentCallback={materialCallbackFunction} />
        <FormTextField name="Altura" placeholder="Altura en metros" type="text" parentCallback={lengthCallbackFunction} />
        <FormTextField name="Tipo de infraestructura" placeholder="Tipo de infraestructura" type="text" parentCallback={infraTypeCallbackFunction} />
        <FormTextField name="Tipo de red" placeholder="Tipo de red" type="text" parentCallback={infraNetworkCallbackFunction} />
        <Link to={'/Inicio'}>
            <Button
              variant="contained"
              color="error"
              backgroundColor="#000"
              size="large"
              className="col-12"
              
              startIcon={<SaveIcon />}
              onClick={createPost}
            >
              Guardar Poste
            </Button></Link>
      </div>
      <div className="col-7  pt-4">
          
        </div>
    </div>

  );
}
