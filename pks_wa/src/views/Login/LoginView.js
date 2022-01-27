import React, { useState } from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '../../components/FormTextField';
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from '../../GraphQL/Mutations';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { purple } from '@material-ui/core/colors';
import "../../App.css"
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const sendClientOnClick = () => history.push('/Inicio');
  const sendOwnerOnClick = () => history.push('/InicioDueno');
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {

      if (data.ath_loginWA.owner) {
        data.ath_loginWA.id = parseInt(data.ath_loginWA.id);
      }
      localStorage.setItem("LoggedId", data.ath_loginWA.id);
      localStorage.setItem("LoggedOwner", data.ath_loginWA.owner);
      localStorage.setItem("LoggedEmail", data.ath_loginWA.email);

      if (data.ath_loginWA.owner) {
        sendOwnerOnClick()
      } else {
        sendClientOnClick()
      }


    },
    onError: (error) => {
      alert("error login")

    }

  });
  if (loading) return (

    <Backdrop className={classes.backdrop} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  const emailCallbackFunction = (childData) => {
    setEmail(childData)
  }

  const passwordCallbackFunction = (childData) => {
    setPassword(childData)
  }


  const logInMutation = async () => {

    await login({
      variables: {
        email: email,
        password: password
      },

    });
    return data;

  }

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
              <TextField className="row" parentCallback={emailCallbackFunction} name="Correo" placeholder="Escriba su correo" type="text" />
              <TextField className="row" parentCallback={passwordCallbackFunction} name="Contraseña" placeholder="Contraseña" type="password" />
            </form>
            <div className="col-12 py-2 ">
              <ColorButton className="btn col-12" type="button" size="large" startIcon={<FingerprintIcon />} onClick={logInMutation} >
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

            {/*<div className="col-12 py-2">
              <Link to="/SignUpOwner">
                <ColorButton className="btn col-12" type="button" size="large" startIcon={<DriveEtaIcon/>}BB>
                  Registrate como aliado
                </ColorButton>
              </Link>
  </div>*/}

          </div>
        </div>

      </div>
    </div>
  )

}

export default Login;