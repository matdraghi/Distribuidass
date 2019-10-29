import * as React from 'react';
import { Button, Image, View, StyleSheet, Picker, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, ActivityIndicator, Snackbar, TouchableWithoutFeedback } from 'react-native-paper'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class ImagePickerExample extends React.Component {
  state = {
    
    documento: this.props.navigation.getParam('documento'),
    image: null,
    
    uri: "",
    identificadores: [],
    id: "",
    idReclamo: "",
    numero: "",
  };

      
  prueba = () => {
    
    const documento = this.state.documento;
    console.log ("DOC"+ this.state.documento)
    //alert (event.target.documento.value)
    //alert (documento)
    this.ObtenerIdentificadores(documento);
}
ObtenerIdentificadores(documento) {
    const url = 'http://192.168.43.142:8080/myapp/Reclamos/ObtenerIdReclamos?documento=' +  documento;
   

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
    const url = 'http://192.168.43.142:8080/myapp/Asociar?numero=' +  n + "&idReclamo=" + id;
   

    fetch(url)
    .then((response) => response.json()).then((json) => {
      
        alert ("Asociando IdReclamo")
        }
    )
    
}


onChang = (event) => {
  
  event.preventDefault(); 
  var image = this.state.image
  const idReclamo = event.target.idReclamo.value;
  var id = JSON.parse (idReclamo)

  //alert (data)
  //alert (id)
  fetch('http://192.168.43.142:8080/myapp/savefilee?file=' + file).then((response) => response.json()).then((json) => {
    //alert (json)
    this.setState({
      numero : json,
    });

    //alert ("numero"+ this.state.numero);
    var n = this.state.numero;
    //alert ("!" + n)
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
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
        <Button variant="secondary" style={{display: 'flex', justifyContent: 'Left'}} className="right" type="reset" 
               title = "Obtener IdReclamos"
               onPress = {this.prueba}
        />

        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
      this.setState({ image: result.uri });
    }
  };
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
