import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Rating, Avatar } from '@rneui/themed';

export const ReviewList = ({ reviews }) => {
  const renderReview = ({ item }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <Avatar
          rounded
          size={40}
          title={item.user_name[0]}
          containerStyle={styles.avatar}
        />
        <View>
          <Text style={styles.userName}>{item.user_name}</Text>
          <Rating
            readonly
            startingValue={item.rating}
            imageSize={16}
          />
        </View>
      </View>
      <Text style={styles.reviewText}>{item.comment}</Text>
      <Text style={styles.date}>
        {new Date(item.created_at).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={reviews}
      renderItem={renderReview}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No reviews yet</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: '#2ecc71',
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 5,
  },
  date: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});