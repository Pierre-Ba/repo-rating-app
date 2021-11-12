import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Appbar } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // ...
  },
  appBar: {
      color: "#530ff1",
     
  }
});

const AppBar = () => {
  return (
  
      <Appbar.Header >
          <Pressable onPress={() => console.log('pressed')}>
          <Appbar.Content title="Repositories"/>
          </Pressable>
      </Appbar.Header>
 
  );
};

export default AppBar;