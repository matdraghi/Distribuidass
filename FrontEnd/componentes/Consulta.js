import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import {TextInput, Button, DataTable, FAB, Snackbar } from 'react-native-paper'
import {trackPromise} from "react-promise-tracker"
import Loading from './Loading';

export class Consulta extends Component {

    state = {
        reclamos : [],
        IdReclamo: '',
        documento: '',
        codigo: '',
        ubicacion: '',
        descripcion: '',
        identificador: '',
        estado: ''
    }
    

    componentDidMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
           this.mostrarInfo()
         });
    }


      mostrarInfo = () => {
        const { navigation } = this.props;
        const documento = navigation.getParam(documento);
        const send = 'http://192.168.0.12:8080/myapp/Reclamos/ConsultarReclamo?Documento=' + documento
        trackPromise(
            fetch(send)
            .then((res) => res.json()).then((responseData) => {
                
                this.setState({ IdReclamo: responseData.IdReclamo })
                
                this.setState({ documento: responseData.documento })
                this.setState({ codigo: responseData.codigo })
                this.setState({ ubicacion: responseData.ubicacion })
                this.setState({descripcion: responseData.descripcion})
                
                this.setState({ identificador: responseData.identificador })
                
                this.setState({ estado: responseData.estado })
            })
        )
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
                    onPress={() => this.mostrarInfo()}
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#d32f2f'
    },
})

export default Consulta