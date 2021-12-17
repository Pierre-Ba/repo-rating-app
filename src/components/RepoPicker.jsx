import React from 'react';
import { StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';




const styles = StyleSheet.create({
  picker: {
    height: 50,
    
  }
});

const RepoPicker = ({ selectedValue, onValueChange }) => {
  

    return (
       <Picker
       selectedValue={selectedValue}
       style={styles.picker}
       mode='dropdown'
       dropdownIconColor='black'
       onValueChange={onValueChange}
      >
       <Picker.Item label="Latest Repositories" value="Latest Repos" />
       <Picker.Item label="Highest Rated Repositories" value="Highest Rated Repos" />
       <Picker.Item label="Lowest Rated Repositories" value="Lowest Rated Repos" />
       </Picker>
    );
};

export default RepoPicker;