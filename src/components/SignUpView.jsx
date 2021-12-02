import React from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Yup from 'yup';
import {Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { styles } from './SignIn';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const validationSchema = Yup.object({
    username: Yup.string()
      .max(30, 'Your username must be between 1 and 30 characters')
      .min(1, 'Your username must be between 1 and 30 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(5, 'Your password must be between 5 and 50 characters')
      .max(50, 'Your password must be between 5 and 50 characters')
      .required('Password is required'),
    passConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null])
      .required('Password confirm is required')

});


const SignUpView = () => {
   const initialValues = {
       username: "",
       password: "",
       passConfirm: ""
   };

   const [createUser] = useCreateUser();
   let history = useHistory();
   const [signIn] = useSignIn();

   const handleSubmit = async (values) => {
       const { username, password, passConfirm } = values;
       console.log('VALUES IN HANDLE SUBMIT IN SIGNUP VIEW: ', values);
       try {
           const { data } = await createUser({username, password, passConfirm});
           console.log('SIGN UP DATA FROM HANDLE SUBMIT IN SIGNUP VIEW: ', data);
           if(data) {
               const {data } = await signIn({username, password});
               console.log('DATA FROM SIGNIN FUNC IN SIGNUP VIEW: ', data);
               console.log('ACCESS TOKEN IN SIGNUP VIEW: ', data.authorize.accessToken);
               history.push("/");
               console.log('signed up form sent!');
           }

       } catch (error) {
           console.log('ERROR IN CATCH IN SUBMIT FUNC SIGNUP VIEW: ', error);
       }
   };


    return (
        <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
          {(formik) => (
            <View>
              <FormikTextInput
                style={
                  "username" in formik.errors ? styles.errors : styles.input
                }
                name="username"
                type="text"
                placeholder="Username"
                testID="username"
              />
              {console.log("FORMIK ERRORS", formik.errors)}
              <FormikTextInput
                style={"password" in formik.errors ? styles.errors : styles.input}
                name="password"
                type="text"
                placeholder="Password"
                testID="password"
                secureTextEntry={true}
              />
              <FormikTextInput
                style={"passConfirm" in formik.errors ? styles.errors : styles.input}
                name="passConfirm"
                type="text"
                placeholder="Password Confirmation"
                testID="passConfirm"
                secureTextEntry={true}
              />
              
              <Pressable
                style={styles.button}
                type="submit"
                onPress={formik.handleSubmit}
                testID="signup"
              >
                <Text style={styles.text}>Sign Up</Text>
              </Pressable>
            </View>
          )}
        </Formik>
    );
};

export default SignUpView;