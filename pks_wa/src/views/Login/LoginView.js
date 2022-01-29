import React, { useState } from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '../../components/FormTextField';
import { withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { makeLoginUser} from '../../API/api';
import "../../App.css"

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#000'),
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#000',
    },
  },
}))(Button);


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const sendClientOnClick = () => history.push('/Inicio');

  const usernameCallbackFunction = (childData) => {
    setUsername(childData)
  }

  const passwordCallbackFunction = (childData) => {
    setPassword(childData)
  }

  const doLogin = async () => {
    let user={
      username:username,
      password:password
    }
    let data = await makeLoginUser(user);
    console.log(data)
    if(data===-1){
      alert("Error Login")
    }else if(data===0){
      localStorage.setItem("LoggedId", data);
      localStorage.setItem("LoggedAdmin", true);
      alert("Admin Login")
      sendClientOnClick()
    }else{
      localStorage.setItem("LoggedId", data);
      localStorage.setItem("LoggedAdmin", false);
      sendClientOnClick()
    }
  }
  React.useEffect(() => {
    localStorage.setItem("LoggedId", "");
    localStorage.setItem("LoggedAdmin", "");
    localStorage.setItem("LoggedId", "");
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm py-4">
            <div className="TitleDiv">
              <h1 class="home-title h1Title  col-12">
                Sistema de Información Alumbrado Público
                <br />
                San José del Guaviare
              </h1>
            </div>

            <form>
              <TextField className="row" parentCallback={usernameCallbackFunction} name="Usuario" placeholder="Escriba su usuario" type="text" />
              <TextField className="row" parentCallback={passwordCallbackFunction} name="Contraseña" placeholder="Contraseña" type="password" />
            </form>
            <div className="col-12 py-2 ">
              <ColorButton className="btn col-12" type="button" size="large" startIcon={<FingerprintIcon />} onClick={doLogin} >
                Ingresar
              </ColorButton>
            </div>
            <div className="col-12 py-2">
              <Link to="/SignUp">
                <ColorButton className="btn col-12" type="button" size="large" startIcon={<AccountCircleIcon />}>
                  Registrate
                </ColorButton>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  )

}

export default Login;