import React, {useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FlatList, View, StyleSheet, Text, TextInput } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useDebounce } from 'use-debounce';
import RepoPicker from "./RepoPicker";




const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  input: {
    borderColor: 'black',
    height: 40,
    margin: 12,
    borderWidth: 0.2,
    padding: 10,
    

  }
});

export const ItemSeparator = () => <View style={styles.separator} />;

 const RepositoryList = ({ state }) => {
 
  const [selectedRepo, setSelectedRepo] = useState('Latest Repos');
  const [search, setSearch] = useState('');
  const [value] = useDebounce(search, 200);
  
 //console.log('DEBOUNCED VALUE: ', value);
 //console.log('DEBOUNCED VALUE.LENGTH: ', value.length);

state = selectedRepo;
console.log('STATE: ', state);


const onSearchChange = (text) => {
  console.log(text);
  setSearch(text);
  //console.log('SEARCH: ', search);
};

//console.log('SEARCH.LENGTH: ', search.length);

const onValueChange = (itemValue) => {
  setSelectedRepo(itemValue);
  
};



const { data, loading, refetch, fetchMore} = useQuery(GET_REPOSITORIES, {
  fetchPolicy: "cache-and-network",
  onError: (error) => {
    console.log("ERROR: ", error.message);
  },
});

//console.log('DATA FROM GET REPOS: ', data);

const handleFetchMore = (variables) => {
  const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

  if (!canFetchMore) {
    return;
  }

  fetchMore({
    variables: {
      after: data.repositories.pageInfo.endCursor,
      ...variables,
    },
  });
};

const getPickedRepo = async (variablesForQuery) => {
  const data = await refetch(variablesForQuery);
  //console.log('REFETCH DATA FROM GET PICKED REPO FUNC: ', data);
  return data;
};



  useEffect(() => {
    if(state === 'Highest Rated Repos') {
    getPickedRepo({ "orderDirection":"DESC", "orderBy":"RATING_AVERAGE", "first": 8}); 
    //console.log('HIGHEST RATED FUNC CALLED');
    } 
    if(state === 'Lowest Rated Repos') {
      getPickedRepo({ "orderDirection":"ASC", "orderBy":"RATING_AVERAGE", "first": 8});   
      //console.log('LOWEST RATED FUNC CALLED');
   }  
    if(state === 'Latest Repos') {
     getPickedRepo({ "orderDirection":"DESC", "orderBy":"CREATED_AT", "first": 8});
     //console.log('LATEST RATED FUNC CALLED');
   }
   
  
  
  }, [state]);

  useEffect(() => {
    if (value.length >= 0) {
      getPickedRepo({"searchKeyword": value });
     //console.log('DEBOUNCED SEARCH FUNC CALLED');
    }
  }, [value]);


if (loading) {
  return <Text>loading...</Text>;
}

const onEndReached = () => {
handleFetchMore({"first": 8, "after": data.repositories.pageInfo.endCursor});
  console.log('You have reached the end of the list');
};
  

  const repositoryNodes = data.repositories
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
   
    <View >
      <RepoPicker 
      selectedValue={selectedRepo}
      onValueChange={onValueChange} 
      />
      <TextInput
      style={styles.input}
      placeholder="search for a repository"
      defaultValue={value}
      onChangeText={onSearchChange}
      />
      
    <FlatList
    data={repositoryNodes}
    style={{height: '70%'}}
    ItemSeparatorComponent={ItemSeparator}
    onEndReached={onEndReached}
    renderItem={({ item }) => <RepositoryItem item={item} 
    />}
  />
  </View>

  
  );
};

/*

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

*/

export default RepositoryList;
