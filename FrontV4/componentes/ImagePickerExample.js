import  React, { Component } from 'react';
import { Button, Image, View, StyleSheet, Picker, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, ActivityIndicator, Snackbar, TouchableWithoutFeedback } from 'react-native-paper'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export class ImagePickerExample extends Component {
  state = {
    
    documento: this.props.navigation.getParam('documento'),
    image: null,
    
    uri: "",
    identificadores: [],
    id: "",
    idReclamo: "",
    numero: "",
  };

      
  camara = () => {
    this.props.navigation.navigate('Camara', {receivedValue: this.receivedValue});
    
    console.log (this.state.uri)
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


  AsociarIdReclamo(n, id) {
    const url = 'http://192.168.43.90:8080/myapp/Asociar?numero=' +  n + "&idReclamo=" + id;
   

    fetch(url)
    .then((response) => response.json()).then((json) => {
      
        alert ("Asociando IdReclamo")
        
        }
    )
    
}
  
  

onChang = () => {
  const idReclamo = this.state.idReclamo;
  console.log ("Hi!!!!!!!!!!!!!!!  " + idReclamo);
  var id = JSON.parse (idReclamo)
  console.log ("Foto: " +this.state.image)
  const file = this.state.image
  console.log (file)
  fetch('http://192.168.43.90:8080/myapp/savefilee?file=' + file ).then((response) => response.json()).then((json) => {
    console.log ("Hola" + json)
    this.setState({
      numero : json,
    });
        

    alert ("numero"+ this.state.numero);
    var n = this.state.numero;
    alert ("!" + n)
    this.state.uri = json;
    this.AsociarIdReclamo(n, id)
    //alert (this.state.uri)
    this.handleUploadImage()
        
  })

}

 
handleUploadImage = () => {
  alert("Tu archivo ha sido subido con exito!");
  
}
  render() {
    let { image } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.container}>
        
      </View>

         <ScrollView>
         <TextInput
                    style={styles.inputs}
                    label='IdReclamo'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.idReclamo && String (this.state.idReclamo)}
          />
                
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
            <Text style={{color: 'white'}} style={styles.text}>Obtener Id Reclamoss</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.onChang();
        }}>
          <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}>Subir Imagen</Text>
          </View>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => {
          this._pickImage();
        }}>
          <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}>Elegir Imagen</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.camara();
        }}>
          <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}>Abrir Camara</Text>
          </View>
        </TouchableOpacity>
        {image &&
          <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />}
        </ScrollView>
        </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      console.log ("uri " + result.uri)
      this.setState({ image: result.uri });
      console.log (this.state.image)
    }
  };
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#ADD8E6",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
})

export default ImagePickerExample