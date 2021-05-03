import React, { Component } from 'react';
import "../index.css";

class FormTextField extends Component {
  onChangeParent = ()=>{
    const val =document.getElementById(this.props.name).value
    this.props.parentCallback(val)
  };
  render() {
    return (
        <div className="pb-3">
          <label className="field field_v2">
              <input className="field__input" id={this.props.name} placeholder={this.props.placeholder} type={this.props.type} onInput={this.onChangeParent} value={this.props.value}></input>
              <span className="field__label-wrap">
                <span className="field__label">{this.props.name}</span>
              </span>
          </label>   
        </div>
    );
  }
}

export default FormTextField;