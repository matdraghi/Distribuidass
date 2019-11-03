import React, { Component } from 'react'
import { View, StyleSheet, Picker, ScrollView , Text, KeyboardAvoidingView, Image} from 'react-native'
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
        uri: ''
    }


 
prueba = () => {
    
    const documento = this.state.documento;
    console.log ("DOC"+ this.state.documento)
    //alert (event.target.documento.value)
    //alert (documento)
    this.ObtenerIdentificadores(documento);
}
ObtenerIdentificadores(documento) {
    const url = 'http://192.168.0.12:8080/myapp/Reclamos/ObtenerIdReclamos?documento=' +  documento;
   

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
    const url = 'http://192.168.0.12:8080/myapp/ObtenerImagen?IdReclamo=' +  IdReclamo ;
   
  
    fetch(url)
    .then((response) => response.json()).then((json) => {
    
    
      alert ("im " + json)
      this.setState({
          imagen : json,
      })
      console.log (imagen)
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
                <Button mode="contained" 
                    color = '#d32f2f' 
                    onPress={this.prueba}>
                                Obtener IdReclamoss
             </Button>
             
       
             <Button mode="contained" 
                    color = '#d32f2f' 
                    onPress={this.BuscarFoto}>
                                Ver Foto
             </Button>
             <Image 
                    resizeMode="cover"
                    style={{height: 300, width: 300}}
                    source={{uri: this.state.imagen}}
                />
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

export default VerFoto

/*   
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
                <Button mode="contained" 
                    color = '#d32f2f' 
                    onPress={this.prueba}>
                                Obtener IdReclamoss
             </Button>
             
        </ScrollView>
             <Button mode="contained" 
                    color = '#d32f2f' 
                    onPress={this.BuscarFoto}>
                                Ver Foto
             </Button>
*/