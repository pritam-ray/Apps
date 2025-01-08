import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';

export const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate inputs
      if (!fullName || !email || !phone || !password) {
        throw new Error('Please fill in all fields');
      }

      // Sign up user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // Create profile
      if (authData?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: authData.user.id,
            full_name: fullName,
            phone,
          });

        if (profileError) throw profileError;
      }

      alert('Account created successfully!');
      navigation.navigate('SignIn');
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          <Text h3 style={styles.title}>Create Account</Text>
          
          <Input
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            containerStyle={styles.input}
            inputStyle={styles.inputText}
            leftIcon={{ type: 'material', name: 'person', color: '#666' }}
          />
          
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={styles.input}
            inputStyle={styles.inputText}
            leftIcon={{ type: 'material', name: 'email', color: '#666' }}
          />
          
          <Input
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            containerStyle={styles.input}
            inputStyle={styles.inputText}
            leftIcon={{ type: 'material', name: 'phone', color: '#666' }}
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
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
            containerStyle={styles.button}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#192f6a', '#3b5998', '#4c669f'],
              start: { x: 0, y: 0 },
              end: { x: 1, y: 0 },
            }}
          />

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <Text
              style={styles.signInLink}
              onPress={() => navigation.navigate('SignIn')}
            >
              Sign In
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#666',
  },
  signInLink: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
});