import React, { Component } from 'react'
import { InputGroup, FormControl, Form, Button }  from 'react-bootstrap'

export class NuevoPedido extends Component {
    state = {
        cuit: ''
    }

    onChange = (e) => this.setState({ cuit: e.target.value})

    onSubmit = (e) => {
        e.preventDefault()
        this.props.nuevoPedido(this.state.cuit)
        this.setState({ cuit: ''})
    }

    render() {
        return (
            <form onSubmit = {this.onSubmit}>
                <InputGroup className="col-lg-6 no-padding-left mb-3">
                    <FormControl
                        placeholder="Ingrese un cuit para crear un pedido..." 
                        value = {this.state.cuit}
                        onChange = {this.onChange}
                    />
                    <InputGroup.Append>
                        <Button variant="primary" type='submit'>Crear</Button>
                    </InputGroup.Append>
                </InputGroup>
            </form>
        )
    }
}

export default NuevoPedido
