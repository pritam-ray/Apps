import React from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, View } from 'react-native';
import { Button, Text, Rating, Icon } from '@rneui/themed';
import { HotelAmenities } from '../components/hotel/HotelAmenities';
import { HotelLocation } from '../components/hotel/HotelLocation';
import { ReviewList } from '../components/ReviewList';
import { formatPrice } from '../utils/price';
import { LinearGradient } from 'expo-linear-gradient';

export const HotelDetailsScreen = ({ route, navigation }) => {
  const { hotel } = route.params;

  const amenities = [
    { icon: 'wifi', name: 'Free WiFi' },
    { icon: 'pool', name: 'Pool' },
    { icon: 'fitness-center', name: 'Gym' },
    { icon: 'restaurant', name: 'Restaurant' },
    { icon: 'local-parking', name: 'Parking' },
    { icon: 'ac-unit', name: 'AC' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: hotel.image_url }}
          style={styles.image}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <View style={styles.imageOverlay}>
          <Text h3 style={styles.hotelName}>{hotel.name}</Text>
          <Rating
            readonly
            startingValue={hotel.rating}
            imageSize={20}
            style={styles.rating}
          />
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.priceCard}>
          <Text style={styles.price}>
            {formatPrice(hotel.price_per_night)}
          </Text>
          <Text style={styles.perNight}>/night</Text>
        </View>
        
        <Text style={styles.description}>{hotel.description}</Text>
        
        <HotelAmenities amenities={amenities} />
        
        <HotelLocation
          name={hotel.name}
          latitude={hotel.latitude}
          longitude={hotel.longitude}
          address={hotel.address}
        />
        
        <ReviewList reviews={hotel.reviews || []} />
        
        <Button
          title="Book Now"
          onPress={() => navigation.navigate('Booking', { hotel })}
          containerStyle={styles.bookButton}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#4c669f', '#3b5998', '#192f6a'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  hotelName: {
    color: 'white',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  content: {
    padding: 20,
  },
  priceCard: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  price: {
    fontSize: 28,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  perNight: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#666',
  },
  bookButton: {
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});