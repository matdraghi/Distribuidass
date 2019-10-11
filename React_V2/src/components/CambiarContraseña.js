import React, { Component } from 'react'
import {Button, Form} from 'react-bootstrap';

export class CambiarContraseña extends Component {

    cambiarPassword = (e) => {
        e.preventDefault()
        const username = this.props.match.params.usuario
        const currentPass = e.target.currentPassword.value;
        const newPass = e.target.newPassword.value;
        const newPass2 = e.target.newPassword2.value;
        const url = 'http://localhost:8080/tpo/login?user=' + username + '&password=' + currentPass;
        fetch(url)
            .then((res) => res.json()).then((json) => {
                if (json == true) {
                    if(newPass == newPass2) {
                        const url = 'http://localhost:8080/tpo/cambio-password?nombre=' + username + '&password=' + newPass;
                        fetch(url)
                        .then(response => {
                            if(!response.ok)
                            {
                                return response.json()
                                .then(({message}) => {
                                    alert(message)
                                });
                            }
                            else {
                                alert('Contraseña cambiada correctamente')
                                this.props.history.push('/home');
                            }
                        })
                    }
                    else {
                        alert('Las contraseñas ingresadas no coinciden')
                    }
                } 
                else {
                    alert('La contraseña actual es incorrecta.');
                }
            }
        );

    }

    render() {
        return (
            <Form className="col-lg-5 no-padding-left" onSubmit={this.cambiarPassword}>
            <h2 className="mb-3">Cambiar Contraseña</h2>
            <Form.Group controlId="currentPassword">
                <Form.Label>Ingrese su contraseña actual:</Form.Label>
                <Form.Control type="password" name="currentPassword"/>
            </Form.Group>

            <Form.Group controlId="newPassword">
                <Form.Label>Ingrese su nueva contraseña:</Form.Label>
                <Form.Control type="password" name="newPassword"/>
            </Form.Group>

            <Form.Group controlId="newPassword2">
                <Form.Label>Reingrese su nueva contraseña:</Form.Label>
                <Form.Control type="password" name="newPassword2"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Cambiar Contraseña
            </Button>
        </Form>
        )
    }
}

export default CambiarContraseña
