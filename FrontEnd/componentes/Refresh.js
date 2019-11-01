//This is an example code for React Native Swipe Down  to Refresh ListView Using RefreshControl//
import React, { Component } from 'react';
//import react in our code.
 
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Alert,
  RefreshControl,Picker, ScrollView
} from 'react-native';
//import all the components we are going to use.
import { TextInput, Button} from 'react-native-paper'


 
export class Refresh extends Component {
constructor(props) {
    super(props);
    //True to show the loader
    this.state = { refreshing: true };
    this.state = {descripcion : ''}
    
    this.state = {codig : ''}
    this.state = {codigo: ''}
    this.state = {ubicacion: ''}
    this.state = {identificador: ''}
    this.state = {piso: ''}
    this.state = {nombre: ''}
    this.state = {dataSource: []}
    //Running the getData Service for the first time
    this.GetData();
  }
  GetData = () => {
    //Service to get the data from the server to render
         
    console.log ("estoy aca " + this.state.documento)
    return fetch('http://192.168.43.142:8080/myapp/Reclamos/Nombres?documento='+ this.state.documento)
    .then(res =>  res.json()).then((json) => {
        var j = JSON.stringify(json)
        //console.log (j)
        var k = JSON.parse(j)
        //console.log (k)
        for (var i in k) {
            // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
            
            var entry = k[i];
            console.log (entry); 
            if (k.hasOwnProperty(i)) {
            this.setState({
          //Setting the data source for the list to render
                dataSource: k
          });
            }}
    this.setState({
        refreshing: false,
    });
}    
    )
}
/*
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
          console.log (json)
          if (json == true) {
              alert ("es inquilino y esta alquilando esa unidad / O es duenio de la unidad")
              this.QueIdReclamo(documento, nombre, descripcion, piso)
              this.handleSuccessfulReclamo();
          } 
           else if (json == false || json == null) {
              Alert.alert(
                  'Usted no se encuentra Autorizado dado que no es el duenio del identificador ingresado',
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
          codig: codigo,
        });
        
        
      }
  }
  
  this.IdentificadorDuenio (this.state.codig,this.state.documento);
      }
     
  )
  
}

QueIdReclamo(documento, nombre, descripcion, piso) {
  const url = 'http://192.168.43.142:8080/myapp/Reclamos/Obtener?documento=' +  documento + "&nombre=" + nombre + "&descripcion=" + descripcion + "&piso=" + piso ;
 

  fetch(url)
  .then((response) => response.json()).then((json) => {
    alert ("IdReclamo..."+ json );
       
      }
     
  )
  
}


IdentificadorDuenio(codigo, documento) {
  var i = 0;
  const url = 'http://192.168.43.142:8080/myapp/Reclamos/Identificad?codigo=' +  codigo + "&documento=" + this.state.documento;
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
            identificadores: k
      });
  }
}
  }

  )
  
}*/




  ListViewItemSeparator = () => {
    return (
      //returning the listview item saparator view
      <View
        style={{
          height: 0.2,
          width: '90%',
          backgroundColor: '#808080',
        }}
      />
    );
  };
  onRefresh() {
    //Clear old data of the list
    this.setState({ dataSource: [] , 
        documento: this.props.navigation.getParam('documento')});
    //Call the Service to get the latest data
    this.GetData();
  }
  render() {
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //Returning the ListView
      <View style={styles.MainContainer}>
         
         <ScrollView
         contentContainerStyle={styles.scrollView}
         
          refreshControl={
            
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
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
                 <Picker selectedValue={this.state.nombre}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ nombre: itemValue })
                    }>
                    {this.state.dataSource.map(dataSource =>
                        <Picker.Item label={dataSource.nombre} value={dataSource.nombre} key={dataSource.nombre} />
                    )}
                </Picker>
                <TextInput
                    style={styles.inputs}
                    label='Ubicacion'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.ubicacion}
                />
                 <Picker selectedValue={this.state.ubicacion}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ ubicacion: itemValue })
                    }>
                    {this.state.dataSource.map(dataSource =>
                        <Picker.Item label={dataSource.ubicacion} value={dataSource.ubicacion} key={dataSource.ubicacion} />
                    )}
                </Picker>
                
                
               <TextInput
                    style={styles.inputs}
                    label='Descripcion'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.descripcion}
                    onChangeText={descripcion => this.setState({descripcion })}
                    keyboardType='default'
                />
                
       

        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
  },
  rowViewContainer: {
    fontSize: 20,
    padding: 10,
  },
  inputs: {
    width: '90%',
    height: 50,
    marginBottom: 5
}, scrollView: {
  flex: 1,
  backgroundColor: 'pink',
  alignItems: 'center',
  justifyContent: 'center',
},
});


export default Refresh


/*   

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
                    label='piso'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.piso && String (this.state.piso)}
                />
              
              <Picker selectedValue={this.state.piso}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ piso: itemValue })
                    }>
                    {this.state.dataSource.map(dataSource =>
                        <Picker.Item label={dataSource.piso} value={dataSource.piso} key={dataSource.piso} />
                    )}
                </Picker>

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
                    {this.state.dataSource.map(dataSource =>
                        <Picker.Item label={dataSource.identificador} value={dataSource.identificador} key={dataSource.identificador} />
                    )}
                 </Picker>
                <Button 
                    mode="contained" 
                    color = '#d32f2f' 
                    onPress={() => this.nuevoReclamo()}
                >
                    Crear Nuevo Reclamo
                </Button>*/