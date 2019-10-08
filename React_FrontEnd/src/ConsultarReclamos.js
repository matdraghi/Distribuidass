import React, {Component} from 'react';

import {Button, Form } from 'react-bootstrap';
import {withRouter} from 'react-router-dom'
import { ConsoleLogger } from '@aws-amplify/core';

 class ConsultarReclamos extends Component {

    constructor(props) {
       super(props);
       this.state  = {
         IdReclamo : '',
        documento : '',
        codigo: '',
        reclamos: [],
         isLoaded:false
       }
    }

    ConsultarRe = (event) => {
      event.preventDefault();
      const documento = event.target.documento.value
      alert (documento)
      const url = 'http://localhost:8080/myapp/Reclamos/Consultar?documento=' + documento
      alert (url)
      fetch(url)
        .then((res) =>  res.json()).then((json) => {

          var j = JSON.stringify(json)
          var k = JSON.parse(j)
          console.log (k)
          for (var i in k) {
            // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
            if (k.hasOwnProperty(i)) {
              var entry = k[i];
              var codigo = entry.codigo
              console.log ("Codigo " +codigo)
              var descripcion = entry.descripcion
              console.log ("descripcion " + descripcion)
              
              var documento = entry.documento
              console.log ("Documento " +documento)
              var estado = entry.est
              console.log ("Estado " + estado)

              
              var IdReclamo = entry.IdReclamo
              console.log ("IdReclamo " +IdReclamo)
              var identificador = entry.identificador
              console.log ("Identificador " + identificador)

              
              var ubicacion = entry.ubicacion
              console.log ("Ubicacion " +ubicacion)
            }
          }
          this.state({
            reclamos: this.state.reclamos.map(url)
        })
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

