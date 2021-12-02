import React from 'react';
import { Route, Switch, Redirect } from 'react-router-native';
import { View } from 'react-native';
import SignIn from './SignIn';
import SignUpView from './SignUpView';
import RepositoryList from './RepositoryList';
import SingleRepoView from './SingleRepoView';
import CreateReview from './CreateReview';
import AppBar from './AppBar';






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
  
  
  //console.log('DATA: ', data);
 
  
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
        <Route path="/signup" exact>
        <SignUpView />
        </Route>
        <Route path="/repo/:id/" component={SingleRepoView} />
         <Route path="/createReview" exact>
         <CreateReview />
         </Route>
          
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;