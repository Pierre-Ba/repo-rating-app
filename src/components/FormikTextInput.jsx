import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import MyText from './Text';
console.log('TEXT INPUT', TextInput);

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
  faulty: {
    borderColor: 'red',
    
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles.faulty}
        {...props}
      />
      {showError && <MyText style={styles.errorText}>{meta.error}</MyText>}
    </>
  );
};

export default FormikTextInput;