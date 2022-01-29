import React, { useState } from 'react';
import TextField from '../../components/FormTextField';
import {
  useHistory
} from 'react-router-dom'
import { purple } from '@material-ui/core/colors';
import {withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { makePostUser} from '../../API/api';



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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const history = useHistory();
  const sendClientOnClick = () => history.push('/');

  const usernameCallbackFunction = (childData) => {
    setUsername(childData)
  }
  const passwordCallbackFunction = (childData) => {
    setPassword(childData)
  }
  const password2CallbackFunction = (childData) => {
    setPassword2(childData)
  }

  const signUp=() =>{
    if(password===password2&&password.length>0){
      let user={
        username:username,
        password:password
      }
      makePostUser(user)
  
    }else{
      alert("Las contraseñas no coinciden")
    }
    sendClientOnClick()
  }

  return (
    <div>
      <div className="container">
        <h1 className="col-6 py-2">Registrar usuario</h1>
        <div className="row">
          <div className="col-sm">
            <form>
              <TextField className="row " parentCallback={usernameCallbackFunction} name="Usuario" placeholder="Escriba su usuario" type="text" />
              <TextField className="row " parentCallback={passwordCallbackFunction} name="Contraseña" placeholder="Escriba su contraseña" type="password" />
              <TextField className="row " parentCallback={password2CallbackFunction} name="Repetir Contraseña" placeholder="Repita su contraseña" type="password" />
            </form>

            <div className="col-12 py-2">
              <ColorButton className="btn col-12" type="button" size="large" onClick={signUp}>Registrarse</ColorButton>
            </div>
          </div>
        </div>

      </div>
    </div>

  );

}

export default Register;