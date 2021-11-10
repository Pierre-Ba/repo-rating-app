import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RepositoryItem = ({ item }) => {
    const styles = StyleSheet.create({
        text: {
            color: 'blue',
    fontSize: 24,
    fontWeight: '700',
        }
    });
    return (
        <View >
            <Text style={styles.text}>
                Full name: {item.fullName}
            </Text>
            <Text>
                Description: {item.description}
            </Text>
            <Text>
                Language: {item.language}
            </Text>
            <Text>
                Stars: {item.starsgazersCount}
            </Text>
            <Text>
                Forks: {item.forksCount}
            </Text>
            <Text>
                Reviews: {item.reviewCount}
            </Text>
            <Text>
                Rating: {item.ratingAverage}
            </Text>
        </View>
    );
};

export default RepositoryItem;