import React, { Component } from 'react';
import TextField from '../../components/FormTextField';

class Register extends Component {

  state = { name: "",email: "",password: "", Password2: "",age: "",phoneNumber: ""}
  nameCallbackFunction = (childData) => {
      this.setState({name: childData})
  }
  emailCallbackFunction = (childData) => {
      this.setState({email: childData})
  }
  phoneCallbackFunction = (childData) => {
    this.setState({phoneNumber: childData})
  }
  ageCallbackFunction = (childData) => {
    this.setState({age: childData})
  }
  passwordCallbackFunction = (childData) => {
    this.setState({password: childData})
  }
  password2CallbackFunction = (childData) => {
    this.setState({password2: childData})
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className= "col-6 py-2">Register View</h1>
          <div className="row">
            <div className="col-sm">
              <form>
                  <TextField className="row " parentCallback = {this.nameCallbackFunction} name="Nombre" placeholder="Escriba su nombre" type="text" />
                  <TextField className="row " parentCallback = {this.emailCallbackFunction} name="Correo" placeholder="Escriba su correo" type="text" />
                  <TextField className="row " parentCallback = {this.phoneCallbackFunction} name="Teléfono" placeholder="Escriba su teléfono" type="text" />
                  <TextField className="row " parentCallback = {this.ageCallbackFunction} name="Edad" placeholder="Escriba su edad" type="text" />
                  <TextField className="row " parentCallback = {this.passwordCallbackFunction} name="Contraseña" placeholder="Escriba su contraseña" type="password" />
                  <TextField className="row " parentCallback = {this.password2CallbackFunction} name="Repetir Contraseña" placeholder="Repita su contraseña" type="password" />
              </form>
              <button className="btn btn-outline-success col-4  py-2 offset-4" type="button" onClick={null}>Success</button>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default Register;