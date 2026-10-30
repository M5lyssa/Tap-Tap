import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from './Welcome';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import ForgotPasswordScreen from './ForgotPassword';
import HomeScreen from './Home';
import RestaurantDetailScreen from './RestaurantDetail';
import CartScreen from './CartScreen';
import CheckoutScreen from './CheckoutScreen';
import TapEffects from './TapEffects';
import ProfileScreen from './ProfileScreen';
import ExploreScreen from './ExploreScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash'); // 'splash' | 'welcome' | 'login' | 'register' | 'forgot' | 'home' | 'explore' | 'profile' | 'restaurant' | 'cart' | 'checkout'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [homeTab, setHomeTab] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (currentScreen === 'forgot') {
    return (
      <TapEffects>
        <ForgotPasswordScreen onBack={() => setCurrentScreen('login')} />
      </TapEffects>
    );
  }

  if (currentScreen === 'register') {
    return (
      <TapEffects>
        <RegisterScreen onBack={() => setCurrentScreen('login')} />
      </TapEffects>
    );
  }

  if (currentScreen === 'login') {
    return (
      <TapEffects>
        <LoginScreen
          onLogin={() => setCurrentScreen('home')}
          onRegister={() => setCurrentScreen('register')}
          onForgotPassword={() => setCurrentScreen('forgot')}
        />
      </TapEffects>
    );
  }

  if (currentScreen === 'home') {
    return (
      <TapEffects>
        <HomeScreen
          initialTab={homeTab}
          onTabSelect={setHomeTab}
          onProfileSelect={() => setCurrentScreen('profile')}
          onExploreSelect={() => setCurrentScreen('explore')}
          onRestaurantSelect={(restaurant) => {
            setSelectedRestaurant(restaurant);
            setCurrentScreen('restaurant');
          }}
        />
      </TapEffects>
    );
  }

  if (currentScreen === 'profile') {
    return (
      <TapEffects>
        <ProfileScreen
          onTabSelect={(tab) => {
            if (tab === 'home') {
              setHomeTab('home');
              setCurrentScreen('home');
              return;
            }

            if (tab === 'explore') {
              setCurrentScreen('explore');
            }
          }}
          onLogout={() => setCurrentScreen('login')}
        />
      </TapEffects>
    );
  }

  if (currentScreen === 'explore') {
    return (
      <TapEffects>
        <ExploreScreen
          onTabSelect={(tab) => {
            if (tab === 'home') {
              setHomeTab('home');
              setCurrentScreen('home');
              return;
            }

            if (tab === 'profile') {
              setCurrentScreen('profile');
            }
          }}
          onRestaurantSelect={(restaurant) => {
            setSelectedRestaurant(restaurant);
            setCurrentScreen('restaurant');
          }}
        />
      </TapEffects>
    );
  }

  if (currentScreen === 'restaurant' && selectedRestaurant) {
    return (
      <TapEffects>
        <RestaurantDetailScreen
          restaurant={selectedRestaurant}
          onBack={() => setCurrentScreen('home')}
          cartCount={cartItems.reduce((count, item) => count + item.quantity, 0)}
          onOpenCart={() => setCurrentScreen('cart')}
          onAddToCart={(menuItem) => {
            const itemId = `${selectedRestaurant.id}-${menuItem.id}`;
            const price = Number(
              menuItem.price.replace(/[^\d,]/g, '').replace(',', '.'),
            );
            setCartItems((items) => {
              const existingItem = items.find((item) => item.id === itemId);

              if (existingItem) {
                return items.map((item) =>
                  item.id === itemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                );
              }

              return [
                ...items,
                {
                  id: itemId,
                  name: menuItem.title,
                  price,
                  quantity: 1,
                  image: menuItem.image,
                },
              ];
            });
          }}
        />
      </TapEffects>
    );
  }

  if (currentScreen === 'cart') {
    return (
      <TapEffects>
        <CartScreen
          cartItems={cartItems}
          onBack={() => setCurrentScreen('restaurant')}
          onContinue={() => setCurrentScreen('checkout')}
          onUpdateQuantity={(id, delta) => {
            setCartItems((items) =>
              items
                .map((item) => {
                  if (item.id !== id) {
                    return item;
                  }

                  const quantity = item.quantity + delta;
                  return quantity > 0 ? { ...item, quantity } : null;
                })
                .filter(Boolean),
            );
          }}
          onRemoveItem={(id) =>
            setCartItems((items) => items.filter((item) => item.id !== id))
          }
        />
      </TapEffects>
    );
  }

  if (currentScreen === 'checkout') {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return (
      <TapEffects>
        <CheckoutScreen
          total={total}
          onBack={() => setCurrentScreen('cart')}
        />
      </TapEffects>
    );
  }

  if (currentScreen === 'welcome') {
    return (
      <TapEffects>
        <WelcomeScreen onStart={() => setCurrentScreen('login')} />
      </TapEffects>
    );
  }

  return (
    <TapEffects>
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
    </TapEffects>
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