import React, { useState } from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom'
import TextField from '../../components/FormTextField';
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from '../../GraphQL/Mutations';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const sendClientOnClick = () => history.push('/Inicio');
  const sendOwnerOnClick = () => history.push('/InicioDueno');
  const [login, { data, loading}] = useMutation(LOGIN_MUTATION,{ onCompleted: (data) => {
    console.log("Data from mutation", data)
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
    console.log("LoggedId", localStorage.getItem("LoggedId"))
    console.log("LoggedOwner", localStorage.getItem("LoggedOwner"))
    console.log("LoggedEmail", localStorage.getItem("LoggedEmail"))

  }
  });

  const emailCallbackFunction = (childData) => {
    setEmail(childData)
  }

  const passwordCallbackFunction = (childData) => {
    setPassword(childData)
  }
  
  const loginVerfication = async () =>{
      
      
      
      
  }

  
  const logInMutation = async () => {
    
    await login({
      variables: {
        email: email,
        password: password
      },
      
    });
    // {
    //   console.log(login);
    //   console.log(data);
    //   if (data.ath_loginWA.owner) {
    //     data.ath_loginWA.id = parseInt(data.ath_loginWA.id);
    //   }
    //   localStorage.setItem("LoggedId", data.ath_loginWA.id);
    //   localStorage.setItem("LoggedOwner", data.ath_loginWA.owner);
    //   localStorage.setItem("LoggedEmail", data.ath_loginWA.email);
      
    //   if(localStorage.getItem("LoggedOwner")){
    //     path="/InicioDueno"
    //   }else{
    //     path="/Inicio"
    //   }
    // }
  
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