import React, { Component } from 'react'
import { View, StyleSheet, Picker, ScrollView } from 'react-native'
import { TextInput, Button, ActivityIndicator, Snackbar, DataTable, FAB } from 'react-native-paper'
import { trackPromise } from "react-promise-tracker";
import SmallLoading from './SmallLoading'
import Loading from './Loading';
import 'prop-types';

export class ConsultarReclamo extends Component {

    state = {
        reclamos : [],
        IdReclamo: '',
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
        

        const url = 'http://192.168.0.12:8080/myapp/Reclamos/ConsultarReclamo?Documento=' + documento ;
        fetch(url)
            .then(res =>  res.json()).then((json) => {
                console.log ("JSON " + json)
                    this.state({
                        reclamos: this.state.reclamos.map(url)
                    })
                   // this.handleSuccessfulReclamo();
                   console.log (reclamos)
                
                 if (json == false) {
                        this.mostrarMensaje(json.message)
            }
        });
    }

    handleSuccessfulReclamo = () => {
        this.mostrarMensaje("Consultando Reclamo  " + this.state.documento)
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
            <View style = {styles.container}>
                <TextInput
                    style={styles.inputs}
                    label='documento'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.documento}
                    onChangeText={documento => this.setState({ documento })}
                    keyboardType='default'
                />
                <Button 
                    icon="add-circle-outline" 
                    mode="contained" 
                    color = '#d32f2f' 
                    onPress={() => this.nuevoReclamo()}
                >
                    Consultar Reclamo
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
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title numeric>IdReclamo</DataTable.Title>
                        <DataTable.Title numeric>codigo</DataTable.Title>
                        <DataTable.Title >ubicacion</DataTable.Title>
                        <DataTable.Title >descripcion</DataTable.Title>
                        <DataTable.Title numeric>identificador</DataTable.Title>
                        
                        <DataTable.Title >estado</DataTable.Title>
                    </DataTable.Header>
                    <Loading/>
                    <ScrollView>
                    {this.state.reclamos.map((reclamos) =>
                    
                            <DataTable.Row>
                                <DataTable.Cell numeric>{reclamos.IdReclamo}</DataTable.Cell>
                                <DataTable.Cell >{reclamos.documento}</DataTable.Cell>
                                <DataTable.Cell numeric>{reclamos.codigo}</DataTable.Cell>
                                <DataTable.Cell >{reclamos.ubicacion}</DataTable.Cell>
                                <DataTable.Cell >{reclamos.descripcion}</DataTable.Cell>
                                <DataTable.Cell numeric>{reclamos.identificador}</DataTable.Cell>
                                <DataTable.Cell >{reclamos.estado}</DataTable.Cell>
                            </DataTable.Row>
                    )}
                    </ScrollView>
                </DataTable>
            </View>
           /* <View style={styles.container}>
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
                <Button 
                    icon="add-circle-outline" 
                    mode="contained" 
                    color = '#d32f2f' 
                    onPress={() => this.nuevoReclamo()}
                >
                    Consultar Reclamo
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
            </View>*/
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

export default ConsultarReclamo