import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import Login from './componentes/Login';
//import AltaReclamo from './componentes/AltaReclamo'
import Navigator from './componentes/Navigator'
//import {KeyboardAvoidingView} from 'react-native'
//import CameraPagee from './componentes/CamaraPagee'
import AltaReclamo from './componentes/AltaReclamo'
import CamaraPage from './componentes/CamaraPage'
import { NetInfo } from "react-native";
import UploadForm from './componentes/UploadForm'
import ImagePickerExample from './componentes/ImagePickerExample'

export default class App extends React.Component {
  
  render() {
   console.disableYellowBox = true; 
    return (
          //<CamaraPage/><Navigator
          <Navigator/>
                               
        // <CamaraPage/>
         //<UploadForm/>
    )
  }
}

/*NetInfo.isConnected.addEventListener(
  "connectionChange",
  hasInternetConnection =>
    console.debug("hasInternetConnection:", hasInternetConnection)
);*/

NetInfo.getConnectionInfo().then((connectionInfo) => {
  console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: '    + connectionInfo.effectiveType);
});
function handleFirstConnectivityChange(connectionInfo) {
  console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
  NetInfo.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}
NetInfo.addEventListener(
  'connectionChange',
  handleFirstConnectivityChange
);