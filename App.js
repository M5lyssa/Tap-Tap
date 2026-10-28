import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from './Welcome';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import ForgotPasswordScreen from './ForgotPassword';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash'); // 'splash' | 'welcome' | 'login' | 'register' | 'forgot'

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (currentScreen === 'forgot') {
    return <ForgotPasswordScreen onBack={() => setCurrentScreen('login')} />;
  }

  if (currentScreen === 'register') {
    return <RegisterScreen onBack={() => setCurrentScreen('login')} />;
  }

  if (currentScreen === 'login') {
    return (
      <LoginScreen 
        onRegister={() => setCurrentScreen('register')} 
        onForgotPassword={() => setCurrentScreen('forgot')} 
      />
    );
  }

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStart={() => setCurrentScreen('login')} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <Image
        source={require('./assets/burger.png')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      <View style={styles.overlay}>
        <Image
          source={require('./assets/logo (2).png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 260,
    height: 260,
  },
});