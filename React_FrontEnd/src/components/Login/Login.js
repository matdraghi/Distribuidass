import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import './Login.css';

class Login extends Component {


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
      PostData(data).then(response => (response) ? alert("Password Cambiada"): "");
      this.setState({
        logueado: false
      });
    } else {
      alert("El usuario no fue verificado, logueese");
    }
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    const data = JSON.stringify({
      documento:  this.state.documento,
      password: this.state.password
    });
    PostData(data).then(response => (response) ? this.usuarioLogueadoHandler(): "");
  }

  usuarioLogueadoHandler(){
    this.setState({
      logueado: true
    });
    alert("Bienvenido")
  }

  render() {

     if (this.state.redirectToReferrer) {
      return (<Redirect to={'/home'}/>)
    }
   
    if(sessionStorage.getItem('userData')){
      return (<Redirect to={'/home'}/>)
    }

     return (
      <div className="row" id="Body">
        <div className="medium-5 columns left">
        <h4>Login</h4>
        <label>Documento</label>
        <input type="text" name="documento" placeholder="documento" onChange={this.onChange}/>
        <label>Password</label>
        <input type="password" name="password"  placeholder="Password" onChange={this.onChange}/>
        <input type="submit" className="button success" value="Login" onClick={this.login}/>
        <a href="/signup">Registration</a>
        </div>
      </div>
    );
  }
}

export default Login;