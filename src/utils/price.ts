export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

export const calculateTotalPrice = (pricePerNight: number, nights: number): number => {
  return pricePerNight * nights;
};