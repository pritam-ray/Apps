import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';

export const SignInScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Check if identifier is email or phone
      const isEmail = identifier.includes('@');
      let email = identifier;
      
      if (!isEmail) {
        // If phone number, get email from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('user:auth.users(email)')
          .eq('phone', identifier)
          .single();
          
        if (!profile?.user?.email) {
          throw new Error('User not found');
        }
        
        email = profile.user.email;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;
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
        <Text h3 style={styles.title}>Welcome Back!</Text>
        
        <Input
          placeholder="Email or Phone Number"
          value={identifier}
          onChangeText={setIdentifier}
          autoCapitalize="none"
          containerStyle={styles.input}
          inputStyle={styles.inputText}
          leftIcon={{ type: 'material', name: 'person', color: '#666' }}
        />
        
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          containerStyle={styles.input}
          inputStyle={styles.inputText}
          leftIcon={{ type: 'material', name: 'lock', color: '#666' }}
        />
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <Button
          title="Sign In"
          onPress={handleSignIn}
          loading={loading}
          containerStyle={styles.button}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#192f6a', '#3b5998', '#4c669f'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
        />

        <TouchableOpacity 
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
    marginVertical: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#3b5998',
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#666',
  },
  signUpLink: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
});