import React from 'react';
import { Text, View, TouchableOpacity, Image, Button,ScrollView, CameraRoll, TouchableHighlight } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import {ImagePicker} from 'expo-image-picker';
import styles from './styles'

export default class CamaraPage extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    uri: '',
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snapPhoto() {       
    console.log('Button Pressed');
    if (this.camera) {
       console.log('Taking photo');
       const options = { quality: 1, base64: true, fixOrientation: true, 
       exif: true};
       await this.camera.takePictureAsync(options).then(photo => {
          photo.exif.Orientation = 1;            
           console.log(photo.uri);
           this.setState ({
             uri: photo.uri
           })
      
      //alert (data)
      //alert (id)
      const file = this.state.uri
      console.log (file)
      fetch('http://192.168.43.142:8080/myapp/savefileee?file=' + file ).then((response) => response.json()).then((json) => {
        console.log ("Hola" + json)
        this.setState({
          numero : json,
        });
            
      })
           
        CameraRoll.saveToCameraRoll(photo.uri, 'photo');       
           });     
     }
    }

    _saveToCameraRollAsync = async () => {
      let result = await takeSnapshotAsync(this._container, {
        format: 'jpg',
        result: 'file',
      });
  
      let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
      this.setState({ cameraRollUri: saveResult });
    };

    _handleButtonPress = () => {
      CameraRoll.getPhotos({
          first: 20,
          assetType: 'Photos',
        })
        .then(r => {
          this.setState({ photos: r.edges });
        })
        .catch((err) => {
           //Error Loading Images
        });
      };

      
  _takePhoto = async () => {
  const result = await ImagePicker.launchCameraAsync({
    allowEditing: false,
    exif: true
  });

  if (!result.cancelled) {
    this.setState({ image: result.uri });
  }
  CameraRoll.saveToCameraRoll(this.state.image);
};

getPhotosFromGallery() {
  CameraRoll.getPhotos({ first: 1000000 })
    .then(res => {
      console.log(res, "images data")
    })
}


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
         
          <Camera style={{ flex: 1 }} 
          ref={ (ref) => {this.camera = ref} }
          type={this.state.type}>  
          
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ 
                  width: 76,
                height: 76,
                borderWidth: 2,
                 marginTop: 100, 
                 alignItems: 'center',
                 borderRadius: 76,
                  color: 'green' }}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.captureBtnInternal} onPress={this.snapPhoto.bind(this)}>        
              
              <Image style={styles.submitButton} source={require('../assets/Circulo.png') }  
                />
            </TouchableOpacity>
            </View>
            
          </Camera>
          
        </View>
      );
    }
  }
}