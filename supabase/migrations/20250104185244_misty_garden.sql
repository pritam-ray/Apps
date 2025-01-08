/*
  # User Searches and Hotel Data Schema

  1. Tables
    - user_searches: Track user search history
    - discovered_hotels: Store unique hotels from searches
  
  2. Security
    - RLS enabled on all tables
    - Appropriate access policies
*/

-- First, ensure extensions are available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ 
BEGIN
    -- Create user_searches table if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'user_searches') THEN
        CREATE TABLE user_searches (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id uuid NOT NULL,
            location text NOT NULL,
            search_date timestamptz DEFAULT now(),
            CONSTRAINT fk_user
                FOREIGN KEY(user_id) 
                REFERENCES auth.users(id)
                ON DELETE CASCADE
        );
    END IF;

    -- Create discovered_hotels table if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'discovered_hotels') THEN
        CREATE TABLE discovered_hotels (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            name text NOT NULL,
            description text,
            image_url text,
            price_per_night numeric NOT NULL,
            rating numeric,
            latitude numeric NOT NULL,
            longitude numeric NOT NULL,
            address text NOT NULL,
            location text NOT NULL,
            discovered_at timestamptz DEFAULT now(),
            CONSTRAINT valid_rating 
                CHECK (rating >= 0 AND rating <= 5),
            CONSTRAINT unique_hotel_location 
                UNIQUE(name, latitude, longitude)
        );
    END IF;
END $$;

-- Enable Row Level Security
DO $$ 
BEGIN
    -- Enable RLS on user_searches
    ALTER TABLE user_searches ENABLE ROW LEVEL SECURITY;
    
    -- Enable RLS on discovered_hotels
    ALTER TABLE discovered_hotels ENABLE ROW LEVEL SECURITY;
EXCEPTION
    WHEN others THEN null; -- Ignore if RLS is already enabled
END $$;

-- Create policies if they don't exist
DO $$ 
BEGIN
    -- Policies for user_searches
    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'user_searches' 
        AND policyname = 'Users can view their own searches'
    ) THEN
        CREATE POLICY "Users can view their own searches"
            ON user_searches FOR SELECT
            TO authenticated
            USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'user_searches' 
        AND policyname = 'Users can create their own searches'
    ) THEN
        CREATE POLICY "Users can create their own searches"
            ON user_searches FOR INSERT
            TO authenticated
            WITH CHECK (auth.uid() = user_id);
    END IF;

    -- Policies for discovered_hotels
    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'discovered_hotels' 
        AND policyname = 'Hotels are viewable by everyone'
    ) THEN
        CREATE POLICY "Hotels are viewable by everyone"
            ON discovered_hotels FOR SELECT
            TO public
            USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'discovered_hotels' 
        AND policyname = 'Authenticated users can insert hotels'
    ) THEN
        CREATE POLICY "Authenticated users can insert hotels"
            ON discovered_hotels FOR INSERT
            TO authenticated
            WITH CHECK (true);
    END IF;
END $$;