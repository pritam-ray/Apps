import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Text, Rating } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';

export const HotelCard = ({ hotel, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: hotel.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          <View style={styles.priceTag}>
            <Text style={styles.price}>${hotel.price_per_night}</Text>
            <Text style={styles.perNight}>/night</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>{hotel.name}</Text>
          <View style={styles.ratingContainer}>
            <Rating
              readonly
              startingValue={hotel.rating}
              imageSize={16}
              style={styles.rating}
            />
            <Text style={styles.ratingText}>{hotel.rating}</Text>
          </View>
          <Text style={styles.address} numberOfLines={2}>{hotel.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  priceTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(46, 204, 113, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  perNight: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 2,
  },
  content: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    marginRight: 5,
  },
  ratingText: {
    color: '#f1c40f',
    fontWeight: 'bold',
  },
  address: {
    color: '#7f8c8d',
    fontSize: 14,
    lineHeight: 20,
  },
});