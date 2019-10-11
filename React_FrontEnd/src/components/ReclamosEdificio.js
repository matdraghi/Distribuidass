import React, {Component} from 'react'
import {Button, Form } from 'react-bootstrap';
import {withRouter} from 'react-router-dom'
class ReclamosEdificio extends Component {

    ObtenerDocumento = () => {
        const url = 'http://localhost:8080/myapp/Reclamos/ObtenerDoc';
        alert (url)

        fetch(url)
        .then((response) => response.json()).then((json) => {
            alert (json)
            this.setState(
                {
                    documento:  json,
                }
            )
        })
    }
    cargarReclamo = (event) => {
        event.preventDefault(); 
        const documento = event.target.documento.value;
        //alert (event.target.documento.value)
        const codigo = event.target.codigo.value;
        //alert (event.target.codigo.value)
        const ubicacion = event.target.ubicacion.value;
        //alert (event.target.ubicacion.value)
        const descripcion = event.target.descripcion.value;
        //alert (event.target.descripcion.value)
        //alert (event.target.identificador.value)
        //alert (documento + "" + codigo + "" + ubicacion + "" + descripcion + "" + identificador)
        const url = 'http://localhost:8080/myapp/Reclamos/altaEdificio?documento=' + documento + '&codigo=' + codigo + '&ubicacion=' + ubicacion + '&descripcion=' + descripcion;
        alert (url)

        fetch(url)
        .then((response) => response.json()).then((json) => {
            alert (json)
            if (json === false){
                alert ("Es Inquilino de la Unidad")
            this.handleSuccessfulReclamo(documento);
            this.props.history.push("/home");
            }
        })
        
                
    }

    handleSuccessfulReclamo = (documento) => {
        alert("Creado Reclamo con Documento " + documento)
    }

    render() {
        return (      
            <Form className="mb-3" onSubmit={this.cargarReclamo}>
             <Form.Group controlId="documento">
                <Form.Label>Documento</Form.Label>
                <Form.Control as="select" >
                    <option>{this.props.documento}</option>
                </Form.Control>
                </Form.Group>
                <Form.Group controlId="codigo">
                    <Form.Label>Codigo</Form.Label>
                    <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="ubicacion">
                    <Form.Label>Ubicacion</Form.Label>
                    <Form.Control as="select">
                    <option>Mogliani 425</option>
                    <option>Arrayanes 1230</option>
                    <option>Bombares 50</option>
                    <option>Alvear 100</option>
                    <option>Maquinista Savio 9905</option>
                    <option>Libertador 5600</option>
                    <option>Libertador 5400</option>
                    <option>Parana 300</option>
                    <option>Av. Lizard 1000</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="descripcion">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Ingresar
                </Button>
                </Form>
    )
}
}

export default withRouter(ReclamosEdificio)