import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, ScrollView, Picker, Image } from 'react-native'
import { Button, TextInput, Snackbar } from 'react-native-paper'

export  class Welcome extends Component{
    Registro = () => {
        this.props.navigation.navigate("Registro")
    }

    Login = () => {
        this.props.navigation.navigate("Login")
    }
    render() {
        return (
            <View style={styles.container}>
                
            <Image style={ styles.bgImage } source={require('../assets/Link.jpg') } />
             
                <Button
                    style={styles.buttons}
                    mode="contained"
                    color = '#d32f2f'
                    onPress={this.Registro}
                >
                    Registrarse
                </Button>
                <Button
                    style={styles.buttons}
                    mode="contained"
                    color = '#d32f2f'
                    onPress={this.Login}
                >
                    Iniciar Sesion
                </Button>
            
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        width: '45%',
        height: 50,
        padding: 10,
        marginBottom: 10,
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1 
},  backgroundImage: {
    flex: 1,
    
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'stretch'
}, bgImage: {
    flex:1,
    position: "absolute",
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'cover'

},
});

export default Welcome