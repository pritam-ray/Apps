import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { useAuth } from '../hooks/useAuth';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { HotelDetailsScreen } from '../screens/HotelDetailsScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { BookingHistoryScreen } from '../screens/BookingHistoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Search':
            iconName = 'search';
            break;
          case 'Favorites':
            iconName = 'favorite';
            break;
          case 'Bookings':
            iconName = 'history';
            break;
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#192f6a',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen 
      name="Search" 
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
    <Tab.Screen name="Bookings" component={BookingHistoryScreen} />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#192f6a',
          },
          headerTintColor: '#fff',
        }}
      >
        {!user ? (
          <>
            <Stack.Screen 
              name="SignIn" 
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="SignUp" 
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="ForgotPassword" 
              component={ForgotPasswordScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HotelDetails"
              component={HotelDetailsScreen}
              options={{ title: 'Hotel Details' }}
            />
            <Stack.Screen
              name="Booking"
              component={BookingScreen}
              options={{ title: 'Book Hotel' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};