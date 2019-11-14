import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, ScrollView, Picker, Image, StatusBar, TouchableOpacity} from 'react-native'
import { Button, TextInput, Snackbar } from 'react-native-paper'

export class Registro extends Component {
    state = {
        documento: '',
        password: '',
        tipo: '',
        cambioPass: false,
    }

    getUsuarioValue(){
        return this.state.documento
    }
    autenticar = () => {
        const documento = this.state.documento
        const password = this.state.password
        const url = 'http://192.168.43.142:8080/myapp/Registro?Documento=' + documento + '&Password=' + password;
        fetch(url)
            .then((res) => res.json()).then((json) => {
                console.log (json)
                if (json === true) {
                    alert ("Usuario con Documento: " + this.state.documento + " Ha sido creado con exito");
                    this.props.navigation.navigate('Login', { documento: this.state.documento })
                }
                else if (json === false){
                    alert ("Ya existe  un usuario como registrado con el documento: " + this.state.documento);
                    this.props.navigation.navigate('Login', { documento: this.state.documento })
                }
            }
            );
    }

   
    Welcome =( ) => {
        this.props.navigation.navigate ("Welcome")
    }
    render() {
        return ( <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
             <View style= {styles.container}>
                 
            <Image style={ styles.bgImage } source={require('../assets/Logo2.jpeg') } />
             
                <TextInput
                    style={styles.input}
                    label='Tipo + Nro Documento'
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
                    keyboardType= 'default'
                />
                 <TouchableOpacity onPress={() => {
                     this.autenticar();
                }}>
                <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}> Registrarse</Text>
             </View>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => {
                     this.Welcome();
                }}>
                <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}> Volver A Inicio</Text>
             </View>
             </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
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
        
      width: 250,
      height: 50,
      marginBottom: 5
    },
    buttons: {
        width: '45%',
        height: 50,
        padding: 10,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
        backgroundColor: 'grey'
    },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch',
        justifyContent: 'center',
      },
    
      loginForm: {
        backgroundColor: 'transparent',
        alignItems: 'center',
      },
    
      text: {
        fontSize: 30,
        fontWeight: 'bold',
      }, 
      bgImage: {
        flex:1,
        position: "absolute",
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        resizeMode: 'cover'
    
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

export default Registro