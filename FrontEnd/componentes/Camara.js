// src/camera.page.js file
import React from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo';
import  * as Permissions from 'expo-permissions';
import { StyleSheet, Dimensions } from 'react-native';
//import styles from './styles';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default class Camara extends React.Component {
  camera = true;

  state = {
      hasCameraPermission: null
  };

  async componentDidMount() {
      const camera = await Permissions.askAsync(Permissions.CAMERA);
      const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
    console.log(hasCameraPermission);
      this.setState.hasCameraPermission= true;
      console.log(hasCameraPermission);
  };

  render() {
      this.state.hasCameraPermission = true;
      console.log("Valor Actual : " + this.state.hasCameraPermission);
      if (this.state.hasCameraPermission === true) {
        return (
            <View> 
                <Camera
                    style={styles.preview}
                />
            </View>
        );
      } else if (this.state.hasCameraPermission === false) {
          return ( <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Access to camera has been denied! </Text>
          </View>);
      } 
  };
};

const styles = StyleSheet.create({
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
});