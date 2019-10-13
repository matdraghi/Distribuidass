import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

export class Registro extends Component {

    handleSuccessfullRegistro = (documento) => {
        alert ("Welcome Nuevo Miembro :" + documento);
        this.props.history.push("/login");
    }

    autenticar = (event) => {
        event.preventDefault();
        const documento = event.target.documento.value;
        const password = event.target.password.value;
        console.log (documento);
        const url = 'http://localhost:8080/myapp/Registro?Documento=' + documento + '&Password=' + password;
        alert (url)
        fetch(url)
            .then((res) => res.json()).then((json) => {
                if (json === true) {
                    this.handleSuccessfullRegistro(documento);
                } else if (json === false){
                    alert ("Usuario ya existe como registrado en la BD!!!!");
                }
            }
        );
    }

    render() {
        return (
            <Form className="text-center" onSubmit={this.autenticar}>
                <h2 className="mt-5">Registro</h2>
                <Form.Group controlId="documento">
                    <Form.Label>Documento</Form.Label>
                    <Form.Control name="documento"/>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Ingresar
                </Button>
            </Form>
        )
    }
}

export default withRouter(Registro)