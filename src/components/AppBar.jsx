import React from 'react';
import {  StyleSheet, Text, ScrollView } from 'react-native';
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
      
      
     
  },
  text: {
    paddingRight: 20,
    paddingLeft: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: theme.fontWeights.bold 
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    
    
  }, 

});

const AppBar = () => {
  return (
    <Appbar.Header  style={styles.appBar} >
        <ScrollView style={styles.scrollView} horizontal >
            
            
            <Link to="/">
              <Text style={styles.text}>
           Repositories
           </Text>
          </Link>
          
            <Link to="/signin" >
              <Text style={styles.text}>
            Sign In
            </Text>
            </Link>
            
            
         
          
      </ScrollView>
      </Appbar.Header>
 
  );
};

export default AppBar;