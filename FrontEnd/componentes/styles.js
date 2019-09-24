// src/styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    preview: {
        height: winHeight,
            width: winWidth,
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
    },
    // src/styles.js file
// ... previously written code
alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
bottomToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 0,
},
captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#FFFFFF",
},
captureBtnActive: {
    width: 80,
    height: 80,
},
captureBtnInternal: {
    /*width: 76,
    height: 76,
    borderWidth: 2,
    marginRight: 100,
    alignItems: 'center',
    borderRadius: 76,*/
    
    width: '100%', 
      height: 50, 
      backgroundColor: '#FF9800', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
    backgroundColor: "red",
    borderColor: "transparent",
},

submitButton: {
    height: 85,
    flex: 1,
    backgroundColor: "#FFBB34",
    borderColor: "#555555",
    borderWidth: 0,
    borderRadius: 0,
    marginTop: 200,
    right: 300,
    justifyContent: "flex-start"
}
//... previously written code
});

