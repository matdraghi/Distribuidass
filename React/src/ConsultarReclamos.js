import React, {Component} from 'react';

import {Button, Form } from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

 class ConsultarReclamos extends Component {

    constructor(props) {
       super(props);
       this.state  = {
        documento : '',
        reclamos: [],
         isLoaded:false
       }
    }

    ConsultarRe = (event) => {
      event.preventDefault();
      const documento = event.target.documento.value
      alert (documento)
        const url = "https://localhost:8080/myapp/Reclamos/ConsultarReclamo?Documento=" + documento;
        alert(url);
        fetch(url
          )
        .then(response => {
            this.handleSuccessfulReclamo(documento);
            this.props.history.push("/home");
        })
    }

    handleSuccessfulReclamo = (documento) => {
      alert("Consultando Reclamos con Documento " + documento)
  }


  render() {
    return (
      <Form className="mb-3" onSubmit={this.ConsultarRe}>
             <Form.Group controlId="documento">
                <Form.Label>Documento</Form.Label>
             <Form.Control name="documento" placeholder="DNI39549135"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                    Consultar
                </Button>
      </Form>
     )
   }
  }
export default withRouter(ConsultarReclamos);