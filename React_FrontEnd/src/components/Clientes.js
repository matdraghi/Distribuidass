import React, {Component} from 'react'
import {Button, Table} from 'react-bootstrap'
import Boolean from "./Boolean"
import {trackPromise} from "react-promise-tracker";
import Loading from './Loading';

export class Clientes extends Component {

    state = {
        clientes: []
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="mb-3">Clientes</h2>

                <Table striped bordered hover>
                    <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Cuil</th>
                        <th>Activo</th>
                        <th>Opciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.clientes.map((cliente) => (
                        <tr>
                            <td>{cliente.numero}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.cuil}</td>
                            <td><Boolean value={cliente.activo}/></td>
                            <td>
                                <Button variant='info'
                                        onClick={this.goToPedidosCliente.bind(this, cliente.cuil)}>Pedidos</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                <Loading/>

            </React.Fragment>
        )
    }

    componentDidMount() {
        this.cargarClientes();
    }

    cargarClientes = () => {
        trackPromise(
            fetch('http://localhost:8080/tpo/clientes')
                .then((response) => response.json()).then((json) => {
                this.setState({
                    clientes: json
                });

            }).catch((error) => {
                alert("Error en API" + error);
            })
        );
    };

    goToPedidosCliente(cuit) {
        this.props.history.push('pedidos?cuitCliente=' + cuit);
    }
}

export default Clientes