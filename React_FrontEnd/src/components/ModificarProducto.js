import React, {Component} from 'react'
import {Button, Form, FormControl, FormGroup, InputGroup} from 'react-bootstrap';
import Select from 'react-select';

class ModificarProducto extends Component {

    state = {
        nombre: '',
        marca: '',
        codigoBarras: '',
        precio: '',

        producto: null,

        rubrosSource: [],
        subRubrosSource: [],
        rubrosOptions: [],
        subRubrosOptions: [],
        rubroSelectedOption: null,
        subRubroSelectedOption: null
    }

    componentDidMount() {
        this.cargarRubros();
        this.cargarProducto(this.props.match.params.identificador);
    }

    cargarProducto = (identificador) => {
        const url = 'http://localhost:8080/tpo/productos/byId?identificador=' + identificador;
        fetch(url)
            .then((res) => res.json()).then((json) => {
            const producto = json;
            this.setState({
                nombre: producto.nombre,
                marca: producto.marca,
                codigoBarras: producto.codigoBarras,
                precio: producto.precio,
                rubroSelectedOption: {value: producto.rubro.codigo, label: producto.rubro.descripcion},
                subRubroSelectedOption: {value: producto.subRubro.codigo, label: producto.subRubro.descripcion},
                producto: producto
            });
        }).catch((error) => {
            alert("Error al cargar producto" + error);
        });
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

    modificarProducto = (event) => {
        event.preventDefault();
        const producto = {
            ...this.state.producto,
            precio: parseFloat(this.state.precio)
        };
        fetch('http://localhost:8080/tpo/productos/modificar', {
            method: 'PUT',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                alert('Producto modificado correctamente')
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


    render() {
        return (
            <Form>
                <h2 className="mb-4">Modificar Producto</h2>
                <div className="col-lg-7 no-padding-left">
                    <FormGroup>
                        <Form className="mb-5">
                            <Form.Group>
                                <Form.Label>Rubro</Form.Label>
                                <Select options={this.state.rubrosOptions} onChange={this.handleSelectRubroOnChange}
                                        value={this.state.rubroSelectedOption}
                                        placeholder="Seleccione un rubro..."
                                        isDisabled={true}/>
                            </Form.Group>

                            <Form.Group className="mt-4">
                                <Form.Label>Sub Rubro</Form.Label>
                                <Select options={this.state.subRubrosOptions}
                                        onChange={this.handleSelectSubRubroOnChange}
                                        value={this.state.subRubroSelectedOption}
                                        placeholder="Seleccione un sub rubro..."
                                        isDisabled={true}/>
                            </Form.Group>
                        </Form>

                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Nombre</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={this.handleInputNombreOnChange}
                                value={this.state.nombre}
                                disabled={true}/>
                        </InputGroup>

                        <InputGroup className="mt-4">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Marca</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={this.handleInputMarcaOnChange}
                                value={this.state.marca}
                                disabled={true}/>
                        </InputGroup>

                        <InputGroup className="mt-4">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Código de Barras</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={this.handleInputCodigoBarrasOnChange}
                                value={this.state.codigoBarras}
                                disabled={true}/>
                        </InputGroup>

                        <InputGroup className="mt-4">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default" size='100px'>Precio</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={this.handleInputPrecioOnChange}
                                value={this.state.precio}/>
                        </InputGroup>
                    </FormGroup>


                    <Button variant='success' className="float-right mt-2" type='submit'
                            onClick={this.modificarProducto.bind(this)}>Modificar</Button>
                </div>
            </Form>
        )
    }
}

export default ModificarProducto