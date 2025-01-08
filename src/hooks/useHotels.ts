import { useState, useCallback } from 'react';
import { searchLocation } from '../services/locationService';
import { searchNearbyHotels } from '../services/hotelService';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const searchHotels = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const locations = await searchLocation(query);
      if (locations.length > 0) {
        const { latitude, longitude } = locations[0];
        
        // Store user search if authenticated
        if (user) {
          await supabase
            .from('user_searches')
            .insert({
              user_id: user.id,
              location: query
            });
        }

        const nearbyHotels = await searchNearbyHotels(latitude, longitude, query);
        setHotels(nearbyHotels);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  return { hotels, loading, error, searchHotels };
};