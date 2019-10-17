import React, {Component} from 'react'
import {Button, Form } from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

import Select from 'react-select';

class Reclamos extends Component {
    
       
  state = {
    identificadores: [], 
    codig: '',
    pisos: '',
    p : [],
}


    cargarReclamo = (event) => {
        event.preventDefault(); 
        const documento = event.target.documento.value;
        //alert (event.target.documento.value)
        const codigo = event.target.codigo.value;
        //this.ObtenerIdentificadores(codigo)
        //alert (event.target.codigo.value)
        const ubicacion = event.target.ubicacion.value;
        //alert (event.target.ubicacion.value)
        const descripcion = event.target.descripcion.value;
        //alert (event.target.descripcion.value)
       const identificador = event.target.identificador.value;

       
       const piso = event.target.piso.value;
       //alert (event.target.descripcion.value)
      const nombre = event.target.nombre.value;

       // this.props.history.push ("/reclamos")
        //alert (event.target.identificador.value)
        //alert (documento + "" + codigo + "" + ubicacion + "" + descripcion + "" + identificador)
        const url = 'http://localhost:8080/myapp/Reclamos/alta?documento=' + documento + '&codigo=' + codigo + '&ubicacion=' + ubicacion + '&descripcion=' + descripcion + '&identificador=' + identificador + "&piso=" + piso + "&nombre=" + nombre;
        fetch(url)
        .then((response) => response.json()).then((json) => {
            
            if (json === true){
                alert ("Es duenio de la Unidad")
            this.QueIdReclamo(documento, nombre, descripcion, piso)
            
            this.handleSuccessfulReclamo(documento);
            this.props.history.push("/home");
            }
            else if (json === false){
                alert ("NO SE ENCUENTRA AUTORIZADO A REALIZAR DICHA ALTA SOLO EL DUENIO DE LA UNIDAD PODRA HACERLO")
                alert ("Solo Podra hacer un reclamo Sobre el edificio en SI")
                
                this.props.history.push("/reclamoEdificio");
            }
            else if (json === null){

                alert ("Usted no es duenio ni inquilino de la unidad ingresada")
                
                this.props.history.push("/reclamoEdificio");
            }
        })
        
                
    }

    prueba = (event) => {
        event.preventDefault(); 
        const documento = event.target.documento.value;
        //alert (event.target.documento.value)
        const codigo = event.target.codigo.value;
        this.ObtenerIdentificadores(codigo);
    
        this.props.history.push ("/reclamos")
    }
    ObtenerIdentificadores(codigo) {
        const url = 'http://localhost:8080/myapp/Reclamos/ObtenerIdentificadores?codigo=' +  codigo;
       

        fetch(url)
        .then((response) => response.json()).then((json) => {
            var j = JSON.stringify(json)
            console.log (j)
            var k = JSON.parse(j)
            for (var i in k) {
                // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
                if (k.hasOwnProperty(i)) {
                  var entry = k[i];
                  var id = entry.id
                  console.log ("Codigo " +id)
                  var piso = entry.piso
                  console.log ("piso " + piso)
                  
                  var numero = entry.numero
                  console.log ("Numero " +numero)
                this.setState({
                identificadores : k,
              });
            }
        }
            }
           
        )
        
    }

    QueIdReclamo(documento, nombre, descripcion, piso) {
        const url = 'http://localhost:8080/myapp/Reclamos/Obtener?documento=' +  documento + "&nombre=" + nombre + "&descripcion=" + descripcion + "&piso=" + piso ;
       

        fetch(url)
        .then((response) => response.json()).then((json) => {
          alert ("IdReclamo..."+ json )
            }
           
        )
        
    }

    
    pruebaNombre= (event) => {
        event.preventDefault(); 
        const nombre = event.target.nombre.value;
        this.ObtenerIdentificadoress(nombre);
    
        this.props.history.push ("/reclamos")
    }
    ObtenerIdentificadoress(nombre) {
        const url = 'http://localhost:8080/myapp/Reclamos/ObtenerIdentificadoress?nombre=' +  nombre;
        fetch(url)
        .then((response) => response.json()).then((json) => {
            var j = JSON.stringify(json)
            console.log (j)
            var k = JSON.parse(j)
            for (var i in k) {
                // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
                if (k.hasOwnProperty(i)) {
                  var entry = k[i];
                  var id = entry.id
                  console.log ("Codigo " +id)
                  var piso = entry.piso
                  console.log ("piso " + piso)
                  
                  var numero = entry.numero
                  console.log ("Numero " +numero)
                  var codigo = entry.edificio.codigo
                  console.log ("Codigo " +codigo)
                this.setState({
                identificadores : k,
                codig: codigo,
                pisos : piso
              });

                   





              //console.log (this.state.codig)
            }
        }
            }
           
        )
        
    }
    handleSuccessfulReclamo = (documento) => {
        alert("Creado Reclamo con Documento " + documento)
    }

    render() {
        return (      
            <Form className="mb-3"  onSubmit={this.cargarReclamo} onReset= {this.pruebaNombre}>
                <Form.Group controlId="documento" >
                <Form.Label>Documento</Form.Label>
                <Form.Control as="select" >
                    <option>{this.props.documento}</option>
                </Form.Control>
                </Form.Group>
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre Edificio</Form.Label>
                    <Form.Control as="select">
                    <option>SLS Puerto Madero</option>
                    <option>The Link Towers</option>
                    <option>The Fire Place</option>
                    <option>Alvear Tower</option>
                    <option>Dique Dos</option>
                    <option>Libertador Plaza</option>
                    <option>Chateau Libertador</option>
                    <option>The Tower</option>
                    <option>Lizard Plaza</option>
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
                <Button variant="secondary" style={{display: 'flex', justifyContent: 'Left'}} className="right" type="reset" >
                    Obtener Codigo/identificadores/pisos
                </Button>
                <Form.Group controlId="codigo">
                    <Form.Label>Codigo</Form.Label>
                    <Form.Control as="select" >
                        
                    <option>{this.state.codig}</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="identificador">
                    <Form.Label>Identificador</Form.Label>
                    <Form.Control as="select" >
                    {this.state.identificadores.map((identificadores) => (
                        <option key = {identificadores.id} value= {identificadores.id} > {identificadores.id}
                        </option>
                    ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="piso">
                    <Form.Label>Piso</Form.Label>
                    <Form.Control as="select" >
                    {this.state.identificadores.map((identificadores) => (
                        <option key = {identificadores.piso} value= {identificadores.piso} > {identificadores.piso}
                        </option>
                    ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="descripcion">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
               
                <Button variant="primary" type="submit">
                    Realizar Alta Reclamo
                </Button>
                </Form>
    )
}
}

export default withRouter(Reclamos)
