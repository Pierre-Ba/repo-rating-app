import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-native";
import { AUTHORIZED_USER_REVIEWS } from "../graphql/queries";
import { FlatList, Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { Card, Button } from "react-native-paper";
import { ItemSeparator } from "./SingleRepoView";
import useDeleteReview from "../hooks/useDeleteReview";

import { format } from "date-fns";

const styles = StyleSheet.create({
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

    buttonContainer: {
        display: "flex",
      flexDirection: "row",
      marginLeft: 10,
      marginTop: 10,
      justifyContent: "space-around"
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
  
    repoName: {
      color: "black",
      fontWeight: "bold"
    },
    secondaryText: {
      color: "grey",
      fontSize: 16,
      fontWeight: "400",
    },
  });
  

const ReviewItem =({ item }) => {
   
    //console.log('ITEM IN REVIEW ITEM: ', item);
    const rev = item.node;
     
     const date = format(new Date(rev.createdAt), 'MM.dd.yyyy');
     
    //console.log('rev: ', rev);
    console.log('id: ', item.node.id);

   let history = useHistory();
const [deleteReview] = useDeleteReview();
  

   const handleViewRepoPress = (event) => {
     event.preventDefault();
     console.log('pressed view repository');
     history.push("/repo/:id", {state: item});
   };

   const handleDeleteRepo = (event) => {
     event.preventDefault();
     Alert.alert("Delete Review", 'Sure you want to delete?', [{
       text: 'YES',
       onPress: () => {
         deleteReview(item.node.id);
         
     }
     },
     {
       text: 'NO',
       onPress: () => console.log('NO pressed')
     },
    ]);
     
   };
   
     return (
       <Card>
         <View style={styles.container}>  
           <View style={styles.ratingContainer}>
           <Text style={styles.rating}>{rev.rating}</Text>
           </View>
           <View style={styles.reviewContainer}>
            <Text style={styles.repoName}>{rev.repository.name}</Text>
             <Text style={styles.secondaryText}>{date}</Text>
             <Text>{rev.text}</Text>
             </View>
           </View>
           <View style={styles.buttonContainer}>
                 <Pressable onPress={handleViewRepoPress}> 
                 <Button mode="contained" color="blue">View Repository</Button>
                 </Pressable>
                 <Pressable onPress={handleDeleteRepo}> 
                 <Button mode="contained" color="red">Delete Review</Button>
                 </Pressable>
             </View>
       </Card>
     );
   }; 

const MyReviews = () => {

    const { data, loading } = useQuery(AUTHORIZED_USER_REVIEWS, {
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

    //console.log('DATA FROM AUTH USER QUERY', data.authorizedUser.reviews.edges);
    let reviews = data.authorizedUser.reviews.edges;


    /*
    useEffect(() => {
      if(reviews)
    })
    */

    

    return(
        <FlatList 
        data={reviews}
        style={{height: '85%'}}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem key={item.node.id} item={item} />}
        keyExtractor={( reviews ) => { 
            return reviews.node.id;
          }}

        />
    );
};

export default MyReviews;
