import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from '@rneui/themed';

interface Amenity {
  icon: string;
  name: string;
}

interface HotelAmenitiesProps {
  amenities: Amenity[];
}

export const HotelAmenities: React.FC<HotelAmenitiesProps> = ({ amenities }) => {
  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Amenities</Text>
      <View style={styles.grid}>
        {amenities.map((amenity, index) => (
          <View key={index} style={styles.amenityItem}>
            <Icon name={amenity.icon} type="material" size={24} />
            <Text style={styles.amenityName}>{amenity.name}</Text>
          </View>
        ))}
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
  title: {
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    width: '33.33%',
    alignItems: 'center',
    marginVertical: 10,
  },
  amenityName: {
    marginTop: 5,
    textAlign: 'center',
  },
});