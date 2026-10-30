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
import CouponsScreen from './CouponsScreen';
import FavoritesScreen from './FavoritesScreen';
import { calculateCouponDiscount } from './couponUtils';
import { restaurants } from './catalog';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash'); // 'splash' | 'welcome' | 'login' | 'register' | 'forgot' | 'home' | 'explore' | 'profile' | 'coupons' | 'favorites' | 'restaurant' | 'cart' | 'checkout'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteRestaurantIds, setFavoriteRestaurantIds] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [homeTab, setHomeTab] = useState('home');
  const [cartReturnScreen, setCartReturnScreen] = useState('home');
  const [couponReturnScreen, setCouponReturnScreen] = useState('profile');
  const [restaurantReturnScreen, setRestaurantReturnScreen] = useState('home');

  const openCart = (returnScreen) => {
    setCartReturnScreen(returnScreen);
    setCurrentScreen('cart');
  };

  const openCoupons = (returnScreen) => {
    setCouponReturnScreen(returnScreen);
    setCurrentScreen('coupons');
  };

  const deliveryFee = 0;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const couponDiscount = calculateCouponDiscount(
    selectedCoupon,
    cartItems,
    deliveryFee,
  );
  const cartTotal = Math.max(0, subtotal + deliveryFee - couponDiscount);

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
          onCartSelect={() => openCart('home')}
          onRestaurantSelect={(restaurant) => {
            setSelectedRestaurant(restaurant);
            setRestaurantReturnScreen('home');
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
          onCouponsSelect={() => openCoupons('profile')}
          onFavoritesSelect={() => setCurrentScreen('favorites')}
          onTabSelect={(tab) => {
            if (tab === 'home') {
              setHomeTab('home');
              setCurrentScreen('home');
              return;
            }

            if (tab === 'explore') {
              setCurrentScreen('explore');
              return;
            }

            if (tab === 'menu') {
              openCart('profile');
            }
          }}
          onLogout={() => setCurrentScreen('login')}
        />
      </TapEffects>
    );
  }

  if (currentScreen === 'favorites') {
    return (
      <TapEffects>
        <FavoritesScreen
          favorites={restaurants.filter((restaurant) =>
            favoriteRestaurantIds.includes(restaurant.id),
          )}
          onBack={() => setCurrentScreen('profile')}
          onRemoveFavorite={(restaurantId) =>
            setFavoriteRestaurantIds((ids) =>
              ids.filter((id) => id !== restaurantId),
            )
          }
          onRestaurantSelect={(restaurant) => {
            setSelectedRestaurant(restaurant);
            setRestaurantReturnScreen('favorites');
            setCurrentScreen('restaurant');
          }}
        />
      </TapEffects>
    );
  }

  if (currentScreen === 'coupons') {
    return (
      <TapEffects>
        <CouponsScreen
          selectedCoupon={selectedCoupon}
          onBack={() => setCurrentScreen(couponReturnScreen)}
          onSelectCoupon={(coupon) => {
            setSelectedCoupon(coupon);
            setCurrentScreen(couponReturnScreen);
          }}
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
              return;
            }

            if (tab === 'menu') {
              openCart('explore');
            }
          }}
          onRestaurantSelect={(restaurant) => {
            setSelectedRestaurant(restaurant);
            setRestaurantReturnScreen('explore');
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
          onBack={() => setCurrentScreen(restaurantReturnScreen)}
          isFavorite={favoriteRestaurantIds.includes(selectedRestaurant.id)}
          onToggleFavorite={() =>
            setFavoriteRestaurantIds((ids) =>
              ids.includes(selectedRestaurant.id)
                ? ids.filter((id) => id !== selectedRestaurant.id)
                : [...ids, selectedRestaurant.id],
            )
          }
          cartCount={cartItems.reduce((count, item) => count + item.quantity, 0)}
          onOpenCart={() => openCart('restaurant')}
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
                  categoryId: selectedRestaurant.categoryId,
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
          selectedCoupon={selectedCoupon}
          couponDiscount={couponDiscount}
          deliveryFee={deliveryFee}
          onBack={() => setCurrentScreen(cartReturnScreen)}
          onContinue={() => setCurrentScreen('checkout')}
          onChooseCoupon={() => openCoupons('cart')}
          onRemoveCoupon={() => setSelectedCoupon(null)}
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
    return (
      <TapEffects>
        <CheckoutScreen
          cartTotal={cartTotal}
          selectedCoupon={selectedCoupon}
          couponDiscount={couponDiscount}
          onBack={() => setCurrentScreen('cart')}
          onChooseCoupon={() => openCoupons('checkout')}
          onOrderComplete={() => {
            setCartItems([]);
            setSelectedCoupon(null);
            setHomeTab('home');
            setCurrentScreen('home');
          }}
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