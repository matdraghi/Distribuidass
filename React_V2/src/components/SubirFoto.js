import React, {Component, useState} from 'react'
import {Button, FormLabel, Alert, Form, Table} from 'react-bootstrap';
import {withRouter, Link} from 'react-router-dom';


class SubirFotos extends Component {
        
    state = {
        uri: "",
        identificadores: [],
        id: "",
        numero: "",
    }

    
    prueba = (event) => {
      event.preventDefault(); 
      const documento = this.props.documento;
      //alert (event.target.documento.value)
      //alert (documento)
      this.ObtenerIdentificadores(documento);
  }
  ObtenerIdentificadores(documento) {
      const url = 'http://localhost:8080/myapp/Reclamos/ObtenerIdReclamos?documento=' +  documento;
     

      fetch(url)
      .then((response) => response.json()).then((json) => {
          var j = JSON.stringify(json)
          console.log (j)
          var k = JSON.parse(j)
          for (var i in k) {
              // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
              if (k.hasOwnProperty(i)) {
                var entry = k[i];
                var id = entry.idReclamo
              this.setState({
              identificadores : k,
            });
          }
      }
          }
         
      )
      
  }

  AsociarIdReclamo(n, id) {
    const url = 'http://localhost:8080/myapp/Asociar?numero=' +  n + "&idReclamo=" + id;
   

    fetch(url)
    .then((response) => response.json()).then((json) => {
      
        //alert ("Asociando IdReclamo")
        this.props.history.push ("/home")
        }
    )
    
}
  onChang = (event) => {
        event.preventDefault();
        var input = document.querySelector('input[type="file"]')
        const idReclamo = event.target.idReclamo.value;
        var id = JSON.parse (idReclamo)
        var data = new FormData()
        data.append('file', input.files[0])
 
        //alert (data)
        //alert (id)
        fetch('http://localhost:8080/myapp/savefile',{
          method: 'POST', // change to GET
          body: data, id,
   } ).then((response) => response.json()).then((json) => {
          //alert (json)
          this.setState({
            numero : json,
          });

          //alert ("numero"+ this.state.numero);
          var n = this.state.numero;
          //alert ("!" + n)
          this.state.uri = json;
          this.AsociarIdReclamo(n, id)
          //alert (this.state.uri)
          this.handleUploadImage()
              
        })
    
      }

      handleUploadImage = () => {
        alert("Tu archivo ha sido subido con exito!");
        
    }

render (){
        return (
            
          <div>
    <Form className="mb-3" onSubmit={this.onChang} onReset= {this.prueba}>
    <Form.Group controlId="idReclamo">
                    <Form.Label>Id Reclamo</Form.Label>
                    <Form.Control as="select" >
                    {this.state.identificadores.map((identificadores) => (
                        <option key = {identificadores.idReclamo} value= {identificadores.idReclamo} > {identificadores.idReclamo}
                        </option>
                    ))}
                    </Form.Control>
                </Form.Group>
    <Button variant="secondary" style={{display: 'flex', justifyContent: 'Left'}} className="right" type="reset" >
                    Obtener IdReclamos
                </Button>
            <h1>Subir Archivo</h1>
            <input type="file" />
            <Button variant="primary" type = "submit" >
           
           
                 Subir Archivo!
            </Button>
            </Form>
        </div>
        );
      }
}

export default withRouter(SubirFotos)