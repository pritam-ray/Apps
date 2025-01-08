import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import { DateRangePicker } from '../components/booking/DateRangePicker';
import { BookingSummary } from '../components/booking/BookingSummary';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { addDays } from '../utils/date';
import { calculateTotalPrice } from '../utils/price';

export const BookingScreen = ({ route, navigation }) => {
  const { hotel } = route.params;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(addDays(new Date(), 1));

  const handleBooking = async () => {
    if (!user) {
      Alert.alert('Error', 'Please log in to make a booking');
      return;
    }

    setLoading(true);
    try {
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      const totalPrice = calculateTotalPrice(hotel.price_per_night, nights);

      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          hotel_id: hotel.id,
          check_in: checkIn.toISOString(),
          check_out: checkOut.toISOString(),
          total_price: totalPrice,
          status: 'pending'
        });

      if (error) throw error;

      Alert.alert('Success', 'Booking created successfully');
      navigation.navigate('Bookings');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <DateRangePicker
        checkIn={checkIn}
        checkOut={checkOut}
        onCheckInChange={setCheckIn}
        onCheckOutChange={setCheckOut}
      />

      <BookingSummary
        checkIn={checkIn}
        checkOut={checkOut}
        pricePerNight={hotel.price_per_night}
      />

      <Button
        title={loading ? 'Creating Booking...' : 'Confirm Booking'}
        onPress={handleBooking}
        disabled={loading}
        containerStyle={styles.buttonContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    marginVertical: 20,
  },
});