import React, { Component } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Form, Col, Button, Table } from 'react-bootstrap'

export class Pedido extends Component {
    state = {
        rubros: [],
        subrubros: [],
        subrubrosLista: [],
        productos: [],
        productosLista: [],
        items: [],
        estado: '',
        rubro: '',
        subrubro: '',
        producto: '',
        cantidad: ''
    }

    componentDidMount() {
        const send = 'http://localhost:8080/tpo/pedidos/byId?numero=' + this.props.match.params.numeroPedido
        fetch(send)
            .then((res) => res.json()).then((responseData) => {
                this.setState({ items: responseData.items })
                this.setState({ estado: responseData.estado })
                this.setState({ numeroPedido: responseData.numeroPedido })
            });
        fetch('http://localhost:8080/tpo/rubros')
            .then((res) => res.json()).then((json) => {
                this.setState({
                    rubros: json
                });

            }).catch((error) => {
                alert("Error en API" + error);
            });
        fetch('http://localhost:8080/tpo/sub-rubros/')
            .then((res) => res.json()).then((json) => {
                this.setState({
                    subrubros: json
                });
            }).catch((error) => {
                alert("Error en API" + error);
            });
        fetch('http://localhost:8080/tpo/productos/')
            .then((res) => res.json()).then((json) => {
                this.setState({
                    productos: json
                });
            }).catch((error) => {
                alert("Error en API" + error);
            });
        }   


    handleSelectRubroChange = (e) => {
        this.setState({ rubro: e.target.value })
        const rubro = e.target.value
        this.setState({ subrubrosLista: this.state.subrubros.filter((subrubro) => rubro == subrubro.rubro.descripcion) })
        this.setState({ productosLista: [] })

    }

    handleSelectSubRubroChange = (e) => {
        this.setState({ subrubro: e.target.value })
        const subrubro = e.target.value
        this.setState({ productosLista: this.state.productos.filter((producto) => subrubro == producto.subRubro.descripcion) })
    }

    handleSelectProductoChange = (e) => {
        this.setState({ producto: e.target.value })
    }

    handleSelectCantidadChange = (e) => {
        this.setState({ cantidad: e.target.value })
    }

    agregarItem = (e) => {
        e.preventDefault()
        if(this.state.estado == 'facturado') {
            alert('No se pueden agregar items a un pedido facturado.')
        }
        else {
            if(this.state.producto == '' || this.state.cantidad == '') {
                alert('Debe completar todos los campos para agregar un item.')
            }
            else {
                var producto = this.state.productos.filter( (p) => (
                    p.nombre == this.state.producto
                ))
                producto = producto[0]
                const nuevoItem = {
                    producto: producto,
                    cantidad: this.state.cantidad
                }
                const url = 'http://localhost:8080/tpo/pedidos/agregar-producto-en-pedido?codigoPedido=' 
                + this.state.numeroPedido + '&codigoProducto=' + producto.identificador + '&cantidad=' + this.state.cantidad
                fetch(url)
                .then((res) => {
                    if(res.ok) {
                        this.setState({ items: [...this.state.items, nuevoItem]})
                    }
                    else {
                        const responseData = res.json()
                        alert(responseData.message)
                    }
                })
            }
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={(e) => { this.agregarItem(e) }}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridRubro">
                            <Form.Label>Rubro</Form.Label>
                            <Form.Control as="select" onChange={this.handleSelectRubroChange}>
                                <React.Fragment>
                                    <option></option>
                                    {this.state.rubros.map((rubro) => (
                                        <option>{rubro.descripcion}</option>
                                    ))}
                                </React.Fragment>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridSubRubro">
                            {this.state.rubro !== '' ?
                                <React.Fragment>
                                    <Form.Label>SubRubro</Form.Label>
                                    <Form.Control as="select" onChange={this.handleSelectSubRubroChange}>
                                        <React.Fragment>
                                            <option></option>
                                            {this.state.subrubrosLista.map((subrubro) => (
                                                <option>{subrubro.descripcion}</option>
                                            ))}
                                        </React.Fragment>
                                    </Form.Control>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Form.Label>Sub Rubro</Form.Label>
                                    <Form.Control as="select" onChange={this.handleSelectSubRubroChange}>
                                        <option></option>
                                    </Form.Control>
                                </React.Fragment>
                            }
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridProducto">
                            {this.state.subrubro !== '' ?
                                <React.Fragment>
                                    <Form.Label>Producto</Form.Label>
                                    <Form.Control as="select" onChange={this.handleSelectProductoChange} value = {this.state.producto}>
                                        <React.Fragment>
                                            <option></option>
                                            {this.state.productosLista.map((producto) => (
                                                <option>{producto.nombre}</option>
                                            ))}
                                        </React.Fragment>
                                    </Form.Control>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Form.Label>Producto</Form.Label>
                                    <Form.Control as="select" onChange={this.handleSelectProductoChange}>
                                        <option></option>
                                    </Form.Control>
                                </React.Fragment>
                            }
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCantidad">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control onChange={this.handleSelectCantidadChange} />
                        </Form.Group>
                    </Form.Row>
                    <Button variant='primary' type='submit'>Agregar Item</Button>
                </Form>
                <br />
                <br />
                <Table striped bordered hover>
            <thead className="thead-dark">
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {this.state.items.map((item) => (
                    <tr>
                        <td>{item.producto.nombre}</td>
                        <td>{item.cantidad}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
            </div>

        )
    }
}

export default Pedido;
