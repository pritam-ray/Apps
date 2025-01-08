import { useState } from 'react';
import { FilterOptions } from '../types';
import { DEFAULT_FILTERS } from '../config/constants';

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [isFilterVisible, setFilterVisible] = useState(false);

  const applyFilters = (hotels: any[]) => {
    return hotels.filter(hotel => 
      hotel.price_per_night >= filters.minPrice &&
      hotel.price_per_night <= filters.maxPrice &&
      hotel.rating >= filters.minRating
    );
  };

  return {
    filters,
    setFilters,
    isFilterVisible,
    setFilterVisible,
    applyFilters
  };
};