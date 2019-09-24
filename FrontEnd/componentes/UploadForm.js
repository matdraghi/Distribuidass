import React, { Component } from 'react'
import { View, StyleSheet, Picker } from 'react-native'
import { TextInput, Button, ActivityIndicator, Snackbar } from 'react-native-paper'
import { trackPromise } from "react-promise-tracker";
import SmallLoading from './SmallLoading'
//import ImagePicker from 'react-native-image-picker'
import 'prop-types';

export class UploadForm extends Component {

    nuevoReclamo = () => {

        const url = 'http://192.168.0.12:8080/myapp/uploadform';
        fetch(url)
            .then(res =>  res.json()).then((json) => {
                if (json == true) {
                    this.handleUploadPhoto();
                } 
                 else {
                        this.mostrarMensaje(json.message)
            }
        });
    }

    state = {
        photo: null,
      }
    
     /* handleChoosePhoto = () => {
        const options = {
          noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
          if (response.uri) {
            this.setState({ photo: response })
          }
        })
      }*/

      handleUploadPhoto = () => {
        fetch("http://192.168.0.12:8080/myapp/uploadform", {
          method: "POST",
          body: createFormData(this.state.photo)
        })
          .then(response => response.json())
          .then(response => {
            console.log("upload succes", response);
            alert("Upload success!");
            this.setState({ photo: null });
          })
          .catch(error => {
            console.log("upload error", error);
            alert("Upload failed!");
          });
      };

      getPhotosFromGallery() {
        CameraRoll.getPhotos({ first: 1000 })
          .then(res => {
            console.log(res, "images data")
          })
      }
    render() {
        const { photo } = this.state
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {photo && (
                   <Button title="Upload" onPress={this.handleUpload} />
            )}
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickers: {
        height: 50,
        width: '90%',
    },
    inputs: {
        width: '90%',
        height: 50,
        marginBottom: 5
    }
})

export default UploadForm