import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import Login from './componentes/Login';
import Navigator from './componentes/Navigator'
import AltaReclamo from './componentes/AltaReclamo'
import CamaraPage from './componentes/CamaraPage'
import { NetInfo } from "react-native";
import ImagePickerExample from './componentes/ImagePickerExample'
import PickMultiple from './componentes/PickMultiple'
import Refresh from './componentes/Refresh'
export default class App extends React.Component {
  
  render() {
   console.disableYellowBox = true; 
    return (
          <Navigator/>
          
    )
  }
}

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