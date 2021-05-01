import React, { Component } from 'react';
import "../index.css";

class FormTextField extends Component {
  render() {
    return (
        <div className="col-6  py-3 offset-3 input-effect">
          <input className="effect-20" type={this.props.type} placeholder={this.props.placeholder} onChange={this.props.parentCallback}></input>
            <label>{this.props.name}</label>
            <span className="focus-border">
              <i></i>
            </span>
        </div>
    );
  }
}



export default FormTextField;