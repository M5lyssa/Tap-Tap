import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen({ onStart }) {
  const handlePress = () => {
    console.log('Botão Começar foi pressionado no WelcomeScreen!');
    if (onStart) {
      onStart();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <Image
        source={require('./assets/burger.png')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      <View style={styles.overlay}>
        
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logo (2).png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.featuresContainer}>
            
            <View style={styles.featureItem}>
              <Image 
                source={require('./assets/boxicons_location-pin.png')} 
                style={styles.icon} 
                resizeMode="contain"
              />
              <Text style={styles.featureText}>Restaurantes próximos</Text>
            </View>

            <View style={styles.featureItem}>
              <Image 
                source={require('./assets/icon-park-twotone_express-delivery.png')} 
                style={styles.icon} 
                resizeMode="contain"
              />
              <Text style={styles.featureText}>Entrega rápida</Text>
            </View>

            <View style={styles.featureItem}>
              <Image 
                source={require('./assets/ic_outline-app-shortcut.png')} 
                style={styles.icon} 
                resizeMode="contain"
              />
              <Text style={styles.featureText}>Tudo em um só app</Text>
            </View>

          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handlePress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </View>

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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 260,
    height: 260,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  featuresContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 20,
    marginBottom: 25,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 14,
  },
  featureText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#8B0000',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});