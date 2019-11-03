import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, StatusBar, AsyncStorage } from 'react-native'
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

    constructor(props){
        super (props);
        this.state = 
        {
            documento: '',
            password: ''
        }
    }
    
    getUsuarioValue(){
        return this.state.documento
    }
    autenticar = () => {
        const documento = this.state.documento
        const password = this.state.password
        const url = 'http://192.168.0.12:8080/myapp/Login?documento=' + documento + '&password=' + password;
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
                <View style= {styles.container}></View>
             <StatusBar
             backgroundColor = "#1e90ff"
             barStyle = "light-content"
             />
             <Text >Login To My App</Text>
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
                        color = '#00FFFF'
                        onPress={this._login}
                    >
                        Iniciar Sesion
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
                
            </KeyboardAvoidingView>
        )
    }

    _login = async() => {
        const documento = this.state.documento;
        const password = this.state.password;
        const url = 'http://192.168.0.12:8080/myapp/Login?documento=' + documento + '&password=' + password;
        fetch(url)
            .then((res) => res.json()).then((json) => {
                console.log (json)
                if (json === true) {
                    UserInfo.documento = documento;
                    UserInfo.password = password;
                    
                console.log (UserInfo.documento);
                console.log (UserInfo.password);
                }
                else {
                    this.mostrarMensaje(json.message)
                }
            }
            );
            if (UserInfo.documento === this.state.documento && UserInfo.password === this.state.password){
                await AsyncStorage.setItem("isLoggedIn", '1');
                await AsyncStorage.setItem("documento", this.state.documento);
            this.props.navigation.navigate('ReclamosEdificio', { documento: this.state.documento })
        
            this.props.navigation.navigate('VerFoto', { documento: this.state.documento })
            this.props.navigation.navigate('ImagePicker', { documento: this.state.documento })
        
             this.props.navigation.navigate('ConsultarReclamos', { documento: this.state.documento })
        
            this.props.navigation.navigate('AltaReclamos', { documento: this.state.documento })
            } }
           
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#1e90ff",
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
        width: '90%',
        height: 50,
        marginBottom: 10,
    },
    buttons: {
        width: '45%',
        height: 50,
        padding: 10,
        marginBottom: 10,
    },
})

export default Login