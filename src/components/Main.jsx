import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import MyText from './Text';


const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1
    }
});


const Main = () => {
    return (
        <View style={styles.container}>
            <MyText>Simple text</MyText>
            <MyText style={{ paddingBottom: 10 }}>Text with custom style</MyText>
      <MyText fontWeight="bold" fontSize="subheading">
        Bold subheading
      </MyText>
      <MyText color="textSecondary">Text with secondary color</MyText>
        </View>
    );
};

export default Main;