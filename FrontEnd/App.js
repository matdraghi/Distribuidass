import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import Login from './componentes/Login';
//import AltaReclamo from './componentes/AltaReclamo'
import Navigator from './componentes/Navigator'
import {KeyboardAvoidingView} from 'react-native'
import Camara from './componentes/Camara'

export default class App extends React.Component {
  render() {
   console.disableYellowBox = true; 
    return (
      <PaperProvider>
          <Camara/>
          <StatusBar backgroundColor="#00FFFF" />
        </PaperProvider> 
    )
  }
}