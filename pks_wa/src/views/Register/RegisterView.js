import React, { useState } from 'react';
import TextField from '../../components/FormTextField';
import { useMutation } from "@apollo/client";
import { SIGN_UP_MUTATION } from '../../GraphQL/Mutations';
import {
  Link,
  useHistory
} from 'react-router-dom'
import { purple } from '@material-ui/core/colors';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#000',
    },
  },
}))(Button);


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [age, setAge] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const history = useHistory();
  const sendClientOnClick = () => history.go('/');

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
        <h1 className="col-6 py-2">Registrar usuario</h1>
        <div className="row">
          <div className="col-sm">
            <form>
              <TextField className="row " parentCallback={nameCallbackFunction} name="Nombre" placeholder="Escriba su nombre" type="text" />
              <TextField className="row " parentCallback={emailCallbackFunction} name="Correo" placeholder="Escriba su correo" type="text" />
              <TextField className="row " parentCallback={phoneCallbackFunction} name="Teléfono" placeholder="Escriba su teléfono" type="text" />
              <TextField className="row " parentCallback={passwordCallbackFunction} name="Contraseña" placeholder="Escriba su contraseña" type="password" />
              <TextField className="row " parentCallback={password2CallbackFunction} name="Repetir Contraseña" placeholder="Repita su contraseña" type="password" />
            </form>

            <div className="col-12 py-2">
              <ColorButton className="btn col-12" type="button" size="large" onClick={signUpMutation}>Registrarse</ColorButton>
            </div>
          </div>
        </div>

      </div>
    </div>

  );

}

export default Register;