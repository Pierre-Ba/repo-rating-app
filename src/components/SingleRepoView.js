
import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from '@apollo/client';
import { Button } from "react-native-paper";
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  button: {
    width: "auto",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25
  }
});


const SingleRepoView = (props) => {
  const repoData  = props.history.location.state.state;
  console.log('DATA IN SINGLEREPOVIEW: ', repoData);
  const id = repoData.id;
  
  
  const { data, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log("ERROR: ", error.message);
    },
    variables: {id}
  });
  
  if (loading) {
    return (
    <Text>loading...</Text>
    );
  }
  
  console.log('DATA FROM GET REPOSITORY QUERY: ', data);
  const repoUrl  = data.repository.url;
  console.log('REPO URL: ', repoUrl);

  const handlePress = (event) => {
    event.preventDefault();
    Linking.openURL(repoUrl);
  };
   
    
    return (
         <View>
        <RepositoryItem item={repoData} />
        <Button  onPress={handlePress} mode="contained" style={styles.button} color="blue">Open in Github</Button>
        </View>
    );
};

export default SingleRepoView;