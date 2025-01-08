import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from '@rneui/themed';
import { calculateNights } from '../../utils/date';
import { formatPrice, calculateTotalPrice } from '../../utils/price';

interface BookingSummaryProps {
  checkIn: Date;
  checkOut: Date;
  pricePerNight: number;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  checkIn,
  checkOut,
  pricePerNight,
}) => {
  const nights = calculateNights(checkIn, checkOut);
  const totalPrice = calculateTotalPrice(pricePerNight, nights);

  return (
    <View style={styles.container}>
      <Text h4>Booking Summary</Text>
      <Divider style={styles.divider} />
      
      <View style={styles.row}>
        <Text>Price per night</Text>
        <Text>{formatPrice(pricePerNight)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text>Number of nights</Text>
        <Text>{nights}</Text>
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.row}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.total}>{formatPrice(totalPrice)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  divider: {
    marginVertical: 10,
  },
  total: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});