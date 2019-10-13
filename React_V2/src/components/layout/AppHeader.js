import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Dropdown, DropdownButton } from 'react-bootstrap'

export class AppHeader extends Component {

    
    state = {
        documento: '' ,
    }
    handleCerrarSesion = () => {
        this.props.history.push('/login');
        this.props.appCerrarSesion();
    }

    handleCambiarPass = () => {
        this.props.history.push('/cambiar-contraseña/' + this.props.documento)
    }

    handleRegistroNuevo = () => {
        this.state.documento = this.props.documento
        this.props.history.push('/registro');
    }

    handleNuevaConsulta = () => {
        this.props.history.push('/Consultar');
    }

    handleNuevaalta = () => {
        this.props.history.push('/reclamos');
    }

    handleReclamoEdificio = () => {
        this.props.history.push('/reclamoEdificio');
    }

    handleSubirFoto = () => {
        this.props.history.push('/SubirFotos');
    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <a className="navbar-brand" href="/">TPO AD</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className='nav-link' to='/home'>Home</Link>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            <div className="btn-group">
                                {this.props.isSessionActive ?
                                    <DropdownButton id="dropdown-basic-button" title="Funcionalidades" variant = 'secondary'>
                                    <Dropdown.Item
                                        onClick={this.handleNuevaConsulta} 
                                        style ={{ color: 'black' }}>Consultar Reclamo</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={this.handleNuevaalta}
                                        style ={{ color: 'black' }}>Nueva Alta Reclamo</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={this.handleReclamoEdificio} 
                                        style ={{ color: 'black' }}>Reclamo Edificio</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={this.handleSubirFoto} 
                                        style ={{ color: 'black' }}>Subir Foto</Dropdown.Item>
                                    <Dropdown.Item
                                            onClick={this.handleCambiarPass} 
                                            style ={{ color: 'black' }}>Cambiar Contraseña</Dropdown.Item>
                                    <Dropdown.Item
                                            onClick={this.handleCerrarSesion}
                                            style ={{ color: 'black' }}>Cerrar Sesión</Dropdown.Item>
                                    </DropdownButton>
                                    :
                                    <DropdownButton id="dropdown-basic-button" title="Funcionalidades" variant = 'secondary'>
                                        <Dropdown.Item
                                            onClick={this.handleRegistroNuevo} 
                                            style ={{ color: 'black' }}>Registrarse</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={this.handleCerrarSesion}
                                            style ={{ color: 'black' }}>Iniciar Sesión</Dropdown.Item>
                                    </DropdownButton>
                                    
                                }
                            </div>
                        </span>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(AppHeader)
