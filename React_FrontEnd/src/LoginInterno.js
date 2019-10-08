import React, {Component} from 'react';
import RestClient from "./RestClient";
import {Button, FormInput} from "shards-react";

class LoginInterno extends Component {

  constructor(props) {
    super(props);
    this.state  = {
      documento: '',
      password: '',
      logueado: false
    };
  }

  getUsuarioValue(){
    return this.state.documento
  }

  getPasswordValue(){
    return this.state.password
  }

  componentDidMount() {
    if(this.props.onMounted){
      this.props.onMounted({
        getUsuarioValue: this.getUsuarioValue.bind(this),
        getPasswordValue: this.getPasswordValue.bind(this),
      })
    }
  }

  changeUsuarioHandler = event => {
    this.setState({
      documento: event.target.value
    });
  };
  changePasswordHandler = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleChangeSubmit(event) {
    event.preventDefault();
    const data = JSON.stringify({
      documento:  this.state.documento,
      password: this.state.password
    });
    if(this.state.logueado){
      RestClient.cambiarPassword(data).then(response => (response) ? alert("Password Cambiada"): "");
      this.setState({
        logueado: false
      });
    } else {
      alert("El usuario no fue verificado, logueese");
    }
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    const documento =this.state.documento;
     const password =  this.state.password;
  
    RestClient.login(documento, password).then(response => (response) ? this.usuarioLogueadoHandler(): "");
  }

  usuarioLogueadoHandler(){
    this.setState({
      logueado: true
    });
    alert("Bienvenido")
  }

  render() {
      return (
        <div>
          <label htmlFor="feInputUsuari">documento</label>
          <FormInput id="feInputUsuario" onChange={this.changeUsuarioHandler} />
          <br/>
          <label htmlFor="feInputPass">Contraseña</label>
          <FormInput type="password" id="feInputPass" onChange={this.changePasswordHandler}/>
          <br/>
          <table>
            <tbody>
              <tr>
                <td>
                    <Button onClick={this.handleLoginSubmit.bind(this)}>Ingresar al sistema</Button>
                </td>
                <td>
                    <Button onClick={this.handleChangeSubmit.bind(this)}>Cambiar Password</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
  }
}
export default LoginInterno;