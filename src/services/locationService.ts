import axios from 'axios';
import { supabase } from '../lib/supabase';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYm9sdGFpIiwiYSI6ImNscnhkZ2FteTB5NXYyam1udzB1emRqOWsifQ.RHGgXuqOHVeRxwgH7_U9Yg';

export const searchLocation = async (query: string) => {
  try {
    // First try Mapbox
    const mapboxResponse = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=place`
    );

    if (mapboxResponse.data.features.length > 0) {
      // Store search in database
      await storeSearchQuery(query);

      return mapboxResponse.data.features.map((feature: any) => ({
        id: feature.id,
        name: feature.place_name,
        latitude: feature.center[1],
        longitude: feature.center[0]
      }));
    }

    // Fallback to OpenStreetMap
    const osmResponse = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&featuretype=city`
    );

    if (osmResponse.data.length > 0) {
      // Store search in database
      await storeSearchQuery(query);

      return osmResponse.data.map((item: any) => ({
        id: item.place_id,
        name: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon)
      }));
    }

    return [];
  } catch (error) {
    console.error('Error searching location:', error);
    // Fallback to OpenStreetMap if Mapbox fails
    try {
      const osmResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&featuretype=city`
      );
      
      if (osmResponse.data.length > 0) {
        // Store search in database
        await storeSearchQuery(query);

        return osmResponse.data.map((item: any) => ({
          id: item.place_id,
          name: item.display_name,
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon)
        }));
      }
    } catch (osmError) {
      console.error('Error with fallback location search:', osmError);
    }
    return [];
  }
};

const storeSearchQuery = async (location: string) => {
  try {
    const { data: existingSearch } = await supabase
      .from('user_searches')
      .select('id, count')
      .eq('location', location)
      .single();

    if (existingSearch) {
      await supabase
        .from('user_searches')
        .update({ count: existingSearch.count + 1 })
        .eq('id', existingSearch.id);
    } else {
      await supabase
        .from('user_searches')
        .insert({ location, count: 1 });
    }
  } catch (error) {
    console.error('Error storing search query:', error);
  }
};