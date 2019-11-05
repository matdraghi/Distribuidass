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
                
            <Image style={ styles.bgImage } source={require('../assets/Logo2.jpeg') } />
             
                <Button
                    style={styles.buttons}
                    mode="contained"
                    color = '#00CED1'
                    onPress={this.Registro}
                >
                    
                <Text style={{color: 'white'}}> Registrarse </Text>
                </Button>
                <Button
                    style={styles.buttons}
                    mode="contained"
                    color = '#00CED1'
                    onPress={this.Login}
                >
                    
                <Text style={{color: 'white'}}> Iniciar Sesion </Text>
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
        
        backgroundColor: 'grey'
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