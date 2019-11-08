import React, { Component } from 'react'
import { RefreshControl, View, StyleSheet, Picker, ScrollView, Alert,Text, KeyboardAvoidingView, AsyncStorage, Modal, TouchableOpacity} from 'react-native'
import { TextInput, Button, ActivityIndicator, Snackbar, TouchableWithoutFeedback } from 'react-native-paper'
import { trackPromise } from "react-promise-tracker";
import SmallLoading from './SmallLoading'
import RNPickerSelect from 'react-native-picker-select'

import AwesomeAlert from 'react-native-awesome-alerts';


const AltaInfo = {documento: '', nombre: '', codigo: '', ubicacion: '', piso:'', identificador: '', descripcion:''}
export class AltaReclamo extends Component {
    componentWillMount() {
        this._LoaRe()
      }
     state = 
        {
            documento: this.props.navigation.getParam('documento'),
            codig: this.props.navigation.getParam('codig') ,
            nombre: this.props.navigation.getParam('nombre'),
            ubicacion: this.props.navigation.getParam('ubicacion'),
            piso: this.props.navigation.getParam('piso'),
            identificador: this.props.navigation.getParam('identificador'),
            descripcion: this.props.navigation.getParam('descripcion'),
            identificadores: [],
            hola: [],
            showAlert: false,
            IDreclamo: '',
            refreshing: false,

        }

        _LoaRe = async( ) => {
            console.log ("oaaa")
            const nomb = await AsyncStorage.getItem("nombre");
            console.log (nomb)
            const ubica = await AsyncStorage.getItem("ubicacion");
            console.log (ubica)
            const descrip = await AsyncStorage.getItem("descripcion");
            //this.state.descrpcion
            console.log (descrip)
            const p =await AsyncStorage.getItem("piso");
            console.log (p)
            const c = await AsyncStorage.getItem("codigo");
            console.log ("Codigo guardado: " + c)
            const identif = await AsyncStorage.getItem("identificador");
            console.log (identif)
            
            
        }

        showAlert = () => {
            this.setState({
              showAlert: true
            });
          };
         
          hideAlert = () => {
            this.setState({
              showAlert: false
            });
          };

