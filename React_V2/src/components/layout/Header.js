import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <a className="navbar-brand" href="#">TPO ADI</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className = 'nav-link' to = '/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className = 'nav-link' to = '/pedidos'>Pedidos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className = 'nav-link' to = '/productos'>Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className = 'nav-link' to = '/clientes'>Clientes</Link>
                        </li>
                        </ul>
                     </div>
                </div>
            </nav>   
        </div>
    )
}
