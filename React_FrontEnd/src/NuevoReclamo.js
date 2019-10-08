import React, { Component } from 'react'
import { InputGroup, FormControl, Form, Button }  from 'react-bootstrap'

export class NuevoReclamo extends Component {
    state = {
        documento: ''
    }

    onChange = (e) => this.setState({ documento: e.target.value})

    onSubmit = (e) => {
        e.preventDefault()
        this.props.nuevoReclamo(this.state.documento)
        this.setState({ documento: ''})
    }

    render() {
        return (
            <form onSubmit = {this.onSubmit}>
                <InputGroup className="col-lg-6 no-padding-left mb-3">
                    <FormControl
                        placeholder="Ingrese un Documento para crear el Reclamo..." 
                        value = {this.state.documento}
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