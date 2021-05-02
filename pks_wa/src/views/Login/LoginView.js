import React, {useState} from 'react';
import TextField from '../../components/FormTextField';
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from '../../GraphQL/Mutations';

const Login =() => {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  const emailCallbackFunction = (childData) => {
    setEmail(childData)
  }

  const passwordCallbackFunction = (childData) => {
    setPassword(childData)
  }

  const[login,{data}] = useMutation(LOGIN_MUTATION)
  const logInMutation = async() =>{
    await login({
      variables: {
        email: email,
        password: password
      }
    });
    
    console.log(data.ath_login.token);
  }

  return(
    <div>
      <div className="container">
      <h1 className= "col-6 py-2">Login View</h1>
          <div className="row">
            <div className="col-sm">
                <form>
                  <TextField className="row" parentCallback={emailCallbackFunction} name="Correo" placeholder="Escriba su correo" type="text" />
                  <TextField className="row" parentCallback={passwordCallbackFunction} name="Contraseña" placeholder="Contraseña" type="password" />
                </form>
              <button className="btn btn-outline-success col-4  py-2 offset-4" type="button" onClick={logInMutation} >Ingresar</button>
            </div>
          </div>
        
      </div>
    </div>
  )

}

export default Login;