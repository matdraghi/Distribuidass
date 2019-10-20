import React, { Component } from 'react'
import { View, StyleSheet, Picker, ScrollView , Text} from 'react-native'
import { TextInput, Button, ActivityIndicator, Snackbar, DataTable, FAB } from 'react-native-paper'
import { trackPromise } from "react-promise-tracker";
import SmallLoading from './SmallLoading'
import Loading from './Loading';
import 'prop-types';


export class ConsultarReclamo extends Component {

    state = {
        reclamos : [],
        documento: this.props.navigation.getParam('documento'),
        mensaje: '',
        mostrarMensaje: false,
    }


    nuevoReclamo = () => {
        const documento = this.state.documento;
        console.log (documento);

        const url = 'http://192.168.0.12:8080/myapp/Reclamos/Consultar?Documento=' + documento ;
        fetch(url)
        .then(res =>  res.json()).then((json) => {
            console.log ("entre")
            console.log(json);
            var j = JSON.stringify(json)
            console.log (j)
            var k = JSON.parse(j)
            for (var i in k) {
                // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
                if (k.hasOwnProperty(i)) {
                  var entry = k[i];
                  var id = entry.id
                this.setState({
                reclamos : k,
              });
            }
        }    
              
           
            if (json == true) {
                this.handleSuccessfulReclamo();
            } 
             else {
             this.mostrarMensaje(json.message)
        }
    });
}


/*
    OkReclamo(data){
        if (data!= null){
            var i , r = [];
            for (i = 0; i < data.length; i++){
                r.push({
                    idReclamo : data.IdReclamo,
                    documento: data.documento

                 } );
            }
            this.setState({reclamos: r});
        }
    }*/

    
    handleSuccessfulReclamo = () => {
        this.mostrarMensaje("Consultando Reclamo : " + documento)
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
                        <DataTable.Title>IdReclamo</DataTable.Title>
                        
                        <DataTable.Title>Documento</DataTable.Title>
                        <DataTable.Title>Codigo</DataTable.Title>
                        <DataTable.Title >Ubicacion</DataTable.Title>
                        <DataTable.Title>Descripcion</DataTable.Title>
                        <DataTable.Title >Identificador</DataTable.Title>
                        
                        <DataTable.Title >Piso</DataTable.Title>
                       
                        <DataTable.Title numeric>Nombre Edificio</DataTable.Title> 
                        <DataTable.Title>Estado</DataTable.Title>
                    </DataTable.Header>
                    <Loading/>
                    <ScrollView>
                    {this.state.reclamos.map((reclamos) =>
                    
                            <DataTable.Row>
                                <DataTable.Cell>{reclamos.idReclamo}</DataTable.Cell>
                                
                                <DataTable.Cell>{reclamos.documento}</DataTable.Cell>
                                <DataTable.Cell>{reclamos.codigo}</DataTable.Cell>
                                <DataTable.Cell >{reclamos.ubicacion}</DataTable.Cell>
                                <DataTable.Cell>{reclamos.descripcion}</DataTable.Cell>
                                <DataTable.Cell >{reclamos.identificador}</DataTable.Cell>
                                
                                <DataTable.Cell >{reclamos.p}</DataTable.Cell>
                                <DataTable.Cell >{reclamos.nombre}</DataTable.Cell>
                                
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