import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Hotel } from '../types';

export const useFavorites = (userId: string) => {
  const [favorites, setFavorites] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadFavorites();
    }
  }, [userId]);

  const loadFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('hotel_id')
        .eq('user_id', userId);
      
      if (error) throw error;
      
      // Load hotel details for each favorite
      const hotelPromises = data.map(fav => 
        supabase
          .from('hotels')
          .select('*')
          .eq('id', fav.hotel_id)
          .single()
      );
      
      const hotels = await Promise.all(hotelPromises);
      setFavorites(hotels.map(h => h.data).filter(Boolean));
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (hotel: Hotel) => {
    try {
      const isFavorite = favorites.some(f => f.id === hotel.id);
      
      if (isFavorite) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', userId)
          .eq('hotel_id', hotel.id);
        
        setFavorites(prev => prev.filter(f => f.id !== hotel.id));
      } else {
        await supabase
          .from('favorites')
          .insert({ user_id: userId, hotel_id: hotel.id });
        
        setFavorites(prev => [...prev, hotel]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return { favorites, loading, toggleFavorite };
};