/*
  # Create hotels and bookings tables

  1. New Tables
    - `hotels`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `image_url` (text)
      - `price_per_night` (numeric)
      - `rating` (numeric)
      - `latitude` (numeric)
      - `longitude` (numeric)
      - `address` (text)
      - `created_at` (timestamp)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `hotel_id` (uuid, foreign key)
      - `check_in` (date)
      - `check_out` (date)
      - `total_price` (numeric)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create hotels table
CREATE TABLE hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  price_per_night numeric NOT NULL,
  rating numeric CHECK (rating >= 0 AND rating <= 5),
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  address text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  hotel_id uuid REFERENCES hotels NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  total_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (check_out > check_in)
);

-- Enable RLS
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies for hotels
CREATE POLICY "Hotels are viewable by everyone"
  ON hotels FOR SELECT
  TO public
  USING (true);

-- Policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);