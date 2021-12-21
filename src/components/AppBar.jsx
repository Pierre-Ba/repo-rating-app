import React from 'react';
import {  StyleSheet, Text, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import Constants from 'expo-constants';
import { Appbar } from 'react-native-paper';
import { Link } from 'react-router-native';
import theme from '../theme';
import { AUTHORIZED_USER } from '../graphql/queries';
import { useApolloClient, useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';






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
  view: {
    display: "flex",
    flexDirection: "row"
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
  const { data, loading } = useQuery(AUTHORIZED_USER, {
    onError: (error) => {
      console.log('ERROR: ', error.message);
    }
  });

  if (loading) {
    <Text>loading...</Text>;
  }
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

 const handleSignOut = async (event) => {
   event.preventDefault();
   const removedToken = await authStorage.removeAccessToken();
   console.log('REMOVED TOKEN', removedToken);
   console.log('DATA IN HANDLE SIGN OUT FUNC: ', data);
   apolloClient.resetStore();

 };
  return (
    <Appbar.Header  style={styles.appBar} >
        <ScrollView style={styles.scrollView} horizontal >
            
           
            <Link to="/" component={TouchableWithoutFeedback} >
              <Text style={styles.text} >
           Repositories
           </Text>
          </Link>
          
          
            {(data !== undefined && data.authorizedUser !== null) ? 
            <View style={styles.view}>
              <Link to="/createReview" component={TouchableWithoutFeedback}>
              <Text style={styles.text}>
            Create Review
            </Text>
            
            </Link>
            <Link to="/myReviews" component={TouchableWithoutFeedback}>
              <Text style={styles.text}>
                My Reviews
              </Text>
            </Link>
            <Link to="/signout" component={TouchableWithoutFeedback}>
              <Text style={styles.text} onPress={handleSignOut}>
                Sign Out
                </Text>
                </Link>
            </View>
                
                :
                <View style={styles.view}>
            <Link to="/signin" component={TouchableWithoutFeedback}>
              <Text style={styles.text}>
            Sign In
            </Text>  
            </Link>
            <Link to="/signup" component={TouchableWithoutFeedback}>
              <Text style={styles.text}>
            Sign Up
            </Text>
            
            </Link>
            </View>

            
            }
            
            
          
             
            
         
          
      </ScrollView>
      </Appbar.Header>
 
  );
};

export default AppBar;