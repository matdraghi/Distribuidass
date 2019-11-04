import React, { Component } from 'react'
import { View, StyleSheet, Picker, ScrollView, Alert, KeyboardAvoidingView } from 'react-native'
import { TextInput, Button, ActivityIndicator, Snackbar } from 'react-native-paper'
import { trackPromise } from "react-promise-tracker";
import SmallLoading from './SmallLoading'
import 'prop-types';

export class DetallesReclamos extends Component {
    state = {
        identificadores: [], 
        pisos: [], 
        documento: this.props.navigation.getParam('documento'),
        codigo: '',
        ubicacion: '',
        descripcion: '',
        identificador: '',
        piso: '',
        nombre: '',
        codig: '',
    } 

    pruebaNombre= () => {
        const nombre = this.state.nombre;
        this.ObtenerIdentificadoress(nombre);
    
    }
    ObtenerIdentificadoress(nombre) {
        const url = 'http://192.168.43.142:8080/myapp/Reclamos/ObtenerIdentificadoress?nombre=' +  nombre;
       

        fetch(url)
        .then((response) => response.json()).then((json) => {
            var j = JSON.stringify(json)
            console.log (j)
            var k = JSON.parse(j)
            for (var i in k) {
                console.log (i)
                // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
                if (k.hasOwnProperty(i)) {
                  var entry = k[i];
                  var entryy = k [i + 1];
                  var id = entry.id
                  console.log ("Codigo " +id)
                  var codigo = entry.edificio.codigo
                  console.log ("Codigo " +codigo)
                  var piso = entry.piso;
                  console.log (entry.piso);
                  if (piso != null){

                  }
                  
                this.setState({
                identificadores : k,
                codig: codigo,
              });


              console.log (this.state.codig)
            }
        }
        this.pisos (this.state.codig,this.state.documento);
            }
           
        )
        
    }

    pisos(codigo, documento) {
        var i = 0;
        const url = 'http://192.168.43.142:8080/myapp/Reclamos/Pisos?codigo=' +  codigo + "&documento=" + this.state.documento;
       console.log (url)

        fetch(url)
        .then((response) => response.json()).then((json) => {
          //alert (" "+ json );
          var j = JSON.stringify(json)
          console.log (j)
          var k = JSON.parse(j)
          console.log (k)
          for (var i in k) {
              // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
              
              var entry = k[i];
              console.log (entry); 
              if (k.hasOwnProperty(i)) {
              this.setState({
                  pisos: k
            });
        }
    }
        }
    
        )
        
    }
    cargarReclamo = () => {
        const documento = this.state.documento;
        console.log("doc"+ documento)
        const codigo = this.state.codig;
        console.log("..." +codigo)
        const ubicacion = this.state.ubicacion;
        console.log("uBICACION"+ ubicacion)
        const descripcion = this.state.descripcion;
        console.log("Descripcion: "+descripcion)
        const piso = this.state.piso;
        console.log("Piso:"+ piso)
        const nombre = this.state.nombre;
        console.log(".." +nombre)
        
        const url = 'http://192.168.43.142:8080/myapp/Reclamos/altaEdificio?documento=' + documento + '&codigo=' + codigo + '&ubicacion=' + ubicacion + '&descripcion=' + descripcion + "&nombre=" + nombre + "&piso=" + piso;
        //alert (url)

        fetch(url)
        .then((response) => response.json()).then((json) => {
            //alert (json)
            if (json === false){
            //alert ("Es Inquilino de la Unidad")
            
            this.QueIdReclamo(documento, nombre, descripcion, piso)
            this.handleSuccessfulReclamo(documento);
            }
        })
        
                
    }


    

    QueIdReclamo(documento, nombre, descripcion, piso) {
        const url = 'http://192.168.43.142:8080/myapp/Reclamos/Obtener?documento=' +  documento + "&nombre=" + nombre + "&descripcion=" + descripcion + "&piso=" + piso ;
       

        fetch(url)
        .then((response) => response.json()).then((json) => {
          alert ("IdReclamo..."+ json )
            
            }
           
        )
        
    }
    handleSuccessfulReclamo = () => {
        this.mostrarMensaje("Creado  DetalleReclamo con Doc " + this.state.documento)
        this.props.navigation.navigate('ConsultarReclamos', { documento: this.state.documento })
    }

    mostrarMensaje = (mensaje) => {
        this.setState({
            mensaje: mensaje,
            mostrarMensaje: true
        })
    }

    render() {
        return ( 
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            
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
                Obtener Piso/Codigo
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
                label='piso'
                underlineColor = '#d32f2f'
                selectionColor = '#d32f2f'
                value={this.state.piso && String (this.state.piso)}
            />
          
          <Picker selectedValue={this.state.piso}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ piso: itemValue })
                }>
                {this.state.pisos.map(pisos =>
                    <Picker.Item label={pisos.piso} value={pisos.piso} key={pisos.piso} />
                )}
            </Picker>
              <TextInput
                style={styles.inputs}
                label='descripcion'
                underlineColor = '#d32f2f'
                selectionColor = '#d32f2f'
                value={this.state.descripcion}
                onChangeText={descripcion => this.setState({descripcion })}
                keyboardType='default'
            />
            <Button 
                mode="contained" 
                color = '#d32f2f' 
                onPress={() => this.cargarReclamo()}
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
        </KeyboardAvoidingView>
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


/* Alert.alert(
            'Id Reclamo',
            json,
            [
              {text: 'Ask me later'},
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );*/