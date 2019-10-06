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
        const url = 'http://localhost:8080/myapp/Registro?documento=' + documento + '&password=' + password;
        alert (url)
        fetch(url)
            .then((res) => res.json()).then((json) => {
                if (json === false) {
                    this.handleSuccessfullRegistro(documento);
                } else {
                    alert("Hola" +json.message);
                }
            }
        );
    }

    render() {
        return (
            <Form className="col-lg-5 no-padding-left" onSubmit={this.autenticar}>
                <h2 className="mb-3">Registro</h2>
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