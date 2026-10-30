import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen({
  favorites = [],
  onBack,
  onRestaurantSelect,
  onRemoveFavorite,
  isDarkMode = false,
  fontSizeScale = 1.0,
}) {
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.backButtonBg }]}
          onPress={onBack}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Voltar ao perfil"
        >
          <Ionicons name="arrow-back" size={24} color={theme.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primaryText, fontSize: 22 * fontSizeScale }]}>
          Favoritos
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          favorites.length === 0 && styles.emptyScrollContainer,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={52} color={theme.primaryText} />
            <Text style={[styles.emptyTitle, { color: theme.primaryText, fontSize: 18 * fontSizeScale }]}>
              Sua lista está vazia
            </Text>
            <Text style={[styles.emptyText, { color: theme.subText, fontSize: 14 * fontSizeScale }]}>
              Toque no coração de um restaurante para adicioná-lo aos favoritos.
            </Text>
          </View>
        ) : (
          favorites.map((restaurant) => (
            <View key={restaurant.id} style={[styles.favoriteCard, { backgroundColor: theme.cardBg }]}>
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() => onRestaurantSelect?.(restaurant)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`${restaurant.name}, ${restaurant.category}, nota ${restaurant.rating}`}
              >
                <Image
                  source={restaurant.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                  accessibilityLabel={`Imagem de ${restaurant.name}`}
                />
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardTitle, { fontSize: 16 * fontSizeScale }]}>{restaurant.name}</Text>
                  <Text style={[styles.cardCategory, { fontSize: 13 * fontSizeScale }]}>{restaurant.category}</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={[styles.ratingText, { fontSize: 14 * fontSizeScale }]}>{restaurant.rating}</Text>
                    <Text style={[styles.reviewsText, { fontSize: 12 * fontSizeScale }]}>{restaurant.reviews}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => onRemoveFavorite?.(restaurant.id)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`Remover ${restaurant.name} dos favoritos`}
              >
                <Ionicons name="heart" size={22} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const lightTheme = {
  background: '#FAFAFA',
  headerBg: '#FAFAFA',
  cardBg: '#7A1313',
  primaryText: '#7A1313',
  subText: '#666',
  backButtonBg: '#F0F0F0',
};

const darkTheme = {
  background: '#121212',
  headerBg: '#121212',
  cardBg: '#1E1E1E',
  primaryText: '#E06B6B',
  subText: '#AAA',
  backButtonBg: '#2A2A2A',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 35, 
    paddingBottom: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  emptyScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    marginTop: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    marginTop: 6,
    lineHeight: 20,
    textAlign: 'center',
  },
  favoriteCard: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 2,
  },
  cardCategory: {
    color: '#E0E0E0',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 4,
  },
  reviewsText: {
    color: '#E0E0E0',
    marginLeft: 5,
  },
  heartButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});