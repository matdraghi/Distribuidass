import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

export class Login extends Component {

    handleSuccessfulLogin = (documento) => {
        this.props.appLogin(documento);
        this.props.history.push("/home");
    }

    autenticar = (event) => {
        event.preventDefault();
        const documento = event.target.documento.value;
        const url = 'http://localhost:8080/myapp/Login?documento=' + documento + '&password=' + event.target.password.value;
        fetch(url)
            .then((res) => res.json()).then((json) => {
                if (json == true) {
                    this.handleSuccessfulLogin(documento);
                } else {
                    alert(json.message);
                }
            }
        );
    }

    render() {
        return (
            <Form className="col-lg-5 no-padding-left" onSubmit={this.autenticar}>
                <h2 className="mb-3">Login</h2>
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

export default withRouter(Login)