
import React from "react";
import { Text, StyleSheet, View, FlatList } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from '@apollo/client';
import { Button, Card } from "react-native-paper";
import * as Linking from 'expo-linking';
import { format } from "date-fns";

export const styles = StyleSheet.create({
  button: {
    width: "auto",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25
  },
  separator: {
    height: 10,
  },

   
  container: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10

  },
  
  rating: {
    color : "blue",
    alignSelf: "center"
  
    
  },

  ratingContainer: {
  display: "flex",
  flexDirection: "row",
  height: 35,
  width: 35,
  borderRadius: 17.5,
  borderWidth: 1,
  borderColor: 'blue',
  justifyContent: "center"
  
  
  },

  reviewContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    flexShrink: 1
  },

  username: {
    color: "black",
    fontWeight: "bold"
  },
  secondaryText: {
    color: "grey",
    fontSize: 16,
    fontWeight: "400",
  },
});



export const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewItem =({ item }) => {
   
  //console.log('ITEM IN REVIEW ITEM: ', item);
  const rev = item.node;
   
   const date = format(new Date(rev.createdAt), 'MM.dd.yyyy');
   
  
 
   return (
     <Card>
       <View style={styles.container}>  
         <View style={styles.ratingContainer}>
         <Text style={styles.rating}>{rev.rating}</Text>
         </View>
         <View style={styles.reviewContainer}>
           <Text style={styles.username}>{rev.user.username}</Text>
           <Text style={styles.secondaryText}>{date}</Text>
           <Text>{rev.text}</Text>
           </View>
         </View>
     </Card>
   );
 }; 


const SingleRepoView = (props) => {
  const repoData  = props.history.location.state.state;
  //console.log('DATA IN SINGLEREPOVIEW: ', repoData);
  const id = repoData.repositoryId ? repoData.repositoryId : repoData.id;
  
  //const params = useParams();
  //console.log('PARAMS.id', params.id);
  
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log("ERROR: ", error.message);
    },
    variables: {id}
  });

  //console.log('DATA FROM SINGLE REPO QUERY: ', data);

  const handleFetchMore = (variables) => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
  
    if (!canFetchMore) {
      return;
    }
  
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  
  const onEndReached = () => {
    handleFetchMore({"first": 2, "after": data.repository.reviews.pageInfo.endCursor});
    console.log("End of the list reached");
  };
  
  if (loading) {
    return (
    <Text>loading...</Text>
    );
  }
  
  const RepositoryInfo = () => {
    return (
      <View>
        <RepositoryItem item={data.repository} />
        <Button
          onPress={handlePress}
          mode="contained"
          style={styles.button}
          color="blue"
        >
          Open in Github
        </Button>
      </View>
    );
  };
 
  const repoUrl  = data.repository.url;
  //console.log('REPO URL: ', repoUrl);
  const reviews = data.repository.reviews.edges;
  //console.log('REVIEWS: ', reviews);

  const handlePress = (event) => {
    event.preventDefault();
    Linking.openURL(repoUrl);
  };
   
  

    return ( 
        
        <FlatList 
         data={reviews}
         style={{height: '85%'}}
         onEndReached={onEndReached}
         ItemSeparatorComponent={ItemSeparator}
         renderItem={({ item }) => <ReviewItem key={item.node.id} item={item} />}
         keyExtractor={( reviews ) => { 
           return reviews.node.id;
         }}
         ListHeaderComponent={() => <RepositoryInfo  />}
         
         />
        
     
       
    );
};



export default SingleRepoView;