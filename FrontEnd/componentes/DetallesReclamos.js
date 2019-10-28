import React, { Component } from 'react'
import { View, StyleSheet, Picker } from 'react-native'
import { TextInput, Button, ActivityIndicator, Snackbar } from 'react-native-paper'
import { trackPromise } from "react-promise-tracker";
import SmallLoading from './SmallLoading'
import 'prop-types';

export class DetallesReclamos extends Component {

    state = {
        codigo: '',
        piso: '',
        ubicacion: '',
        identificador: '',
        mensaje: '',
        mostrarMensaje: false,
    }




    nuevoReclamo = () => {
        const piso = this.state.piso;
        
        const codigo = this.state.codigo;
        
        const ubicacion = this.state.ubicacion;
       
        const identificador = this.state.identificador;

        const url = 'http://192.168.0.12:8080/myapp/Reclamos/alta/SolicitarDetalles?codigo=' + codigo + '&piso=' + piso + '&identificador=' + identificador +'&ubicacion=' + ubicacion;
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
        this.mostrarMensaje("Creado  DetalleReclamo con Doc " + this.state.documento)
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
                    label='codigo'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.codigo}
                    onChangeText={codigo => this.setState({ codigo })}
                    keyboardType='default'
                />
                <TextInput
                    style={styles.inputs}
                    label='piso'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.piso}
                    onChangeText={piso => this.setState({ piso })}
                    keyboardType='number-pad'
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
                <TextInput
                    style={styles.inputs}
                    label='ubicacion'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.ubicacion}
                    onChangeText={ubicacion => this.setState({ ubicacion })}
                    keyboardType='default'
                />
                <Button 
                    mode="contained" 
                    color = '#d32f2f' 
                    onPress={() => this.nuevoReclamo()}
                >
                    Nuevo Detalle Reclamo
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

export default DetallesReclamos