import React, { useState } from 'react';
import axios from 'axios'
import MapParkingDetails from '../../components/MapParkingDetails'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import FormTextField from '../../components/FormTextField'
import { useHistory, Link } from 'react-router-dom'
import "react-widgets/styles.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeUpdateLuminary } from '../../API/api';
const url2 = `http://localhost:8080/ApiRest/Luminary/`

export default function EditLuminaryView(props) {
  const { id } = props.match.params
  //AXIOS
  const [isLoading, setLoading] = React.useState(true);
  const [luminary, setLuminary] = React.useState();

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
  const [date, setDate] = useState("");
  const history = useHistory();

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

  //AXIOS
  React.useEffect(() => {
    axios.get(`${url2}${parseInt(id)}`).then(response => {
      setLuminary(response.data);
      setLatitude(response.data.latitude);
      setLongitude(response.data.longitude);
      setIdLampost(response.data.idLampost.idLampost);
      setTechnology(response.data.technology);
      setPower(response.data.power);
      setNeighborhood(response.data.neighborhood);
      setAddress(response.data.address);
      setType(response.data.type);
      setArm_length(response.data.arm_length);
      setSector(response.data.sector);
      setState(response.data.state);
      setAction(response.data.action);
      setControl(response.data.control);
      setDate(response.data.date);
      setLoading(false);
    });
  }, []);

  //const sendClientOnClick = () => history.go('/InicioDueno');

  const editLuminary = () => {
    let luminaryPost = {
      idLuminary: luminary.idLuminary,
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
      date:date
    }
    console.log("lumninaria:")
    console.log(luminaryPost);
    makeUpdateLuminary(luminaryPost);
  }



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
      <h1 className="col-12">Editando Luminaria #{luminary.idLuminary}</h1>
      <div className="col-5 pt-3">
        <div className="row">
          <div className="col-6">
            <p>Longitud: {luminary.longitude} </p>
            <FormTextField name="Tecnología" placeholder="Tecnología" type="text" value={technology} onChange={(nextValue) => setTechnology(nextValue)} parentCallback={technologyCallbackFunction} />
            <FormTextField name="Poder" placeholder="Poder" type="text" value={power} parentCallback={powerCallbackFunction} />
            <FormTextField name="Barrio" placeholder="Barrio" type="text" value={neighborhood} parentCallback={neighborhoodCallbackFunction} />
            <FormTextField name="Dirección" placeholder="Dirección" type="text" value={addressDB} parentCallback={addressCallbackFunction} />
            <FormTextField name="Tipo" placeholder="Tipo" type="text" value={type} parentCallback={typeCallbackFunction} />
            <p className="col-12">Fecha registro: {luminary.date}</p>
          </div>
          <div className="col-6">
            <p>Latitud: {luminary.latitude} </p>
            <FormTextField name="Longitud de brazo" placeholder="En metros" type="text" value={arm_length} parentCallback={arm_lengthCallbackFunction} />
            <FormTextField name="Sector" placeholder="Sector" type="text" value={sector} parentCallback={sectorCallbackFunction} />
            <FormTextField name="Estado" placeholder="Estado" type="text" value={state} parentCallback={stateCallbackFunction} />
            <FormTextField name="Acción" placeholder="Acción" type="text" value={action} parentCallback={actionCallbackFunction} />
            <FormTextField name="Control" placeholder="Control" type="text" value={control} parentCallback={controlCallbackFunction} />
          </div>
        </div>
      </div>
      <div className="col-7">
      <MapParkingDetails location={{ lat: luminary.latitude, lng: luminary.longitude }} />
        <div className="col-7 offset-5 pt-4">
          <Link to={'/Inicio'}>
            <Button
              variant="contained"
              color="error"
              backgroundColor="#000"
              size="large"
              className="col-12"
              startIcon={<SaveIcon />}
              onClick={editLuminary}
            >
              Guardar Luminaria
            </Button></Link>
        </div>
      </div>
    </div>
  );
}
