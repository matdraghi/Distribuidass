import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, ScrollView, Picker, Image, TouchableOpacity } from 'react-native'
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
             
            <TouchableOpacity onPress={() => {
                     this.Registro();
                }}>
                <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}> Registro </Text>
             </View>
             </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                     this.Login();
                }}>
                <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}> Iniciar Sesion</Text>
             </View>
             </TouchableOpacity>
            
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
});

export default Welcome