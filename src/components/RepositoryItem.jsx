import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Card } from 'react-native-paper'


const RepositoryItem = ({ item }) => {
    const styles = StyleSheet.create({
        
        container: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 10,
            marginBottom: 10
            
        },
        textContainerAvatar: {
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 1,
            marginLeft: 10
            
        },
        
        buttonContainer: {
            display: 'flex',
            flexDirection: 'row'
        },
        statsContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 10
        },
        uniqueStatContainer: {
            display: 'flex',
            flexDirection: 'column'
        },
        button: {
            width: 'auto',         
            marginTop: 10,
            marginBottom: 10
        },
        text: {
            color: 'black',
    fontSize: 24,
    fontWeight: '700',
        }, 
        secondaryText: {
            
           color: 'grey',
           fontSize: 16,
           fontWeight: '400',
        },

        avatar: {
            width: 50,
            height: 50
        }
    });
    return (
         <Card>
        <View style={styles.container} >
           
            <Image  style={styles.avatar} source={{uri: item.ownerAvatarUrl}} />
            <View style={styles.textContainerAvatar}>
            <Text style={styles.text}>
               {item.fullName}
            </Text>
            <Text style={styles.secondaryText}>
                {item.description}
            </Text>
            <View style={styles.buttonContainer}>
            <Button  mode="contained" style={styles.button} color="blue">
                {item.language}
            </Button>
            
            </View>
            </View>
            </View>
             <View style={styles.statsContainer}>
              <View style={styles.uniqueStatContainer}>
                  <Text>
                      {item.stargazersCount}
                  </Text>
                  <Text>
                      Stars
                  </Text>
              </View>
              <View style={styles.uniqueStatContainer}>
                  <Text>
                      {item.forksCount}
                  </Text>
                  <Text>
                      Forks
                  </Text>
                  
              </View>
              <View style={styles.uniqueStatContainer}>
                  <Text>
                      {item.reviewCount}
                  </Text>
                  <Text>
                      Reviews
                  </Text>
                  
              </View>
              <View style={styles.uniqueStatContainer}>
                  <Text>
                      {item.ratingAverage}
                  </Text>
                  <Text>
                      Rating
                  </Text>
                </View>  
              </View>
              </Card>
           
            
        
        
    );
};

export default RepositoryItem;