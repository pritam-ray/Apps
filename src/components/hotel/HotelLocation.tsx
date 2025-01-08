import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from '@rneui/themed';
import MapView, { Marker } from 'react-native-maps';

interface HotelLocationProps {
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

export const HotelLocation: React.FC<HotelLocationProps> = ({
  name,
  latitude,
  longitude,
  address,
}) => {
  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Location</Text>
      <Text style={styles.address}>{address}</Text>
      
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={name}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    marginBottom: 10,
  },
  address: {
    marginBottom: 10,
    color: '#666',
  },
  map: {
    height: 200,
    width: Dimensions.get('window').width - 30,
    borderRadius: 10,
  },
});