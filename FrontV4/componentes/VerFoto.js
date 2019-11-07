import React, { Component } from 'react'
import { View, StyleSheet, Picker, ScrollView , Text, KeyboardAvoidingView, Image, TouchableOpacity} from 'react-native'
import { TextInput, Button, ActivityIndicator, Snackbar, DataTable, FAB, DarkTheme } from 'react-native-paper'


export class VerFoto extends Component {

    state = {
        reclamos : [],
        documento: this.props.navigation.getParam('documento'),
        mensaje: '',
        identificadores: [],
        id: "",
        idReclamo: "",
        mostrarMensaje: false,
        imagen : null,
        uri: '',
        Imagenes: []
    }


 
prueba = () => {
    
    const documento = this.state.documento;
    console.log ("DOC"+ this.state.documento)
    //alert (event.target.documento.value)
    //alert (documento)
    this.ObtenerIdentificadores(documento);
}
ObtenerIdentificadores(documento) {
    const url = 'http://192.168.43.90:8080/myapp/Reclamos/ObtenerIdReclamos?documento=' +  documento;
   

    fetch(url)
    .then((response) => response.json()).then((json) => {
        var j = JSON.stringify(json)
        console.log (j)
        var k = JSON.parse(j)
        for (var i in k) {
            // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
            if (k.hasOwnProperty(i)) {
              var entry = k[i];
              var id = entry.idReclamo
            this.setState({
            identificadores : k,
          });
        }
    }
        }
       
    )
    
}



BuscarFoto = () => {
    const IdReclamo = this.state.idReclamo;
    console.log (IdReclamo)
    const url = 'http://192.168.43.90:8080/myapp/ObtenerImagen?IdReclamo=' +  IdReclamo ;
   
  
    fetch(url)
    .then((response) => response.json()).then((json) => {
    
    
      //alert ("im " + json)
      this.setState({
          Imagenes : json,
      })
      console.log (Imagenes)
        }
       
    )
    
  }
    render() {
        return ( 
            
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <TextInput
                    style={styles.inputs}
                    label='documento'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.documento}
                />
                
                <TextInput
                    style={styles.inputs}
                    label='IdReclamo'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.idReclamo && String (this.state.idReclamo)}
          />
          <ScrollView>
          <Picker selectedValue={this.state.idReclamo}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ idReclamo: itemValue })
                    }>
                    {this.state.identificadores.map(identificadores =>
            <Picker.Item label={identificadores.idRe} value={identificadores.idRe} key={identificadores.idRe} />
                    )}
        </Picker>
        <TouchableOpacity onPress={() => {
                     this.prueba();
                }}>
                <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}> Obtener IdReclamoss </Text>
             </View>
             </TouchableOpacity>
             
       
             <TouchableOpacity onPress={() => {
                     this.BuscarFoto();
                }}>
                <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}> Ver Foto </Text>
             </View>
             </TouchableOpacity>
             {this.state.Imagenes.map(Imagenes =>
             <Image 
                    resizeMode="cover"
                    style={{height: 300, width: 300, margin: 10}}
                    source={{uri: Imagenes.path + Imagenes.file}}
                />
             )}
                 </ScrollView>
        </KeyboardAvoidingView>
           
           

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
        backgroundColor: 'grey'
    },
    pickers: {
        height: 50,
        width: '90%',
    },
    inputs: {
        width: '90%',
        height: 50,
        marginBottom: 5
    },
    button: {
        margin: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 5,
        backgroundColor: "#ADD8E6",
      },
      text: {
        color: '#fff',
        fontSize: 15
      }
})

export default VerFoto

