import React, {Component} from 'react'
import {Button, Form } from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

import Select from 'react-select';

class Reclamos extends Component {
    
       
  state = {
    identificadores: []
}
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
        const identificador = event.target.identificador.value;
        //alert (event.target.identificador.value)
        //alert (documento + "" + codigo + "" + ubicacion + "" + descripcion + "" + identificador)
        const url = 'http://localhost:8080/myapp/Reclamos/alta?documento=' + documento + '&codigo=' + codigo + '&ubicacion=' + ubicacion + '&descripcion=' + descripcion + '&identificador=' + identificador;
        alert (url)

        fetch(url)
        .then((response) => response.json()).then((json) => {
            alert (json)
            if (json === true){
                alert ("Es duenio de la Unidad")
            this.handleSuccessfulReclamo(documento);
            this.props.history.push("/home");
            }
            else if (json === false){
                alert ("NO SE ENCUENTRA AUTORIZADO A REALIZAR DICHA ALTA SOLO EL DUENIO DE LA UNIDAD PODRA HACERLO")
                alert ("Solo Podra hacer un reclamo Sobre el edificio en SI")
                
                this.props.history.push("/reclamoEdificio");
            }
            else if (json === null){
                
                this.props.history.push("/reclamoEdificio");
            }
        })
        
                
    }

    ObtenerIdentificadores = (codigo) => {
        alert("Consultando con Documento " + codigo)
        const url = 'http://localhost:8080/myapp/Reclamos/ObtenerIdentificadores?codigo=' +  codigo;
        alert (url)

        fetch(url)
        .then((response) => response.json()).then((json) => {
            alert (json)
            var j = JSON.stringify(json)
            var k = JSON.parse(j)
            console.log (k)
            this.setState({
                identificadores : k,
              });
            }
           
        )
        
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
                <Form.Group controlId="identificador">
                    <Form.Label>Identificador</Form.Label>
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
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>31</option>
                    <option>32</option>
                    <option>33</option>
                    <option>34</option>
                    <option>35</option>
                    <option>36</option>
                    <option>37</option>
                    <option>38</option>
                    <option>43</option>
                    </Form.Control>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Ingresar
                </Button>
                </Form>
    )
}
}

export default withRouter(Reclamos)