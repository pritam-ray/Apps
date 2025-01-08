import Constants from 'expo-constants';

export const ENV = {
  SUPABASE_URL: process.env.VITE_SUPABASE_URL || 'https://owwblflwjpopycclgccy.supabase.co',
  SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93d2JsZmx3anBvcHljY2xnY2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NTIwMjUsImV4cCI6MjA1MTQyODAyNX0.DiHmEQj9DQ9F16CnkkbWxqoSHB5H9zFN0asyfnqWYz8',
  FOURSQUARE_API_KEY: 'fsq3uE+rseikIiWDvBwGSvWSD5XS6cx4Sh5jd1Bc2qSNP7k=', // Replace with your key
  UNSPLASH_ACCESS_KEY: 'nMgo622-B5kGqqOMF6uYfrXj_msndc8jodhKh3XbWIg', // Replace with your key
};