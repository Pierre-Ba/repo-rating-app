import React, {useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORIES } from "../graphql/queries";
import RepoPicker from "./RepoPicker";
//import useRepositories from "../hooks/useRepositories";


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

 const RepositoryList = ({ state }) => {
 
  const [selectedRepo, setSelectedRepo] = useState('Latest Repos');
  
  

state = selectedRepo;
console.log('STATE: ', state);



const onValueChange = (itemValue) => {
  setSelectedRepo(itemValue);
  
};

const { data, loading, refetch} = useQuery(GET_REPOSITORIES, {
  fetchPolicy: "cache-and-network",
  onError: (error) => {
    console.log("ERROR: ", error.message);
  },
});

const getPickedRepo = async (variablesForQuery) => {
  const data = await refetch(variablesForQuery);
  //console.log('REFETCH DATA FROM GET PICKED REPO FUNC: ', data);
  return data;
};



  useEffect(() => {
    if(state === 'Highest Rated Repos') {
    getPickedRepo({ "orderDirection":"DESC", "orderBy":"RATING_AVERAGE" }); 
    console.log('HIGHEST RATED FUNC CALLED');
    } 
    if(state === 'Lowest Rated Repos') {
      getPickedRepo({ "orderDirection":"ASC", "orderBy":"RATING_AVERAGE" });   
      console.log('LOWEST RATED FUNC CALLED');
   }  
    if(state === 'Latest Repos') {
     getPickedRepo({ "orderDirection":"DESC", "orderBy":"CREATED_AT" });
     console.log('LATEST RATED FUNC CALLED');
   }
  
  
  }, [state]);

  
    

  
 


if (loading) {
  return <Text>loading...</Text>;
}





  

  const repositoryNodes = data.repositories
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
   
    <View>
      <RepoPicker 
      selectedValue={selectedRepo}
      onValueChange={onValueChange} />
      <Searchbar />
    <FlatList
    data={repositoryNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) => <RepositoryItem item={item} />}
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
