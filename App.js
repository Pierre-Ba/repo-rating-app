import React from 'react';
import  { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import RepositoryList from './src/components/RepositoryList';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeRouter } from 'react-router-native';



const App = () => {
  

  return (
      <PaperProvider>  
        <NativeRouter> 
    <SafeAreaView>
    <Main />
    </SafeAreaView>
    </NativeRouter>
    <StatusBar style="auto"/>
    </PaperProvider>
  );
  
};

export default App;
