import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { supabase } from '../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

export const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError('');
      const { error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) throw error;
      alert('Check your email for verification!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text h3 style={styles.title}>Travel Planner</Text>
        
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          containerStyle={styles.input}
          inputStyle={styles.inputText}
        />
        
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          containerStyle={styles.input}
          inputStyle={styles.inputText}
        />
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <Button
          title="Sign In"
          onPress={handleSignIn}
          loading={loading}
          containerStyle={styles.button}
        />
        
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          loading={loading}
          type="outline"
          containerStyle={styles.button}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#192f6a',
  },
  input: {
    marginBottom: 10,
  },
  inputText: {
    color: '#333',
  },
  button: {
    marginVertical: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});