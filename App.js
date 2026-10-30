import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from './Welcome';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import ForgotPasswordScreen from './ForgotPassword';
import HomeScreen from './Home';
import ProfileScreen from './ProfileScreen';
import RestaurantDetailScreen from './RestaurantDetail';
import CartScreen from './CartScreen';
import CheckoutScreen from './CheckoutScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash'); // 'splash' | 'welcome' | 'login' | 'register' | 'forgot' | 'home' | 'profile' | 'restaurant' | 'cart' | 'checkout'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);

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
        onLogin={() => setCurrentScreen('home')}
        onRegister={() => setCurrentScreen('register')} 
        onForgotPassword={() => setCurrentScreen('forgot')} 
      />
    );
  }

  if (currentScreen === 'home') {
    return (
      <HomeScreen
        onRestaurantSelect={(restaurant) => {
          setSelectedRestaurant(restaurant);
          setCurrentScreen('restaurant');
        }}
        onTabSelect={(tabId) => {
          if (tabId === 'profile') {
            setCurrentScreen('profile');
          }
        }}
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfileScreen
        onTabSelect={(tabId) => {
          if (tabId === 'home') {
            setCurrentScreen('home');
          }
        }}
        onLogout={() => setCurrentScreen('login')}
      />
    );
  }

  if (currentScreen === 'restaurant' && selectedRestaurant) {
    return (
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
    );
  }

  if (currentScreen === 'cart') {
    return (
      <CartScreen
        cartItems={cartItems}
        onBack={() => setCurrentScreen('restaurant')}
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
        onCheckout={() => setCurrentScreen('checkout')}
      />
    );
  }

  if (currentScreen === 'checkout') {
    return (
      <CheckoutScreen
        cartTotal={cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
        onBack={() => setCurrentScreen('cart')}
        onOrderComplete={() => {
          setCartItems([]); // Limpa o carrinho após finalizar o pedido
          setCurrentScreen('home'); // Retorna para a tela inicial
        }}
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