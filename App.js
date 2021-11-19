import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";
import { Provider as PaperProvider } from "react-native-paper";
import { NativeRouter } from "react-router-native";

const apolloClient = createApolloClient();

const App = () => {
  return (
    <PaperProvider>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <SafeAreaView>
            <Main />
          </SafeAreaView>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </PaperProvider>
  );
};

export default App;
