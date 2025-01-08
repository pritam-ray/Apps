export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface Hotel {
  id: string;
  name: string;
  description?: string;
  image_url: string;
  price_per_night: number;
  rating: number;
  latitude: number;
  longitude: number;
  address: string;
}

export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  minRating: number;
}