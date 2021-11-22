import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import * as Yup from 'yup';
import {Formik } from 'formik';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';





const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 100
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 12,
        backgroundColor: 'blue',
        height: 50,
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: theme.fontWeights.bold
           
    }, 
    errors: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: "#d73a4a"
    }
  });

  const validationSchema = Yup.object({
    username: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Username is required'),
    password: Yup.string()
      .min(7, 'Your password must have a minimum of 7 characters')
      .required('Password is required')
});

  /*

  const validate = values => {
      const errors = {};

      if (!values.username) {
        errors.username = 'Required';
      } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 7) {
        errors.password = 'Must be at least 7 characters';
      }
  }

  */

const SignIn = () => {
  const [signIn] = useSignIn()
  
  

  const onSubmit = async (values) => {
    const { username, password } = values;
    

    try {
      const { data } = await signIn({username, password });
      console.log('ACCESS TOKEN: ', data.authorize.accessToken);
    } catch (error) {
      console.log('ERROR IN CATCH ON SUBMIT', error);
    }
  }

  return (

    <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
    >
    {formik => (
       <View style={styles.container} >
       <FormikTextInput
       style={'username' in formik.errors ? styles.errors : styles.input}
       name="username"
       type="text"
       placeholder="Username"
        />
        {console.log('FORMIK ERRORS', formik.errors)}
        
        <FormikTextInput
        style={'password'in formik.errors ? styles.errors: styles.input}
       name="password"
       type="text"
       placeholder="Password"
       secureTextEntry={true}
        />
        
        <Pressable style={styles.button} type="submit" onPress={formik.handleSubmit}>
            <Text style={styles.text}>
                Sign In
            </Text>
            </Pressable>
            
      </View>
    )}


    </Formik>

      
    );
  };


export default SignIn;