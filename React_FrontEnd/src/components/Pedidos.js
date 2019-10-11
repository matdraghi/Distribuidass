import React, {Component} from 'react'
import {Dropdown, DropdownButton, Table} from 'react-bootstrap'
import NuevoPedido from './NuevoPedido';
import queryString from 'query-string';
import Moment from 'react-moment';
import {trackPromise} from "react-promise-tracker";
import Loading from './Loading';

export class Pedidos extends Component {

    state = {
        pedidos: []
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        const cuit = params.cuitCliente;
        (cuit != null) ? this.cargarPedidosByCliente(cuit) : this.cargarPedidos();
    }

    cargarPedidos = () => {
        trackPromise(
            fetch('http://localhost:8080/tpo/pedidos/')
                .then((res) => res.json()).then((json) => {
                this.setState({
                    pedidos: json
                });

            }).catch((error) => {
                alert("Error en API" + error);
            })
        );
    }

    cargarPedidosByCliente = (cuit) => {
        const url = 'http://localhost:8080/tpo/pedidos/pedidos-by-cliente?cuit=' + cuit;
        trackPromise(
            fetch(url)
                .then((res) => res.json()).then((json) => {
                this.setState({
                    pedidos: json
                });

            }).catch((error) => {
                alert("Error en cargar pedidos by cliente" + error);
            })
        );
    }

    nuevoPedido = (cuit) => {
        const send = 'http://localhost:8080/tpo/pedidos/crear-con-cuit?cuit=' + cuit;
        fetch(send)
            .then((res) => res.json()).then((responseData) => {
            if (Number.isInteger(responseData)) {
                const url = 'http://localhost:8080/tpo/pedidos/byId?numero='
                const send = url + responseData
                fetch(send)
                    .then((res) => res.json()).then((responseData) => {
                    this.setState({pedidos: [...this.state.pedidos, responseData]})
                });
            } else
                alert(responseData.message)
        });
    }

    itemsPedido = (numeroPedido) => {
        this.props.history.push('pedidos/modificar/' + numeroPedido)
    }

    facturarPedido = (numeroPedido) => {
        const url = 'http://localhost:8080/tpo/pedidos/facturar?numero=' + numeroPedido
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    this.setState({
                        pedidos: this.state.pedidos.map((pedido) => {
                            if (pedido.numeroPedido == numeroPedido)
                                pedido.estado = 'facturado'
                            return pedido
                        })
                    })
                } else {
                    const responseData = res.json()
                    alert(responseData.message)
                }
            })
    }

    eliminarPedido = (numeroPedido) => {
        const url = 'http://localhost:8080/tpo/pedidos/' + numeroPedido;
        fetch(url, {method: 'DELETE'})
            .then((res) => {
                if (res.ok) {
                    this.setState({pedidos: [...this.state.pedidos.filter(pedido => pedido.numeroPedido != numeroPedido)]})
                }
            });
    }

    estaFacturado = (estado) => {
        if(estado == 'pendiente')
            return false
        else return true
    }


    render() {
        return (
            <React.Fragment>
                <h2 className="mb-3">Pedidos</h2>

                <NuevoPedido nuevoPedido={this.nuevoPedido}/>
                <br></br>

                <Table striped bordered hover>
                    <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Fecha Pedido</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.pedidos.map((pedido) => (
                        <tr>
                            <td>{pedido.numeroPedido}</td>
                            <td>{pedido.cliente.cuil}</td>
                            <td><Moment date={pedido.fechaPedido} format="DD/MM/YYYY"/></td>
                            <td>{pedido.estado}</td>
                            <td>
                                <DropdownButton id="dropdown-basic-button" title="Opciones">
                                    <Dropdown.Item
                                        onClick={this.itemsPedido.bind(this, pedido.numeroPedido)}>Items</Dropdown.Item>
                                    <Dropdown.Item onClick={this.facturarPedido.bind(this, pedido.numeroPedido)}
                                                   disabled={this.estaFacturado(pedido.estado)}>Facturar</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={this.eliminarPedido.bind(this, pedido.numeroPedido)}>Eliminar</Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                <Loading/>

            </React.Fragment>
        )
    }

}


export default Pedidos;
