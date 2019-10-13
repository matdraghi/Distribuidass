import React, {Component, useState} from 'react'
import {Button, FormLabel, Alert, Form, Table} from 'react-bootstrap';
import {withRouter, Link} from 'react-router-dom';


class SubirFotos extends Component {
        
    state = {
        uri: "",
        identificadores: [],
    }

    
    prueba = (event) => {
      event.preventDefault(); 
      const documento = this.props.documento;
      //alert (event.target.documento.value)
      alert (documento)
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

  onChange(e) {
        var input = document.querySelector('input[type="file"]')

        var data = new FormData()
        data.append('file', input.files[0])
        data.append('user', 'hubot')
        fetch('http://localhost:8080/myapp/savefile', {
          method: 'POST',
          body: data
        }).then((response) => response.json()).then((json) => {
          alert (json)
          this.state.uri = json;
          alert (this.state.uri)
              
        })
    
      }

      handleUploadImage = () => {
        alert("Your file is being uploaded!");
        
    }

render (){
        return (
            
          <div>
    <Form className="mb-3"  onReset= {this.prueba}>
    <Form.Group controlId="idReclamo">
                    <Form.Label>Id</Form.Label>
                    <Form.Control as="select" >
                    {this.state.identificadores.map((identificadores) => (
                        <option key = {identificadores.idReclamo} value= {identificadores.idReclamo} > {identificadores.idReclamo}
                        </option>
                    ))}
                    </Form.Control>
                </Form.Group>
    <Button variant="secondary" style={{display: 'flex', justifyContent: 'Left'}} className="right" type="reset" >
                    Obtener Campos Restantes
                </Button>
            <h1>File Upload</h1>
            <input type="file" onChange={(e) => this.onChange(e)} />
            <img 
                                         src= {this.state.uri}
                                                                 />
            <Button variant="primary" onClick={this.handleUploadImage} >
           
           
                 Upload File!
            </Button>
            </Form>
        </div>
        );
      }
}

export default withRouter(SubirFotos)