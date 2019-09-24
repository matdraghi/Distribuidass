import React, { Component } from 'react'
import { View, StyleSheet, Picker } from 'react-native'
import { TextInput, Button, ActivityIndicator, Snackbar } from 'react-native-paper'
import { trackPromise } from "react-promise-tracker";
import SmallLoading from './SmallLoading'
import RNPickerSelect from 'react-native-picker-select'

export class AltaProducto extends Component {

    state = {
        documento: '',
        codigo: '',
        ubicacion: '',
        descripcion: '',
        identificador: '',
        mensaje: '',
        mostrarMensaje: false,
    }




    nuevoReclamo = () => {
        const documento = this.state.documento;
        
        const codigo = this.state.codigo;
        
        const ubicacion = this.state.ubicacion;
        
        const descripcion = this.state.descripcion;
        
        const identificador = this.state.identificador;

        const url = 'http://192.168.0.12:8080/myapp/Reclamos/alta?documento=' + documento + '&codigo=' + codigo + '&ubicacion=' + ubicacion + '&descripcion=' + descripcion + '&identificador=' + identificador;
        fetch(url)
            .then(res =>  res.json()).then((json) => {
                if (json == true) {
                    this.handleSuccessfulReclamo();
                } 
                 else {
                        this.mostrarMensaje(json.message)
            }
        });
    }

    handleSuccessfulReclamo = () => {
        this.mostrarMensaje("Creado Reclamo con Doc " + this.state.documento)
        this.props.navigation.navigate('App', { documento: this.state.documento })
    }

    mostrarMensaje = (mensaje) => {
        this.setState({
            mensaje: mensaje,
            mostrarMensaje: true
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                </View>
                <TextInput
                    style={styles.inputs}
                    label='documento'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.documento}
                    onChangeText={documento => this.setState({ documento })}
                    keyboardType='default'
                />
                
                <RNPickerSelect
                placeholder = {{
                    label: 'Select a code Number...',
                    value: null,
                }}
                onValueChange={(value) => console.log(value)}

                items={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                 ]}
                />

                 <TextInput
                    style={styles.inputs}
                    label='codigo'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    
                    items={[
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                         ]}
                    value={this.state.codigo.items}
                    onChangeText={codigo => this.setState({ codigo })}
                 />

                <TextInput
                    style={styles.inputs}
                    label='ubicacion'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.ubicacion}
                    onChangeText={ubicacion => this.setState({ ubicacion })}
                    keyboardType='default'
                />
                <TextInput
                    style={styles.inputs}
                    label='descripcion'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.descripcion}
                    onChangeText={descripcion => this.setState({descripcion })}
                    keyboardType='default'
                />
                 <TextInput
                    style={styles.inputs}
                    label='identificador'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.identificador}
                    onChangeText={identificador => this.setState({identificador })}
                    keyboardType='number-pad'
                />
                <Button 
                    icon="add-circle-outline" 
                    mode="contained" 
                    color = '#d32f2f' 
                    onPress={() => this.nuevoReclamo()}
                >
                    Crear Nuevo Reclamo
                </Button>
                <Snackbar
                    visible={this.state.mostrarMensaje}
                    onDismiss={() => { this.setState({ mostrarMensaje: false }) }}
                    action={{
                        label: 'OK',
                        onPress: () => { this.setState({ mostrarMensaje: false }) }
                    }}
                >
                    {this.state.mensaje}
                </Snackbar>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickers: {
        height: 50,
        width: '90%',
    },
    inputs: {
        width: '90%',
        height: 50,
        marginBottom: 5
    }
})

export default AltaProducto