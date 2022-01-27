import React, { useState } from 'react';
import axios from 'axios'

import FormTextField from '../../components/FormTextField'
import { useMutation } from "@apollo/client";
import { CREATE_PARKING_MUTATION } from '../../GraphQL/Mutations';
import { useHistory, Link } from 'react-router-dom'

import "react-widgets/styles.css";

const CreatePost = () => {

  const [name, setName] = useState("");
  const [direccion, setdireccion] = useState("");
  const [totalSpaces, settotalSpaces] = useState(0);
  const [pricePerMinute, setpricePerMinute] = useState(0);
  const [marker, setMarker] = useState(null)
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
  const sendClientOnClick = () => history.go('/InicioDueno');
  const [createLuminary, { data, error }] = useMutation(CREATE_PARKING_MUTATION, {
    onCompleted: (data) => {
      sendClientOnClick()
    },
    onError: (error) => {
      alert("error Creacion")
      console.log(error)
    }
  });

  const createParkingMutation = () => {
    createLuminary({
      variables: {
        idplu: parseInt(localStorage.getItem("LoggedId")),
        name: name,
        pricePerMinute: parseInt(pricePerMinute),
        totalSpaces: parseInt(totalSpaces),
        usedSpaces: parseInt("0"),
        latitude: parseFloat(marker.lat),
        longitude: parseFloat(marker.lng),
        address: direccion
      }
    })
  }

  const [value, setValue] = useState("1");

  var address = null
  function setLocation(childData) {
    setMarker(childData)
    getAddress(childData)
  }

  async function getAddress({ lat, lng }) {
    let res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_PKS_GOOGLE_MAPS_API}`);
    if (res.data.status == "OK") {
      address = res.data.results[0].formatted_address
      document.getElementById("Direccion").value = address
      var element = document.getElementById("Direccion")
      var ev2 = new Event('input', { bubbles: true })
      element.dispatchEvent(ev2)
    }
  }

  return (
    <div className="row">
      <h1 className="col-12">Registrar Poste</h1>
      <div className="col-5 pt-3">
        <h5>Registrando poste con ID: 1</h5>
        <FormTextField name="Tipo" placeholder="Tipo" type="number" parentCallback={nameCallbackFunction} />
        <FormTextField name="Material" placeholder="Material" type="text" parentCallback={totalSpacesCallbackFunction} />
        <FormTextField name="Altura" placeholder="Altura" type="text" parentCallback={pricePerMinuteCallbackFunction} />
        <FormTextField name="SubTipo" placeholder="SubTipo" type="text" parentCallback={pricePerMinuteCallbackFunction} />
      </div>
    </div>

  );
}


export default CreatePost;