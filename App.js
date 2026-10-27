import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from './Welcome';
import LoginScreen from './Login';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash'); // 'splash' | 'welcome' | 'login'

  useEffect(() => {
    // Temporizador de 2.5 segundos para passar da Splash para o Welcome
    const timer = setTimeout(() => {
      setCurrentScreen('welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleGoToLogin = () => {
    console.log('App.js recebeu o comando: Mudando para a tela de login!');
    setCurrentScreen('login');
  };

  // Se o estado for 'login', mostra a tela de login
  if (currentScreen === 'login') {
    return <LoginScreen />;
  }

  // Se o estado for 'welcome', mostra o ecrã de boas-vindas
  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStart={handleGoToLogin} />;
  }

  // Ecrã inicial (Splash Screen)
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