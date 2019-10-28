import React, { Component } from 'react'
import { View, StyleSheet, Picker, ScrollView, Alert} from 'react-native'
import { TextInput, Button, ActivityIndicator, Snackbar, TouchableWithoutFeedback } from 'react-native-paper'
import { trackPromise } from "react-promise-tracker";
import SmallLoading from './SmallLoading'
import RNPickerSelect from 'react-native-picker-select'

export class AltaProducto extends Component {

    
    state = {
        documento: this.props.navigation.getParam('documento'),
        codigo: '',
        ubicacion: '',
        descripcion: '',
        identificador: '',
        piso: '',
        nombre: '',
        mensaje: '',
        mostrarMensaje: false,
        codig: '',
        identificadores: [], 
    }




    nuevoReclamo = () => {
        const documento = this.state.documento;
        console.log("doc"+ documento)
        const codigo = this.state.codig;
        console.log("..." +codigo)
        const ubicacion = this.state.ubicacion;
        console.log("uBICACION"+ ubicacion)
        const descripcion = this.state.descripcion;
        console.log("Descripcion: "+descripcion)
        const identificador = this.state.identificador;
        console.log("Identificsdor:"+ identificador)
        const nombre = this.state.nombre;
        console.log(".." +nombre)
        const piso = this.state.piso;
        console.log("piso " +piso)
        const url = 'http://192.168.43.142:8080/myapp/Reclamos/alta?documento=' + documento + '&codigo=' + codigo + '&ubicacion=' + ubicacion + '&descripcion=' + descripcion + '&identificador=' + identificador + '&piso=' + piso + '&nombre=' + nombre;
        fetch(url)
            .then(res =>  res.json()).then((json) => {
                if (json == true) {
                    this.QueIdReclamo(documento, nombre, descripcion, piso)
                    this.handleSuccessfulReclamo();
                } 
                 else {
                    Alert.alert(
                        'Usted no se encuentra Autorizado',
                        'Por Favor Dirijase a la siguiente ventana',
                        [
                          {text: 'Ask me later', onPress: () =>  console.log ("IdReclamo..."+ json )},
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                      );
                        this.props.navigation.navigate('ReclamosEdificio', { documento: this.state.documento })
            }
        });
    }

    handleSuccessfulReclamo = () => {
        this.mostrarMensaje("Creado Reclamo con Doc " + this.state.documento)
        
        this.props.navigation.navigate('ConsultarReclamos', { documento: this.state.documento })
    }

    mostrarMensaje = (mensaje) => {
        this.setState({
            mensaje: mensaje,
            mostrarMensaje: true
        })
    }

    
    pruebaNombre= () => {
        const nombre = this.state.nombre;
        console.log (nombre)
        this.ObtenerIdentificadores(nombre);
    }

    ObtenerIdentificadores(nombre) {
        const url = 'http://192.168.43.142:8080/myapp/Reclamos/ObtenerIdentificadoress?nombre=' +  nombre;
        fetch(url)
        .then((response) => response.json()).then((json) => {
            var j = JSON.stringify(json)
            var k = JSON.parse(j)
            for (var i in k) {
                // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
                
                var entry = k[i];
                var codigo = entry.edificio.codigo
                if (k.hasOwnProperty(i)) {
                this.setState({
                identificadores : k,
                codig: codigo,
              });
              
            }
        }
            }
           
        )
        
    }

    QueIdReclamo(documento, nombre, descripcion, piso) {
        const url = 'http://192.168.43.142:8080/myapp/Reclamos/Obtener?documento=' +  documento + "&nombre=" + nombre + "&descripcion=" + descripcion + "&piso=" + piso ;
       

        fetch(url)
        .then((response) => response.json()).then((json) => {
          console.log ("IdReclamo..."+ json )
          Alert.alert(
            'Id Reclamo',
            json,
            [
              {text: 'Ask me later', onPress: () =>  console.log ("IdReclamo..."+ json )},
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
            }
           
        )
        
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                </View>
                
                <ScrollView>
                <TextInput
                    style={styles.inputs}
                    label='documento'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.documento}
                />

                <TextInput
                    style={styles.inputs}
                    label='Nombre'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.nombre}
                />
                <Picker
                    selectedValue={this.state.nombre}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ nombre: itemValue })
                    }>
                    <Picker.Item label="SLS Puerto Madero" value="SLS Puerto Madero" />
                    <Picker.Item label="The Link Towers" value="The Link Towers" />
                    <Picker.Item label="The Fire Place" value="The Fire Place" />
                    <Picker.Item label="Alvear Tower" value="Alvear Tower" />
                    <Picker.Item label="Dique Dos" value="Dique Dos" />
                    <Picker.Item label="Libertador Plaza" value="Libertador Plaza" />
                    <Picker.Item label="Chateau Libertador" value="Chateau Libertador" />
                    <Picker.Item label="The Tower" value="The Tower" />  
                    <Picker.Item label="Lizard Plaza" value="Lizard Plaza" />
                    </Picker>
                    <TextInput
                    style={styles.inputs}
                    label='ubicacion'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.ubicacion}
                />  
                <Picker
                    selectedValue={this.state.ubicacion}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ ubicacion: itemValue })
                    }>
                    <Picker.Item label="Mogliani 425" value="Mogliani 425" />
                    <Picker.Item label="Arrayanes 1230" value="Arrayanes 1230" />
                    <Picker.Item label="Bombares 50" value="Bombares 50" />
                    <Picker.Item label="Alvear 100" value="Alvear 100" />
                    <Picker.Item label="Maquinista Savio 990" value="Maquinista Savio 990" />
                    <Picker.Item label="Libertador 5600" value="Libertador 5600" />
                    <Picker.Item label="Libertador 5400" value="Libertador 5400" />
                    <Picker.Item label="Parana 300" value="Parana 300" />  
                    <Picker.Item label="Av. Lizard 1000" value="Av. Lizard 1000" />
                 </Picker>

                 <Button 
                    mode="contained" 
                    color = '#00FFFF' 
                    onPress={this.pruebaNombre}
                >
                    Obtener Identificadores/piso/codigo
                </Button>
                 <TextInput
                    style={styles.inputs}
                    label='codigo'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                  
                    value={this.state.codig && String (this.state.codig)}
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
                    value={this.state.identificador && String (this.state.identificador)}
                />

                <Picker selectedValue={this.state.identificador}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ identificador: itemValue })
                    }>
                    {this.state.identificadores.map(identificadores =>
                        <Picker.Item label={identificadores.id} value={identificadores.id} key={identificadores.id} />
                    )}
        </Picker>

                <TextInput
                    style={styles.inputs}
                    label='piso'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.piso && String (this.state.piso)}
                />
              
              <Picker selectedValue={this.state.piso}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ piso: itemValue })
                    }>
                    {this.state.identificadores.map(identificadores =>
                        <Picker.Item label={identificadores.piso} value={identificadores.piso} key={identificadores.piso} />
                    )}
                </Picker>
                
                <Button 
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
                </ScrollView>
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

/*

                <RNPickerSelect
                placeholder = {{
                    label: 'Select a code Number...',
                    value: null,
                }}
                onValueChange={ this.setState({
                    codigo : this.state.value,
                    
                  }), console.log(this.state.codigo)}

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

//Codigos!
                <Picker
                    selectedValue={this.state.codigo}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ codigo: itemValue })
                    }>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />  
                    <Picker.Item label="9" value="9" />
                    </Picker>
                */