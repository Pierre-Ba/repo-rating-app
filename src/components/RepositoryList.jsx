import React, { useState, useEffect,  } from 'react';
import { useQuery } from '@apollo/client';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { GET_REPOSITORIES } from '../graphql/queries'
console.log('USE REPOSITORIES', useRepositories);

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});



const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  
  
  
 const { data, error, loading } = useQuery(GET_REPOSITORIES, {
   fetchPolicy: 'cache-and-network',
   onError: (error) => {
     console.log('ERROR: ', error.message)
   }
 })

 if (loading) {
   return <Text>loading...</Text>
 }

 console.log('DATA', data)

  const repositoryNodes = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem item={item} />
      )}
    />
  );
};

export default RepositoryList;