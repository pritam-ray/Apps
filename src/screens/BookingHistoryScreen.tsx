import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Card } from '@rneui/themed';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export const BookingHistoryScreen = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          hotel:hotels(*)
        `)
        .eq('user_id', user.id)
        .order('check_in', { ascending: false });

      if (error) throw error;
      setBookings(data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderBooking = ({ item }) => (
    <Card>
      <Card.Title>{item.hotel.name}</Card.Title>
      <Card.Divider />
      <Text>Check-in: {new Date(item.check_in).toLocaleDateString()}</Text>
      <Text>Check-out: {new Date(item.check_out).toLocaleDateString()}</Text>
      <Text style={styles.price}>Total: ${item.total_price}</Text>
      <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
        {item.status.toUpperCase()}
      </Text>
    </Card>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#2ecc71';
      case 'pending': return '#f1c40f';
      case 'cancelled': return '#e74c3c';
      default: return '#666';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={36} color="#192f6a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No bookings yet</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginVertical: 5,
  },
  status: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});