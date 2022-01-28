import React, { useState } from 'react';
import axios from 'axios'
import MapPutPin from '../../components/MapPutPin'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import FormTextField from '../../components/FormTextField'
import { useHistory, Link } from 'react-router-dom'
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import {makePostLuminary} from '../../API/api';

const url = `http://localhost:8080/ApiRest/Lampost/`

export default function CreateLuminary(props) {
  //AXIOS
  const [isLoading, setLoading] = React.useState(true);
  const [pokemon, setPokemon] = React.useState();

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [technology, setTechnology] = useState("");
  const [power, setPower] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [addressDB, setAddress] = useState("");
  const [type, setType] = useState("");
  const [arm_length, setArm_length] = useState("");
  const [sector, setSector] = useState("");
  const [state, setState] = useState("");
  const [action, setAction] = useState("");
  const [control, setControl] = useState("");
  const [idLampost, setIdLampost] = useState(1);

  const [marker, setMarker] = useState(null)
  //const history = useHistory();
  
  const latitudeCallbackFunction = (childData) => {
    setLatitude(childData)
  }
  const longitudeCallbackFunction = (childData) => {
    setLongitude(childData)
  }
  const technologyCallbackFunction = (childData) => {
    setTechnology(childData)
  }
  const powerCallbackFunction = (childData) => {
    setPower(childData)
  }
  const neighborhoodCallbackFunction = (childData) => {
    setNeighborhood(childData)
  }
  const addressCallbackFunction = (childData) => {
    setAddress(childData)
  }
  const typeCallbackFunction = (childData) => {
    setType(childData)
  }
  const arm_lengthCallbackFunction = (childData) => {
    setArm_length(childData)
  }
  const sectorCallbackFunction = (childData) => {
    setSector(childData)
  }
  const stateCallbackFunction = (childData) => {
    setState(childData)
  }
  const actionCallbackFunction = (childData) => {
    setAction(childData)
  }
  const controlCallbackFunction = (childData) => {
    setControl(childData)
  }
  const idLampostCallbackFunction = (childData) => {
    setIdLampost(childData)
  }
  
  //AXIOS
  React.useEffect(() => {
    axios.get(`${url}ids`).then(response => {
      setPokemon(response.data);
      setLoading(false);
    });
  }, []);

  //const sendClientOnClick = () => history.go('/InicioDueno');

  const createLuminary = () => {
    let luminary = {
      power: power,
      latitude: latitude,
      longitude: longitude,
      neighborhood: neighborhood,
      address: addressDB,
      type: type,
      arm_length: arm_length,
      sector: sector,
      state: state,
      action: action,
      control: control,
      technology: technology,
      idLampost: idLampost,
    }
    console.log("lumninaria:")
    console.log(luminary);
    makePostLuminary(luminary);
  }

  var address = null
  function setLocation(childData) {
    setMarker(childData)
    setLatitude(childData.lat)
    setLongitude(childData.lng)
  }

  //AXIOS
  if (isLoading) {
    return <div>
      <CircularProgress color="inherit" />
    </div>;
  }
  return (
    <div className="row">
      <h1 className="col-12">Registrar Luminaria</h1>
      <div className="col-5 pt-3">
        <div className="row">
          <div className="col-6">
            <FormTextField name="Latitud" placeholder="Latitud" type="number" value={latitude} parentCallback={latitudeCallbackFunction} />
            <FormTextField name="Tecnología" placeholder="Tecnología" type="text" parentCallback={technologyCallbackFunction} />
            <FormTextField name="Poder" placeholder="Poder" type="text" parentCallback={powerCallbackFunction} />
            <FormTextField name="Barrio" placeholder="Barrio" type="text" parentCallback={neighborhoodCallbackFunction} />
            <FormTextField name="Dirección" placeholder="Dirección" type="text" value={address} parentCallback={addressCallbackFunction} />
            <FormTextField name="Tipo" placeholder="Tipo" type="text" parentCallback={typeCallbackFunction} />
          </div>
          <div className="col-6">
            <FormTextField name="Longitud" placeholder="Longitud" type="number" value={longitude} parentCallback={longitudeCallbackFunction} />
            <FormTextField name="Longitud de brazo" placeholder="En metros" type="text" parentCallback={arm_lengthCallbackFunction} />
            <FormTextField name="Sector" placeholder="Sector" type="text" parentCallback={sectorCallbackFunction} />
            <FormTextField name="Estado" placeholder="Estado" type="text" parentCallback={stateCallbackFunction} />
            <FormTextField name="Acción" placeholder="Acción" type="text" parentCallback={actionCallbackFunction} />
            <FormTextField name="Control" placeholder="Control" type="text" parentCallback={controlCallbackFunction} />
          </div>
          <h5>
            Asociar con poste
          </h5>
          <DropdownList
            value={idLampost}
            onChange={(nextValue) => setIdLampost(parseInt(nextValue))}
            data={pokemon}
          />
        </div>
      </div>
      <div className="col-7">
        <MapPutPin onLocationChange={setLocation} />
        <div className="col-7 offset-5 pt-4">
          <Link to={'/Inicio'}>
            <Button
              variant="contained"
              color="error"
              backgroundColor="#000"
              size="large"
              className="col-12"
              startIcon={<SaveIcon />}
              onClick={createLuminary}
            >
              Guardar Luminaria
            </Button></Link>
        </div>
      </div>
    </div>
  );
}
