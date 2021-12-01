import React from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Yup from 'yup';
import {Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { styles } from './SignIn';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router-native';

console.log('STYLES', styles);

const validationSchema = Yup.object({
    ownerName: Yup.string()
      .required('Repository owner name is required'),
    repositoryName: Yup.string()
      .required('Repository name is required'),
      rating: Yup.number()
      .min(0, 'Your rating can not go below zero, show some mercy')
      .max(100, 'You can not give more than 100 rating to a repo')
      .required('A rating is required'),
      text: Yup.string()
      .min(3, 'We need at least 3 characters for your review to be posted')

});


const CreateReview = () => {
   const initialValues = {
       ownerName: "",
       repositoryName: "",
       rating: "",
       text: ""

   };

   const [createReview] = useCreateReview();
  
   let history = useHistory();

   const handleSubmit = async (values) => {
      const { ownerName, repositoryName, rating, text} = values;
      console.log('VALUES: ', values);
       console.log('submitted');

       try {
           const { data } = await createReview({repositoryName, ownerName, rating, text});
           console.log('DATA IN THE CREATE REVIEW COMPONENT FROM MUTATION: ', data);
           if(data) {
             
               history.push("/repo/:id", {state: data.createReview} );
           }
       } catch (error) {
           console.log('ERROR IN CATCH HANDLE SUBMIT METHOD CREATE REVIEW COMPONENT: ', error);
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
                "ownerName" in formik.errors ? styles.errors : styles.input
              }
              name="ownerName"
              type="text"
              placeholder="Repository Owner Name"
              testID="ownerName"
            />
            {console.log("FORMIK ERRORS", formik.errors)}
            <FormikTextInput
              style={"repositoryName" in formik.errors ? styles.errors : styles.input}
              name="repositoryName"
              type="text"
              placeholder="Repository Name"
              testID="repositoryName"
            />
            <FormikTextInput
              style={"rating" in formik.errors ? styles.errors : styles.input}
              name="rating"
              type="text"
              placeholder="Rating"
              testID="rating"
            />
            <FormikTextInput
              style={"text" in formik.errors ? styles.errors : styles.input}
              name="text"
              type="text"
              placeholder="Review"
              multiline={true}
              testID="review"
            />
            <Pressable
              style={styles.button}
              type="submit"
              onPress={formik.handleSubmit}
              testID="createReview"
            >
              <Text style={styles.text}>Create a review</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    );
};

export default CreateReview;