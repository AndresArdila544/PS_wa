import React, { useState } from 'react';
import TextField from '../../components/FormTextField';
import { useMutation } from "@apollo/client";
import { SIGN_UP_MUTATION } from '../../GraphQL/Mutations';
import {
  Link,
  useHistory
} from 'react-router-dom'



const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [age, setAge] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const history = useHistory();
  const sendClientOnClick = () => history.push('/');

  const nameCallbackFunction = (childData) => {
    setName(childData)
  }
  const emailCallbackFunction = (childData) => {
    setEmail(childData)
  }
  const phoneCallbackFunction = (childData) => {
    setPhoneNumber(childData)
  }
  const ageCallbackFunction = (childData) => {
    setAge(childData)
  }
  const passwordCallbackFunction = (childData) => {
    setPassword(childData)
  }
  const password2CallbackFunction = (childData) => {
    setPassword2(childData)
  }

  const [signUp, { data }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: (data) => {
      alert("Registro exitoso")
      sendClientOnClick()
    },
    onError: (data) => {
      alert("error registro")
    }
  });
  const signUpMutation = async () => {
    await signUp({
      variables: {
        name: name,
        email: email,
        password: password,
        age: parseInt(age),
        phoneNumber: parseInt(phoneNumber),
      }
    });

  }

  return (
    <div>
      <div className="container">
        <h1 className="col-6 py-2">Register View</h1>
        <div className="row">
          <div className="col-sm">
            <form>
              <TextField className="row " parentCallback={nameCallbackFunction} name="Nombre" placeholder="Escriba su nombre" type="text" />
              <TextField className="row " parentCallback={emailCallbackFunction} name="Correo" placeholder="Escriba su correo" type="text" />
              <TextField className="row " parentCallback={phoneCallbackFunction} name="Teléfono" placeholder="Escriba su teléfono" type="text" />
              <TextField className="row " parentCallback={ageCallbackFunction} name="Edad" placeholder="Escriba su edad" type="text" />
              <TextField className="row " parentCallback={passwordCallbackFunction} name="Contraseña" placeholder="Escriba su contraseña" type="password" />
              <TextField className="row " parentCallback={password2CallbackFunction} name="Repetir Contraseña" placeholder="Repita su contraseña" type="password" />
            </form>

            <button className="btn btn-outline-success col-4  py-2 offset-4" type="button" onClick={signUpMutation}>Registrarse</button>

          </div>
        </div>

      </div>
    </div>

  );

}

export default Register;