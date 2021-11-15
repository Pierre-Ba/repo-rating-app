import React from 'react';
import Constants from 'expo-constants';
import { Route, Switch, Redirect, NativeRouter } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import SignIn from './SignIn';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';



const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1
    }
});


const Main = () => {
    return (
          
            <View>
            <AppBar />
            <Switch>
            <Route path="/" exact>
          <RepositoryList />
           </Route>
           <Route path="/signin" exact>
               <SignIn />
               </Route>
          <Redirect to="/" />
            </Switch>
            </View>
          
    );
};

export default Main;