import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text } from 'react-native'
import { Button, TextInput, Snackbar } from 'react-native-paper'

export class Registro extends Component {
    state = {
        documento: '',
        password: '',
        cambioPass: false,
        mensaje: '',
        mostrarMensaje: ''
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
                    this.props.navigation.navigate('Login', { documento: this.state.documento })
                }
                else if (json === false){
                    alert ("Usuario ya existe como registrado en la BD!!!!");
                    this.props.navigation.navigate('Login', { documento: this.state.documento })
                }
            }
            );
    }

   

    render() {
        return ( <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
             <Text 
                  style={styles.label}>
                  Registro
              </Text>
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
                        onPress={() => this.autenticar()}
                    >
                        Registrarse
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

export default Registro