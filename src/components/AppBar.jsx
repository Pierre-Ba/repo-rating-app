import React from 'react';
import {  Pressable, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import { Appbar } from 'react-native-paper';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // ...
  },
  appBar: {
      color: "#530ff1",
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
      
     
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: theme.fontWeights.bold 
  }
});

const AppBar = () => {
  return (
  
      <Appbar.Header  style={styles.appBar} >
            
            
            <Link to="/">
              <Text style={styles.text}>
           Repositories
           </Text>
          </Link>
          
          
            <Pressable onPressIn={() => console.log('pressed')}>
            <Link to="/signin" >
              <Text style={styles.text}>
            Sign In
            </Text>
            </Link>
            </Pressable>
          
      </Appbar.Header>
 
  );
};

export default AppBar;