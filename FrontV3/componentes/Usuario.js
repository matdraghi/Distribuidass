import React, { Component } from 'react'
import { View, StyleSheet, TouchableHighlightBase,Text, AsyncStorage, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import 'prop-types';

export class Usuario extends Component {

    render() {
        return (
            <View style={styles.container}>
                 <TouchableOpacity onPress={() => {
                     this._logout();
                }}>
          <View style={styles.button}>
            <Text style={{color: 'white'}} style={styles.text}> Cerrar Sesion</Text>
          </View>
        </TouchableOpacity>
            </View>
        )
    }
    _logout = async () =>{
        await AsyncStorage.clear();
        this.props.navigation.navigate("Auth")
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
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
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


export default Usuario