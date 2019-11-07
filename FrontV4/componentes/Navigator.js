import React, { Component }  from 'react'
import {ActivityIndicator, StatusBar, AsyncStorage, View} from 'react-native';
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import  {createStackNavigator} from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './Login'
import AltaReclamos from './AltaReclamo'
import ReclamosEdificio from './ReclamosEdificio'
import Usuario from './Usuario'
import ConsultarReclamos from './ConsultarReclamo'
import CamaraPage from './CamaraPage'
import ImagePicker from './ImagePickerExample'
import VerFoto from './VerFoto'
import RefreshController from './Refresh'
import Welcome from './Welcome'
import ModalEx from './Modal'
import { ScreenOrientation } from 'expo';
import Registro from './Registro';
const backgroundColor = '#ADD8E6'
const headerTextColor = '#F8F8FF';

//87CEFA
//42a5f5


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

      AltaReclamos: { 
        screen: AltaReclamos,
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
    tabBarIcon: ( <Icon name="md-create" size={20} /> )
}

const RefreshStack = createStackNavigator({

    RefreshController: { 
      screen: RefreshController,
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

RefreshStack.navigationOptions = {
  tabBarLabel: "Consultar Reclamos",
  tabBarIcon: ( <Icon name="md-book" size={20} /> )
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
  tabBarIcon: ( <Icon name="md-image" size={20} /> )
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
    tabBarIcon: ( <Icon name="md-create" size={20} /> )
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
    tabBarIcon: ( <Icon name="md-cloud-upload" size={20} /> )
}


const AuthStack = createStackNavigator({Home: Login})
class AuthLoadingScreen extends Component{
    constructor(props){
        super(props);
        this._LoadData();
    }





    render (){
        return (
            <View>
                <ActivityIndicator/>
                <StatusBar barStyle= "default" />
            </View>
        )
    }

    _LoadData = async ( ) =>{
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn")
        console.log (isLoggedIn)
        const Doc = await AsyncStorage.getItem("documento");
        console.log (Doc)
        const nombre = await AsyncStorage.getItem("nombre");
        console.log (nombre)
        const ubica = await AsyncStorage.getItem("ubicacion");
        console.log (ubica)
        
        const c = await AsyncStorage.getItem("codigo");
        const descrip = await AsyncStorage.getItem("descripcion");
        console.log (descrip)
        const p =await AsyncStorage.getItem("piso");
        console.log (p)
        const identif = await AsyncStorage.getItem("identificador");
        console.log (identif)
            
        if (isLoggedIn === '1'){
        this.props.navigation.navigate(isLoggedIn !== '1'? 'Auth': 'App')
        if (nombre !== ''){
            
            
        this.props.navigation.navigate('AltaReclamos', { documento: Doc, nombre : nombre, ubicacion: ubica, codig: c, descripcion: descrip, piso: p, identificador: identif})
            
        this.props.navigation.navigate('VerFoto', { documento: Doc })
        this.props.navigation.navigate('ImagePicker', { documento: Doc })
        
        //this.props.navigation.navigate('ConsultarReclamos', { documento: Doc })
    
        this.props.navigation.navigate('RefreshController', { documento: Doc })
        this.props.navigation.navigate('ReclamosEdificio', { documento: Doc})
        }
        else{
        this.props.navigation.navigate('VerFoto', { documento: Doc })
        this.props.navigation.navigate('ImagePicker', { documento: Doc })
        
        this.props.navigation.navigate('RefreshController', { documento: Doc })
    
        //this.props.navigation.navigate('ConsultarReclamos', { documento: Doc })
        this.props.navigation.navigate('ReclamosEdificio', { documento: Doc})
        //nombre: nomb, ubicacion:ubica, codigo: codig, descripcion:descrip, piso: p, identificador: identif
        this.props.navigation.navigate('AltaReclamos', { documento: Doc})
        }
    }
        else {
            this.props.navigation.navigate('Welcome')
        }
    }
    


}


   
const AppTabNavigator = createMaterialBottomTabNavigator(
    {
        
        CameraStack,
        ReclamosEdificioStack,
        AltaReclamoStack ,
        RefreshStack,
        //ConsultarStack,
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
    AuthLoading: AuthLoadingScreen,
    Welcome: {screen: Welcome},
    Registro: {screen:Registro},
    Login: { screen: Login },
    Auth: AuthStack,
    App: { screen: AppStackNavigator },
    
});     

const Navigator = createAppContainer(AppSwitchNavigator)
export default Navigator