          onRefresh = () => {
            this.setState({ refreshing: true,
                            nombre: '',
                            ubicacion: '',
                            descripcion: '',
                             identificador: '',
                             piso: '',
                            codig: '' });
            // In actual case set refreshing to false when whatever is being refreshed is done!
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 2000);
          };
    receivedValue = (uri) => {
        this.setState({uri})
      }     
    camara = () => {
        this.props.navigation.navigate('Camara', {receivedValue: this.receivedValue});
        
        console.log (this.state.uri)
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
                    hola: k
              });
                }}
        this.setState({
            refreshing: false,
        });
    }    
        )
    }
    nuevoReclamo = async () => {
        
        const c = 0;
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
                    
                                
                    this.QueIdReclamo(documento, nombre, descripcion, piso)
                    this.UstedEs();
                   
                } 
                 else if (json == false || json == null) {
                        this.NoAutorizado()             
                       //this.props.navigation.navigate('ReclamosEdificio', { documento: this.state.documento })
            }

            AltaInfo.nombre = nombre;
            console.log (AltaInfo.nombre + "lallnmdsfdsnfdsub")
            AltaInfo.ubicacion = ubicacion;
            
            console.log (AltaInfo.ubicacion + "lallnmdsfdsnfdsub")
            AltaInfo.codigo = codigo;
            console.log (AltaInfo.codigo+ "cc")
            AltaInfo.descripcion = descripcion;
            
            console.log (AltaInfo.descripcion + "lallnmdsfdsnfdsub")
            AltaInfo.piso = piso;
            
            console.log (AltaInfo.piso + "lallnmdsfdsnfdsub")
            AltaInfo.identificador = identificador;
            
            console.log (AltaInfo.identificador + "lallnmdsfdsnfdsub")

            
        if (this.state.nombre === 'SLS Puerto Madero'){
            c = 1;
       }else if (this.state.nombre === 'The Link Towers'){
            c= 2;
       }else if (this.state.nombre === 'The Fire Place'){
            c = 3;
       }else if (this.state.nombre === 'Alvear Tower'){
            c = 4;
       }else if (this.state.nombre === 'Dique Dos'){
            c = 5;
       }else if (AltaInfo.nombre === 'Libertador Plaza'){
            c = 6;
       }else if (AltaInfo.nombre === 'Chateau Libertador'){
            c = 7;
       }else if (AltaInfo.nombre === 'The Tower'){
            c = 8;
       }else if (AltaInfo.nombre === 'Lizard Plaza'){
            c = 9;
       }
       console.log ("ññalala      " + c)
        });


            await AsyncStorage.setItem("nombre", this.state.nombre);
            await AsyncStorage.setItem("ubicacion", this.state.ubicacion);
            await AsyncStorage.setItem("descripcion", this.state.descripcion);
            await AsyncStorage.setItem("piso", this.state.piso);
            await AsyncStorage.setItem("identificador", this.state.identificador);
            const json = JSON.stringify(this.state.codig)
            await AsyncStorage.setItem("codigo", json);
}
    

    handleSuccessfulReclamo = () => {
        this.mostrarMensaje("Creado Reclamo con Doc " + this.state.documento)
       
        this.props.navigation.navigate('ConsultarReclamos', { documento: this.state.documento })
    }

    MostarId = () => {
        this.mostrarMensaje("Su numero de Reclamo es : " + this.state.IDreclamo)
    }

    UstedEs = () => {
        this.mostrarMensaje("Usted es inquilino o duenio de una unidad" + this.state.documento)
    }

    NoAutorizado = () => {
        this.mostrarMensaje("Usted NO se encuentra autorizado a realizar dicha accion ")
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
          //alert ("IdReclamo..."+ json );
          this.setState({
            IDreclamo: json,
          });
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
        
    }
    
    
    LimpiarInfo = async () =>{
        await AsyncStorage.removeItem("nombre")
        await AsyncStorage.removeItem("ubicacion")     
        await AsyncStorage.removeItem("descripcion")
        await AsyncStorage.removeItem("piso")
        await AsyncStorage.removeItem("identificador")
        await AsyncStorage.removeItem("codigo")

        this.mostrarMensaje("Los Datos Han sido Borrados, hacer Refresh de la pagina! ")
    }
  
    render() {
        const {showAlert} = this.state;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                </View>
                 <ScrollView
                refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />
                }>
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
                    {this.state.hola.map(hola =>
                        <Picker.Item label={hola.nombre} value={hola.nombre} key={hola.nombre} />
                    )}
                </Picker>
                   

                <TouchableOpacity onPress={() => {
                        this.GetData();
                    }}>
          <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}>Obtener Nombre/Ubicacion</Text>
          </View>
             </TouchableOpacity>
              
             <TextInput
                    style={styles.inputs}
                    label='ubicacion'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.ubicacion}
                />  

                <Picker selectedValue={this.state.ubicacion}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ ubicacion: itemValue })
                    }>
                    {this.state.hola.map(hola =>
                        <Picker.Item label={hola.ubicacion} value={hola.ubicacion} key={hola.ubicacion} />
                    )}
                </Picker>
               
                <TouchableOpacity onPress={() => {
                     this.pruebaNombre();
                    }}>
          <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}>Obtener Identificadores/Codigo/ Pisos</Text>
          </View>
        </TouchableOpacity>
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
                    {this.state.identificadores.map(identificadores =>
                        <Picker.Item label={identificadores.piso} value={identificadores.piso} key={identificadores.piso} />
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
                    {this.state.identificadores.map(identificadores =>
                        <Picker.Item label={identificadores.identificador} value={identificadores.identificador} key={identificadores.identificador} />
                    )}
                 </Picker>
                
        <TouchableOpacity onPress={() => {
          this.showAlert();
        }}>
          <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}> Crear Alta Reclamo</Text>
          </View>
        </TouchableOpacity>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Desea realizar el alta del Reclamo?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancelar"
          confirmText="Si, Confirmar Alta "
          confirmButtonColor="#008000"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.nuevoReclamo();
            this.hideAlert();
          }}
        />
    
      
    <TouchableOpacity onPress={() => {
          this.MostarId();
        }}>
          <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}> IdReclamo Generado?</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.camara();
        }}>
          <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}>Abrir Camara</Text>
          </View>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => {
                        this.LimpiarInfo();
                    }}>
          <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}>Limpiar Informacion</Text>
          </View>
             </TouchableOpacity>

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

export default AltaReclamo