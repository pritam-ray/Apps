import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';

export const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      setError('');
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: 'exp://localhost:19000/--/reset-password' }
      );

      if (resetError) throw resetError;
      
      setSuccess(true);
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
        <Text h3 style={styles.title}>Reset Password</Text>
        
        {!success ? (
          <>
            <Text style={styles.description}>
              Enter your email address and we'll send you instructions to reset your password.
            </Text>
            
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
            
            {error ? <Text style={styles.error}>{error}</Text> : null}
            
            <Button
              title="Send Reset Link"
              onPress={handleResetPassword}
              loading={loading}
              containerStyle={styles.button}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['#192f6a', '#3b5998', '#4c669f'],
                start: { x: 0, y: 0 },
                end: { x: 1, y: 0 },
              }}
            />
          </>
        ) : (
          <>
            <Text style={styles.successText}>
              Password reset instructions have been sent to your email.
            </Text>
            <Button
              title="Back to Sign In"
              onPress={() => navigation.navigate('SignIn')}
              containerStyle={styles.button}
              type="outline"
            />
          </>
        )}
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
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
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
  successText: {
    color: '#2ecc71',
    textAlign: 'center',
    marginBottom: 20,
  },
});