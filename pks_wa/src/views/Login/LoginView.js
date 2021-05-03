import React, { useState } from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom'
import TextField from '../../components/FormTextField';
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from '../../GraphQL/Mutations';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const sendClientOnClick = () => history.push('/Inicio');
  const sendOwnerOnClick = () => history.push('/InicioDueno');
  const [login, { data, loading,error }] = useMutation(LOGIN_MUTATION, {
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
        <h1 className="col-6 py-2">Login View</h1>
        <div className="row">
          <div className="col-sm">

            <form>
              <TextField className="row" parentCallback={emailCallbackFunction} name="Correo" placeholder="Escriba su correo" type="text" />
              <TextField className="row" parentCallback={passwordCallbackFunction} name="Contraseña" placeholder="Contraseña" type="password" />
            </form>
            <button className="btn btn-outline-success col-4  py-2 offset-4" type="button" onClick={logInMutation} >Ingresar</button>
            <Link to="/SignUp">
              <button className="btn btn-outline-success col-4  py-2 offset-4" type="button">
                Registate
            </button>
            </Link>
            <Link to="/SignUpOwner">
              <button className="btn btn-outline-success col-4  py-2 offset-4" type="button">
                Registate como aliado
            </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )

}

export default Login;