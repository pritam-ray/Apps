import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from '@rneui/themed';
import { supabase } from '../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

export const TrendingLocations = ({ onLocationSelect }) => {
  const [trendingLocations, setTrendingLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrendingLocations();
  }, []);

  const loadTrendingLocations = async () => {
    try {
      const { data } = await supabase
        .from('user_searches')
        .select('location, count')
        .order('count', { ascending: false })
        .limit(10);

      setTrendingLocations(data || []);
    } catch (error) {
      console.error('Error loading trending locations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || trendingLocations.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Destinations</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {trendingLocations.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.locationCard}
            onPress={() => onLocationSelect(item.location)}
          >
            <Image
              source={{ uri: `https://source.unsplash.com/300x200/?${item.location},travel` }}
              style={styles.locationImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradient}
            />
            <Text style={styles.locationName}>{item.location}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 15,
    color: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  locationCard: {
    width: 150,
    height: 200,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  locationImage: {
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
  locationName: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});