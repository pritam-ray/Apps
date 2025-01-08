import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Animated } from 'react-native';
import { Text } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from '../components/SearchBar';
import { HotelCard } from '../components/HotelCard';
import { FilterModal } from '../components/FilterModal';
import { TrendingLocations } from '../components/TrendingLocations';
import { useHotels } from '../hooks/useHotels';
import { useFilters } from '../hooks/useFilters';

export const HomeScreen = ({ navigation }) => {
  const { hotels, loading, error, searchHotels } = useHotels();
  const { filters, setFilters, isFilterVisible, setFilterVisible, applyFilters } = useFilters();
  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 100],
    extrapolate: 'clamp',
  });

  const filteredHotels = applyFilters(hotels);

  const handleLocationSelect = (location: string) => {
    searchHotels(location);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.headerGradient}
        >
          <SearchBar 
            onSearch={searchHotels}
            onFilterPress={() => setFilterVisible(true)}
          />
          <TrendingLocations onLocationSelect={handleLocationSelect} />
        </LinearGradient>
      </Animated.View>

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={36} color="#192f6a" />
        </View>
      )}

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      <FlatList
        data={filteredHotels}
        renderItem={({ item }) => (
          <HotelCard
            hotel={item}
            onPress={() => navigation.navigate('HotelDetails', { hotel: item })}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.hotelList}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        ListEmptyComponent={
          !loading && !error && (
            <Text style={styles.emptyText}>No hotels found. Try a different location.</Text>
          )
        }
      />

      <FilterModal
        visible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        filters={filters}
        onApply={setFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#192f6a',
  },
  headerGradient: {
    flex: 1,
    padding: 15,
  },
  hotelList: {
    padding: 10,
    paddingTop: 220,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 220,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
    marginTop: 220,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});