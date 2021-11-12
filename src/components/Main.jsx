import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import MyText from './Text';
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
        
            <AppBar />
        
    );
};

export default Main;