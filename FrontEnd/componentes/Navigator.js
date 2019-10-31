import React, { Component }  from 'react'
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import  {createStackNavigator} from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';

import Login from './Login'
import AltaReclamo from './AltaReclamo'
import ReclamosEdificio from './ReclamosEdificio'
import Usuario from './Usuario'
import ConsultarReclamos from './ConsultarReclamo'
import CamaraPage from './CamaraPage'
import ImagePicker from './ImagePickerExample'
import VerFoto from './VerFoto'

import { ScreenOrientation } from 'expo';
import Registro from './Registro';
const backgroundColor = '#00FA9A'
const headerTextColor = '#ffffff';




ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
handleChildCerrarSesion = () => {
    this.setState({
        isSessionActive: false,
        documento: ''
    });
}

handleChildLogin = (documento) => {
    this.setState({
        isSessionActive: true,
        documento: documento, 
        Nombre: ''
    })
}

const AltaReclamoStack = createStackNavigator({

      AltaReclamo: { 
        screen: AltaReclamo,
        navigationOptions: {
            headerTitle: 'Alta Reclamo',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
     },
     
})

AltaReclamoStack.navigationOptions = {
    tabBarLabel: "Reclamos",
    tabBarIcon: ( <Icon name="md-nutrition" size={20} /> )
}


const VerFotoStack = createStackNavigator({

    VerFoto: { 
      screen: VerFoto,
      navigationOptions: {
          headerTitle: 'Consultar Foto',
          headerTitleStyle: {
              textAlign: "center",
              flex: 1
          },
          headerStyle: {
              backgroundColor: backgroundColor,
            },
          headerTintColor: headerTextColor,
      }
   },
   
})

VerFotoStack.navigationOptions = {
  tabBarLabel: "Fotografia",
  tabBarIcon: ( <Icon name="md-nutrition" size={20} /> )
}

const ReclamosEdificioStack = createStackNavigator({
    ReclamosEdificio: { 
        screen: ReclamosEdificio,
        navigationOptions: {
            headerTitle: 'Reclamos Edificio',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
     }
})

ReclamosEdificioStack.navigationOptions = {
    tabBarLabel: "Reclamos Edificio",
    tabBarIcon: ( <Icon name="md-nutrition" size={20} /> )
}
const UsuarioStack = createStackNavigator({
    Usuario: {
        screen: Usuario,
        navigationOptions: {
            headerTitle: 'Usuario',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
    },
})

UsuarioStack.navigationOptions = {
    tabBarLabel: "Usuario",
    tabBarIcon: ( <Icon name="md-contact" size={20} /> )
}


const CameraStack = createStackNavigator({
    Camara: {
        screen: CamaraPage,
        navigationOptions: {
            headerTitle: 'Camara',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
    },
})

CameraStack.navigationOptions = {
    tabBarLabel: "Camara",
    tabBarIcon: ( <Icon name="md-camera" size={20} /> )
}

const ConsultarStack =  createStackNavigator({
    
    ConsultarReclamos: {
        screen: ConsultarReclamos,
        
        navigationOptions: {
            headerTitle: 'Consultar Reclamos',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
    },
})

ConsultarStack.navigationOptions = {
    tabBarLabel: "Consultar Reclamo",
    tabBarIcon: ( <Icon name="md-nutrition" size={20} /> )
}


const ElegirImagenStack =  createStackNavigator({
    
    ImagePicker: {
        screen: ImagePicker,
        
        navigationOptions: {
            headerTitle: 'Seleccionar Una Imagen',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: backgroundColor,
              },
            headerTintColor: headerTextColor,
        }
    },
})

ElegirImagenStack.navigationOptions = {
    tabBarLabel: "Seleccionar Una Imagen",
    tabBarIcon: ( <Icon name="md-nutrition" size={20} /> )
}
const AppTabNavigator = createMaterialBottomTabNavigator(
    {
        AltaReclamoStack,
        ReclamosEdificioStack,
        CameraStack,
        ConsultarStack,
        ElegirImagenStack,
        VerFotoStack,
        UsuarioStack,
    },
    {
        barStyle: { backgroundColor: backgroundColor },
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index];
            return {
                header: null,
                headerTitle: routeName,
                headerTitleStyle: {
                    textAlign: "center",
                    flex: 1
                },
            };
        }
    },
);

const AppStackNavigator = createStackNavigator(
    {
        AppTabNavigator: AppTabNavigator
    });


const AppSwitchNavigator = createSwitchNavigator({
    Registro: {screen: Registro},
    Login: { screen: Login },
    
    App: { screen: AppStackNavigator }
});

const Navigator = createAppContainer(AppSwitchNavigator)
export default Navigator