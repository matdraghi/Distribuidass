//This is an example code for React Native Swipe Down  to Refresh ListView Using RefreshControl//
import React, { Component } from 'react';
//import react in our code.
 
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Alert,
  RefreshControl,
} from 'react-native';
//import all the components we are going to use.

import { TextInput} from 'react-native-paper'
 
export default class Refresh extends Component {
  constructor(props) {
    super(props);
    //True to show the loader
    this.state = { refreshing: true };
    this.state = {documento : 
      this.props.navigation.getParam('documento')}
    //Running the getData Service for the first time
    this.GetData();
  }
 
  GetData = () => {
    //Service to get the data from the server to render
    
    const documento = this.state.documento;
    console.log(documento)
    return fetch('http://192.168.43.90:8080/myapp/Reclamos/Consultar?documento=' + documento)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          refreshing: false,
          //Setting the data source for the list to render
          dataSource: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ListViewItemSeparator = () => {
    return (
      //returning the listview item saparator view
      <View
        style={{
          height: 0.2,
          width: '90%',
          backgroundColor: '#808080',
        }}
      />
    );
  };
  onRefresh() {
    //Clear old data of the list
    this.setState({ dataSource: [],
    documento: this.props.navigation.getParam('documento') });
    //Call the Service to get the latest data
    this.GetData();
  }
  render() {
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //Returning the ListView
      <View style={styles.MainContainer}>
             <TextInput
                    style={styles.inputs}
                    label='documento'
                    underlineColor = '#d32f2f'
                    selectionColor = '#d32f2f'
                    value={this.state.documento}
                />
        <FlatList
          data={this.state.dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          enableEmptySections={true}
          renderItem={({item}) => (
            <Text
              style={styles.rowViewContainer}
              onPress={() => alert(item.descripcion)}>
              {"IdReclamo: " +item.idReclamo}
              {"\n"}
              {"Documento: " + item.documento}
              {"\n"}

              {"Descripcion: " +item.descripcion}
              {"\n"}
              {"Identificador: " +item.identificador}
              {"\n"}
              {"Piso: " +item.p}
              {"\n"}
              {"Nombre: " +item.nombre}
              {"\n"}
              {"Ubicacion: " + item.ubicacion}
              {"\n"}
              {"Codigo: " + item.codigo}
              {"\n"}
              {"Estado Actual: " + item.estado}
              {"\n"}
              {"--------------------"}
            </Text>
          )}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
    backgroundColor: 'grey',
  },
  rowViewContainer: {
    fontSize: 20,
    padding: 10,
  },
});