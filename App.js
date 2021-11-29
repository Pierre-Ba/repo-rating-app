import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";
import { Provider as PaperProvider } from "react-native-paper";
import { NativeRouter } from "react-router-native";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";



const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);



const App = () => {
 
  return (
    <PaperProvider>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <SafeAreaView>
              <Main />
            </SafeAreaView>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </PaperProvider>
  );
};

export default App;
