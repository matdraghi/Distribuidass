import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView,Image} from 'react-native';
import {ImageBrowser,CameraBrowser} from 'expo-multiple-imagepicker';

export default class MPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      cameraBrowserOpen: false,
      photos: []
    }
  }
  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      console.log(photos)
      this.setState({
        imageBrowserOpen: false,
        photos
      })
    }).catch((e) => console.log(e))
  }


  render() {
    if (this.state.imageBrowserOpen) {
      return(<ImageBrowser max={10} callback={this.imageBrowserCallback}/>);
    }else if (this.state.cameraBrowserOpen) {
      return(<CameraBrowser max={10} callback={this.imageBrowserCallback}/>);
    }
    return (
      <View style={styles.container}>
        <Button
          title="Choose Images"
          onPress={() => this.setState({imageBrowserOpen: true})}
        />
        <Text>This is an example of a</Text>
        <Text>multi image selector using expo</Text>
        <ScrollView>
          {this.state.photos.map((item,i) =>  
          <Image
        style={{height: 100, width: 100}}
        source={{uri: item.file}}
        key={i}
      /> )}
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});