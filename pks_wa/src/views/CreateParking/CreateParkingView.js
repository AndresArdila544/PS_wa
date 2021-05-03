import React, {useState} from 'react';
import axios from 'axios'
import MapPutPin from '../../components/MapPutPin'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import FormTextField from '../../components/FormTextField'
import TimePicker from '../../components/TimePicker'
import { useMutation } from "@apollo/client";
import { CREATE_PARKING_MUTATION } from '../../GraphQL/Mutations';
import { useHistory, Link } from 'react-router-dom'



const CreatePark = () => {

  const[name, setName] = useState("");
  const[direccion, setdireccion] = useState("");
  const[totalSpaces, settotalSpaces] = useState(0);
  const[pricePerMinute, setpricePerMinute] = useState(0);
  const[openHoursOM, setopenHoursOM] = useState("00:00");
  const[openHoursCM, setopenHoursCM] = useState("00:00");
  const[openHoursOT, setopenHoursOT] = useState("00:00");
  const[openHoursCT, setopenHoursCT] = useState("00:00");
  const[openHoursOW, setopenHoursOW] = useState("00:00");
  const[openHoursCW, setopenHoursCW] = useState("00:00");
  const[openHoursOTH, setopenHoursOTH] = useState("00:00");
  const[openHoursCTH, setopenHoursCTH] = useState("00:00");
  const[openHoursOF, setopenHoursOF] = useState("00:00");
  const[openHoursCF, setopenHoursCF] = useState("00:00");
  const[openHoursOS, setopenHoursOS] = useState("00:00");
  const[openHoursCS, setopenHoursCS] = useState("00:00");
  const[openHoursOSU, setopenHoursOSU] = useState("00:00");
  const[openHoursCSU, setopenHoursCSU] = useState("00:00");
  const[marker,setMarker] = useState(null)
  const history = useHistory();

  const nameCallbackFunction = (childData) => {
    setName(childData)
  }
  const direccionCallbackFunction = (childData) => {
    setdireccion(childData)
  }
  const totalSpacesCallbackFunction = (childData) => {
    settotalSpaces(parseInt(childData))
  }
  const pricePerMinuteCallbackFunction = (childData) => {
    setpricePerMinute(parseInt(childData))
  }
  
  //States for opening and closing hours
  const openHoursOMCallbackFunction = (childData) => {
    setopenHoursOM(childData)
  }
  const openHoursCMCallbackFunction = (childData) => {
    setopenHoursCM(childData)
  }
  const openHoursOTCallbackFunction = (childData) => {
    setopenHoursOT(childData)
  }
  const openHoursCTCallbackFunction = (childData) => {
    setopenHoursCT(childData)
  }
  const openHoursOWCallbackFunction = (childData) => {
    setopenHoursOW(childData)
  }
  const openHoursCWCallbackFunction = (childData) => {
    setopenHoursCW(childData)
  }
  const openHoursOTHCallbackFunction = (childData) => {
    setopenHoursOTH(childData)
  }
  const openHoursCTHCallbackFunction = (childData) => {
    setopenHoursCTH(childData)
  }
  const openHoursOFCallbackFunction = (childData) => {
    setopenHoursOF(childData)
  }
  const openHoursCFCallbackFunction = (childData) => {
    setopenHoursCF(childData)
  }
  const openHoursOSCallbackFunction = (childData) => {
    setopenHoursOS(childData)
  }
  const openHoursCSCallbackFunction = (childData) => {
    setopenHoursCS(childData)
  }
  const openHoursOSUCallbackFunction = (childData) => {
    setopenHoursOSU(childData)
  }
  const openHoursCSUCallbackFunction = (childData) => {
    setopenHoursCSU(childData)
  }
  const sendClientOnClick = () => history.go('/InicioDueno');
  const[createParking,{data}] = useMutation(CREATE_PARKING_MUTATION, {
    onCompleted: (data) => {
      sendClientOnClick()
    },
    onError: (data) => {
      alert("error Creacion")
    }
  });

  const createParkingMutation =() =>{
    createParking({
      variables: {
        idplu: parseInt("9"),
        name: name,
        pricePerMinute: parseInt(pricePerMinute),
        totalSpaces:parseInt(totalSpaces),
        usedSpaces: parseInt("0"),
        OM:openHoursOM,
        CM:openHoursCM,
        OT:openHoursOT,
        CT:openHoursCT,
        OW:openHoursOW,
        CW:openHoursCW,
        OTH:openHoursOTH,
        CTH:openHoursCTH,
        OF:openHoursOF,
        CF:openHoursCF,
        OS:openHoursOS,
        CS:openHoursCS,
        OSU:openHoursOSU,
        CSU:openHoursCSU,
        latitude:parseFloat(marker.lat),
        longitude:parseFloat(marker.lng),
        address:direccion
      }
    })
  }





  
  var address = null
  function setLocation(childData){
    setMarker(childData)
    getAddress(childData)
  }
  async function getAddress({lat , lng}){
    let res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_PKS_GOOGLE_MAPS_API}`);
    if(res.data.status == "OK"){
      address = res.data.results[0].formatted_address
      document.getElementById("Direccion").value = address
      var element = document.getElementById("Direccion") 
      var ev2 = new Event('input', { bubbles: true})
      element.dispatchEvent(ev2)
    }  
  }

  return (
    <div className="row">
      <h1 className="col-6 offset-3">Crear Parqueadero</h1>
      
      
    
      <div className="col-5 pt-3">
        <FormTextField name="Nombre" placeholder="Escriba el nombre del parqueadero" type="text" parentCallback={nameCallbackFunction}/>
        <FormTextField name="Direccion" placeholder="Escriba su Direccion" type="text" value={address} parentCallback={direccionCallbackFunction}/>
        <FormTextField name="Cupos Totales" placeholder="Escriba Cupos Totales" type="number" parentCallback={totalSpacesCallbackFunction}/>
        <FormTextField name="Precio por Minuto" placeholder="Escriba Precio del Park" type="number" parentCallback={pricePerMinuteCallbackFunction}/>
        
        <div className="row">
          <div className="col-6">
            <TimePicker parentCallback={openHoursOMCallbackFunction} name="Apertura Lunes"/>
            <TimePicker parentCallback={openHoursOTCallbackFunction} name="Apertura Martes"/>
            <TimePicker parentCallback={openHoursOWCallbackFunction} name="Apertura Miercoles"/>
            <TimePicker parentCallback={openHoursOTHCallbackFunction} name="Apertura Jueves"/>
            <TimePicker parentCallback={openHoursOFCallbackFunction} name="Apertura Viernes"/>
            <TimePicker parentCallback={openHoursOSCallbackFunction} name="Apertura Sabado"/>
            <TimePicker parentCallback={openHoursOSUCallbackFunction} name="Apertura Domingo"/>
          </div>
          <div className="col-6">
            <TimePicker parentCallback={openHoursCMCallbackFunction} name="Cierre Lunes"/>
            <TimePicker parentCallback={openHoursCTCallbackFunction} name="Cierre Martes"/>
            <TimePicker parentCallback={openHoursCWCallbackFunction} name="Cierre Miercoles"/>
            <TimePicker parentCallback={openHoursCTHCallbackFunction} name="Cierre Jueves"/>
            <TimePicker parentCallback={openHoursCFCallbackFunction} name="Cierre Viernes"/>
            <TimePicker parentCallback={openHoursCSCallbackFunction} name="Cierre Sabado"/>
            <TimePicker parentCallback={openHoursCSUCallbackFunction} name="Cierre Domingo"/>
          </div> 
        </div>
        
     </div>
      <div className="col-7">
        <MapPutPin onLocationChange={setLocation}/>
        <div className="col-7 offset-5 pt-4">
          <Link to={'/InicioDueno'}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="col-12"
            startIcon={<SaveIcon/>}
            onClick={createParkingMutation}
          >
          Guardar Parking
          </Button></Link>
        </div>
        

      </div>
    </div>
  );
}


export default CreatePark;