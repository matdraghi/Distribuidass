import React, {Component} from 'react';

import {Button, Form, Table} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'
import Loading from './Loading'
 class ConsultarReclamos extends Component {
    
    
  state = {
    reclamos: []
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
              var IdReclamo = entry.idReclamo
              console.log ("IdReclamo.. " + IdReclamo)
              var identificador = entry.identificador
              console.log ("Identificador " + identificador)

              
              var ubicacion = entry.ubicacion
              console.log ("Ubicacion " +ubicacion)
              this.setState({
                reclamos : k,
              });

              console.log(k)
              //reclamos.push({
                //IdReclamo: IdReclamo,
                //Codigo: codigo,
               // Documento : documento,
                //Ubicacion: ubicacion,
                //Identificador: identificador,
                //Descripcion: descripcion,
                //Estado: estado
            //})
            //console.log (reclamos)
            }
          }
            this.handleSuccessfulReclamo(documento);
            //this.props.history.push("/home");
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
                <Form.Control as="select" >
                    <option>{this.props.documento}</option>
                </Form.Control>
                </Form.Group>
            <Button variant="primary" type="submit">
                    Consultar
                </Button>
                <React.Fragment>
                  
                <Table striped bordered hover>
                    <thead className="table table-striped table-hover">
                    <tr>
                        
                        <th>#</th>
                        <th>Identificador</th>
                        <th>IdReclamo</th>
                        <th>Codigo</th>
                        <th>Ubicacion</th>
                        <th>Descripcion</th>
                        <th>Documento</th>
                        <td>Estado</td>
                    </tr>
                    </thead>
<tbody>
                        {this.state.reclamos.map((reclamos) => (
                            <tr>
                              
                                <td>#</td>
                                <td>{reclamos.identificador}</td>
                                <td>{reclamos.idReclamo}</td>
                                <td>{reclamos.codigo}</td>
                                <td>{reclamos.ubicacion}</td>
                                <td>{reclamos.descripcion}</td>
                                <td>{reclamos.documento}</td>
                                
                                <td>{reclamos.est}</td>

                            </tr>
                        ))}
                        </tbody>
                        
                 </Table>
        </React.Fragment>

      </Form>
     )
   }
  }
export default withRouter(ConsultarReclamos);
