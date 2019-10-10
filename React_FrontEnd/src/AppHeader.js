import React, { Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Dropdown, DropdownButton , } from 'react-bootstrap'

export class AppHeader extends Component {

    state = {
        isSessionActive: false,
        documento: ''
    }
    handleIniciarSesion = () => {
        this.setState({
            
        isSessionActive : true,
        })
        console.log (this.state.IsSessionActive)
        this.props.history.push('/login');
    }

    handleRegistroNuevo = () => {
        this.props.history.push('/registro');
    }

    handleCerrarSesion = () => {
        this.setState({
        IsSessionActive : false,
        })
        this.props.history.push('/home');
    }

    render() { 
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <a className="navbar-brand" href="/">Sistema De Reclamos</a>
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
                            <li className="nav-item">
                                <Link className='nav-link' to='/Consultar'>Consultar Reclamos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/reclamos'>Reclamos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/reclamoEdificio'>Reclamos Edificio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/SubirFotos'>Subir Fotos</Link>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            <div className="btn-group">
                                <span className="header-username-container">
                                    <span className="header-username">{this.props.documento}</span>
                                </span>
                                    <DropdownButton id="dropdown-basic-button" title="Opciones" variant = 'secondary'>
                                    <Dropdown.Item
                                            onClick={this.handleRegistroNuevo}
                                            style ={{ color: 'black' }}>Registrarse</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={this.handleIniciarSesion}
                                            style ={{ color: 'black' }}>Iniciar Sesión</Dropdown.Item>
                                    
                                        <Dropdown.Item
                                            onClick={this.handleCerrarSesion}
                                            style ={{ color: 'black' }}>Cerrar Sesión</Dropdown.Item>
                                    </DropdownButton>  


                                    

                                
                            </div>
                        </span>
                    </div>
                </div>
            </nav>
        )
    }
}
export default withRouter(AppHeader)