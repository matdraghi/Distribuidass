import React, {Component} from 'react'
import {Button, Form, FormControl, FormGroup, InputGroup} from 'react-bootstrap';
import Select from 'react-select';

class NuevoProducto extends Component {

    state = {
        nombre: '',
        codigoBarras: '',
        marca: '',
        precio: '',

        rubrosSource: [],
        subRubrosSource: [],
        rubrosOptions: [],
        subRubrosOptions: [],
        rubroSelectedOption: null,
        subRubroSelectedOption: null
    }

    componentDidMount() {
        this.cargarRubros();
    }

    generarProducto = () => {
        const rubro = this.state.rubrosSource.find(rubro => rubro.codigo === this.state.rubroSelectedOption.value);
        const subRubro = this.state.subRubrosSource.find(subrubro => subrubro.codigo === this.state.subRubroSelectedOption.value);
        const producto = {
            identificador: undefined,
            rubro: rubro,
            subRubro: subRubro,
            nombre: String(this.state.nombre),
            marca: String(this.state.marca),
            codigoBarras: String(this.state.codigoBarras),
            precio: parseFloat(this.state.precio)
        }
        return(producto);
    }

    guardarProducto = (e) => {
        e.preventDefault();
        const producto = this.generarProducto();
        const url = 'http://localhost:8080/tpo/productos/alta';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                alert('Producto creado correctamente')
            }
        });
    }


    handleSelectRubroOnChange = (selectedOption) => {
        const codigoRubro = selectedOption.value;
        const subRubrosFiltradosPorRubro = this.state.subRubrosSource.filter((subRubro) => codigoRubro === subRubro.rubro.codigo);
        this.setState({
            subRubrosOptions: subRubrosFiltradosPorRubro.map(function (subRubro) {
                return {value: subRubro.codigo, label: subRubro.descripcion};
            }),
            rubroSelectedOption: selectedOption,
            subRubroSelectedOption: null
        });
    }

    handleSelectSubRubroOnChange = (selectedOption) => {
        this.setState({subRubroSelectedOption: selectedOption});
    }

    handleInputNombreOnChange = (event) => {
        this.setState({nombre: event.target.value})
    }

    handleInputMarcaOnChange = (event) => {
        this.setState({marca: event.target.value})
    }

    handleInputCodigoBarrasOnChange = (event) => {
        this.setState({codigoBarras: event.target.value})
    }

    handleInputPrecioOnChange = (event) => {
        this.setState({precio: event.target.value})
    }


    cargarRubros = () => {
        fetch('http://localhost:8080/tpo/rubros')
            .then((res) => res.json()).then((json) => {
            const rubros = json;
            this.setState({
                rubrosSource: rubros,
                rubrosOptions: rubros.map(function (rubro) {
                    return {value: rubro.codigo, label: rubro.descripcion}
                })
            });
        }).catch((error) => {
            alert("Error en cargar rubros" + error);
        });
        fetch('http://localhost:8080/tpo/sub-rubros/')
            .then((res) => res.json()).then((json) => {
            this.setState({
                subRubrosSource: json
            });
        }).catch((error) => {
            alert("Error en cargar subrubros" + error);
        });
    }


    render() {
        return (
            <Form>
                <h2 className="mb-4">Nuevo Producto</h2>
                <div className="col-lg-7 no-padding-left">
                    <FormGroup>
                        <Form className="mb-5">
                            <Form.Group>
                                <Form.Label>Rubro</Form.Label>
                                <Select options={this.state.rubrosOptions} onChange={this.handleSelectRubroOnChange}
                                        placeholder="Seleccione un rubro..."/>
                            </Form.Group>

                            <Form.Group className="mt-4">
                                <Form.Label>Sub Rubro</Form.Label>
                                <Select options={this.state.subRubrosOptions} onChange={this.handleSelectSubRubroOnChange}
                                        value={this.state.subRubroSelectedOption} placeholder="Seleccione un sub rubro..."/>
                            </Form.Group>
                        </Form>

                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Nombre</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={this.handleInputNombreOnChange}/>
                        </InputGroup>

                        <InputGroup className="mt-4">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Marca</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={this.handleInputMarcaOnChange}/>
                        </InputGroup>

                        <InputGroup className="mt-4">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Código de Barras</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={this.handleInputCodigoBarrasOnChange}/>
                        </InputGroup>

                        <InputGroup className="mt-4">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default" size='100px'>Precio</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={this.handleInputPrecioOnChange}/>
                        </InputGroup>
                    </FormGroup>


                    <Button variant='success' className="float-right mt-2" type='submit'
                            onClick={this.guardarProducto.bind(this)}>Guardar</Button>
                </div>
            </Form>
        )
    }
}


export default NuevoProducto