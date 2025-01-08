import axios from 'axios';
import { supabase } from '../lib/supabase';

const UNSPLASH_ACCESS_KEY = 'nMgo622-B5kGqqOMF6uYfrXj_msndc8jodhKh3XbWIg';

export const getHotelImage = async (hotelName: string) => {
  try {
    // First check database for existing hotel image
    const { data: existingHotel } = await supabase
      .from('discovered_hotels')
      .select('image_url')
      .eq('name', hotelName)
      .single();

    if (existingHotel?.image_url) {
      return existingHotel.image_url;
    }

    const response = await axios.get(
      'https://api.unsplash.com/photos/random', {
        params: {
          query: `${hotelName} hotel building`,
          orientation: 'landscape',
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    return response.data.urls.regular;
  } catch (error) {
    // Fallback images if API fails or rate limit exceeded
    const fallbackImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
    ];
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }
};