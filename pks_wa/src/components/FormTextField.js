import React, { Component } from 'react';
import "../index.css";

class FormTextField extends Component {
  onChangeParent = ()=>{
    const val =document.getElementById(this.props.name).value
    this.props.parentCallback(val)
  };
  render() {
    return (
        <div className="col-6  py-3 offset-3 input-effect">
          <input id={this.props.name} className="effect-20" type={this.props.type} placeholder={this.props.placeholder} onChange={this.onChangeParent}></input>
            <label>{this.props.name}</label>
            <span className="focus-border">
              <i></i>
            </span>
        </div>
    );
  }
}



export default FormTextField;