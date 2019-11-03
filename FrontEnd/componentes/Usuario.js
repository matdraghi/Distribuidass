import React, { Component } from 'react'
import { View, StyleSheet, TouchableHighlightBase, AsyncStorage } from 'react-native'
import { Button } from 'react-native-paper'
import 'prop-types';

export class Usuario extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Button
                    style={styles.buttons}
                    mode="contained"
                    color = '#d32f2f'
                    onPress={this._logout}
                >
                    Cerrar Sesión
                </Button>
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
    },
    buttons: {
        width: '50%',
        height: 50,
        padding: 10,
        marginBottom: 10,
    }
})


export default Usuario