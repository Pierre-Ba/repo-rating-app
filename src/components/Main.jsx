import React from 'react';
import { Route, Switch, Redirect } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { View, Text } from 'react-native';
import SignIn from './SignIn';
import RepositoryList from './RepositoryList';
import SingleRepoView from './SingleRepoView';
import AppBar from './AppBar';
import { GET_REPOSITORIES } from '../graphql/queries';
//import RepositoryItem from './RepositoryItem';





/*
const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1
    }
});
*/


const Main = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log("ERROR: ", error.message);
    },
  });
  
  if (loading) {
    return (
    <Text>loading...</Text>
    );
  }
  
  //console.log('DATA: ', data);
  let ids = data.repositories.edges.map((edge) => edge.node.id);
  console.log('IDs :', ids);
  
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
        <Route path="/repo/:id/" component={SingleRepoView} />
         
          
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;