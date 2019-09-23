import React from 'react'
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import  {createStackNavigator} from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';

import Login from './Login'
import AltaReclamo from './AltaReclamo'
import DetallesReclamos from './DetallesReclamos'
import Usuario from './Usuario'

const backgroundColor = '#d32f2f'
const headerTextColor = '#ffffff'

const ProductosStack = createStackNavigator({
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

ProductosStack.navigationOptions = {
    tabBarLabel: "Reclamos",
    tabBarIcon: ( <Icon name="md-nutrition" size={20} /> )
}

const DetalleStack = createStackNavigator({
    DetallesReclamos: { 
        screen: DetallesReclamos,
        navigationOptions: {
            headerTitle: 'Detalle Reclamo',
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

DetalleStack.navigationOptions = {
    tabBarLabel: "Detalles",
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



const AppTabNavigator = createMaterialBottomTabNavigator(
    {
        ProductosStack,
        DetalleStack,
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
    Login: { screen: Login },
    App: { screen: AppStackNavigator }
});

const Navigator = createAppContainer(AppSwitchNavigator)

export default Navigator