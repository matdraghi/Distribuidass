import React, {Component} from 'react'
import {Button, Form } from 'react-bootstrap';
import {withRouter} from 'react-router-dom'
class ReclamosEdificio extends Component {

    state = {
        identificadores: [], 
        codig: '',
    } 

    pruebaNombre= (event) => {
        event.preventDefault(); 
        const nombre = event.target.nombre.value;
        this.ObtenerIdentificadoress(nombre);
    
        this.props.history.push ("/reclamoEdificio")
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
                  var entryy = k [i + 1];
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
              });


              console.log (this.state.codig)
            }
        }
            }
           
        )
        
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
        const piso = event.target.piso.value;
        const nombre = event.target.nombre.value;
        //alert (event.target.descripcion.value)
        //alert (event.target.identificador.value)
        //alert (documento + "" + codigo + "" + ubicacion + "" + descripcion + "" + identificador)
        const url = 'http://localhost:8080/myapp/Reclamos/altaEdificio?documento=' + documento + '&codigo=' + codigo + '&ubicacion=' + ubicacion + '&descripcion=' + descripcion + "&nombre=" + nombre + "&piso=" + piso;
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
            <Form className="mb-3" onSubmit={this.cargarReclamo} onReset= {this.pruebaNombre}>
             <Form.Group controlId="documento">
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
                <Form.Group controlId="descripcion">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Form.Group controlId="codigo">
                    <Form.Label>Codigo</Form.Label>
                    <Form.Control as="select" >
                        
                    <option>{this.state.codig}</option>
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
                   
                <Button variant="secondary" style={{display: 'flex', justifyContent: 'Left'}} className="right" type="reset" >
                    Obtener Codigo/Piso
                </Button>
                
                <Button variant="primary" type="submit">
                    Ingresar
                </Button>
                </Form>
    )
}
}

export default withRouter(ReclamosEdificio)