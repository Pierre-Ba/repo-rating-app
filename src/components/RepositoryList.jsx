import React from "react";
import { useQuery } from "@apollo/client";
import { FlatList, View, StyleSheet, Text } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORIES } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
    data={repositoryNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) => <RepositoryItem item={item} />}
  />
  );
};

const RepositoryList = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log("ERROR: ", error.message);
    },
  });

  if (loading) {
    return <Text>loading...</Text>;
  }



  

  return (
    <RepositoryListContainer repositories={data.repositories} />
    
  );
};

export default RepositoryList;
