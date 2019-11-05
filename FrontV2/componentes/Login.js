import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, StatusBar, AsyncStorage, Image } from 'react-native'
import { Button, TextInput, Snackbar } from 'react-native-paper'
import Input from './input'

const UserInfo = {documento: '', password: ''}

export class Login extends Component {
    /*state = {
        documento: this.props.navigation.getParam('documento'),
        password: '',
        cambioPass: false,
        mensaje: '',
        mostrarMensaje: ''
    }*/

    /*constructor(props){
        super (props);
        this.state = 
        {
            documento: this.props.navigation.getParam('documento'),
            password: ''
        }
    }*/

    state = 
    {
        documento: this.props.navigation.getParam('documento'),
        password: ''
    }
    
   /* GetData (documento)  {
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
                    identificadores: k
              });
                }}
    }    
        )
    }*/
    getUsuarioValue(){
        return this.state.documento
    }
    autenticar = () => {
        const documento = this.state.documento
        const password = this.state.password
        const url = 'http://192.168.43.142:8080/myapp/Login?documento=' + documento + '&password=' + password;
        fetch(url)
            .then((res) => res.json()).then((json) => {
                console.log (json)
                if (json === true) {
                    UserInfo.documento = documento;
                    UserInfo.password = password;
                    this._login
                    this.handleSuccessfulLogin();
                }
                else {
                    this.mostrarMensaje(json.message)
                }
            }
            );
    }

    handleSuccessfulLogin = () => {
        this.mostrarMensaje("Bienvenido " + this.state.documento)
        
        this.props.navigation.navigate('ReclamosEdificio', { documento: this.state.documento })
        
        this.props.navigation.navigate('VerFoto', { documento: this.state.documento })
        this.props.navigation.navigate('ImagePicker', { documento: this.state.documento })
        
        this.props.navigation.navigate('ConsultarReclamos', { documento: this.state.documento })
        
        this.props.navigation.navigate('AltaReclamo', { documento: this.state.documento })
        
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
                <View style= {styles.container}>
                    
            <Image style={ styles.bgImage } source={require('../assets/Link.jpg') } />
                <TextInput
                    style={styles.input}
                    label='documento'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.documento}
                    onChangeText={documento => this.setState({ documento })}
                    keyboardType='default'
                />

                <TextInput
                    style={styles.input}
                    label='Password'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    textContentType='password'
                    secureTextEntry={true}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        style={styles.buttons}
                        mode="contained"
                        color = '#d32f2f'
                        onPress={this._login}
                    >
                        Iniciar Sesion
                    </Button>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        style={styles.buttons}
                        mode="contained"
                        color = '#d32f2f'
                        onPress={this.Welcome}
                    >
                        Volver A Inicio
                    </Button>
                </View>
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
                </View>
            </KeyboardAvoidingView>
        )
    }

    Welcome =( ) => {
        this.props.navigation.navigate ("Welcome")
    }
    _login = async() => {
        const documento = this.state.documento;
        const password = this.state.password;
        const url = 'http://192.168.43.142:8080/myapp/Login?documento=' + documento + '&password=' + password;
        fetch(url)
            .then((res) => res.json()).then((json) => {
                console.log (json)
                if (json === true) {
                    UserInfo.documento = '';
                    UserInfo.password = '';
                    
                //console.log (UserInfo.documento);
                //console.log (UserInfo.password);
                }
                else {
                    this.mostrarMensaje(json.message)
                }
            }
            );
            if (UserInfo.documento === '' && UserInfo.password=== ''){
                UserInfo.documento = this.state.documento;
                UserInfo.password = this.state.password;
            if (UserInfo.documento === this.state.documento && UserInfo.password === this.state.password
                ){
                await AsyncStorage.setItem("isLoggedIn", '1');
                await AsyncStorage.setItem("documento", this.state.documento);
            this.props.navigation.navigate('ReclamosEdificio', { documento: this.state.documento })
        
            this.props.navigation.navigate('VerFoto', { documento: this.state.documento })
            this.props.navigation.navigate('ImagePicker', { documento: this.state.documento })
        
             this.props.navigation.navigate('ConsultarReclamos', { documento: this.state.documento })
        
            this.props.navigation.navigate('AltaReclamos', { documento: this.state.documento })
            }
            else {
                alert ("Verifique sus credenciales!")
            }
        }
    }  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 50,
        color: 'white',
        position: 'absolute',
        top: 50,
          padding: '1%',
          textAlign: 'center',
          fontWeight: 'bold'
    
      },
    logo : {
        flex: 1,
        width: '90%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    input: {
        height: 50, //comment this out and TextInput wont work (some cases the grey background wont be there)
        width: 250,
        background: 'grey'
    },
    buttons: {
        width: '45%',
        height: 50,
        padding: 10,
        marginBottom: 10,
    },
    bgImage: {
        flex:1,
        position: "absolute",
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        resizeMode: 'cover'
    
    },
})

export default Login