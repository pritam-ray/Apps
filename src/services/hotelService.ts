import axios from 'axios';
import { supabase } from '../lib/supabase';
import { getHotelImage } from './imageService';

const FOURSQUARE_API_KEY = 'fsq3uE+rseikIiWDvBwGSvWSD5XS6cx4Sh5jd1Bc2qSNP7k=';

export const searchNearbyHotels = async (latitude: number, longitude: number, location: string) => {
  try {
    // First check database for existing hotels in the area
    const { data: existingHotels } = await supabase
      .from('discovered_hotels')
      .select('*')
      .eq('location', location);

    if (existingHotels?.length > 0) {
      return existingHotels;
    }

    const response = await axios.get(
      `https://api.foursquare.com/v3/places/search?query=hotel&ll=${latitude},${longitude}&radius=5000`,
      {
        headers: {
          'Authorization': FOURSQUARE_API_KEY
        }
      }
    );
    
    // Map hotels and add images
    const hotelsWithImages = await Promise.all(
      response.data.results.map(async (hotel: any) => {
        // Check if hotel exists in database
        const { data: existingHotel } = await supabase
          .from('discovered_hotels')
          .select('*')
          .eq('name', hotel.name)
          .eq('latitude', hotel.geocodes.main.latitude)
          .eq('longitude', hotel.geocodes.main.longitude)
          .single();

        if (existingHotel) {
          return existingHotel;
        }

        const image_url = await getHotelImage(hotel.name);
        const hotelData = {
          name: hotel.name,
          description: `Experience luxury and comfort at ${hotel.name}, perfectly located in the heart of ${location}. Our hotel offers modern amenities, exceptional service, and easy access to local attractions.`,
          latitude: hotel.geocodes.main.latitude,
          longitude: hotel.geocodes.main.longitude,
          address: hotel.location.formatted_address,
          price_per_night: Math.floor(Math.random() * (300 - 50) + 50),
          rating: (Math.random() * (5 - 3) + 3).toFixed(1),
          image_url,
          location
        };

        // Store hotel in database
        const { data: newHotel } = await supabase
          .from('discovered_hotels')
          .insert(hotelData)
          .select()
          .single();
        
        return newHotel;
      })
    );
    
    return hotelsWithImages;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
};