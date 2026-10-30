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
  favorites,
  onBack,
  onRestaurantSelect,
  onRemoveFavorite,
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Voltar ao perfil"
        >
          <Ionicons name="arrow-back" size={24} color="#7A1313" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favoritos</Text>
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
            <Ionicons name="heart-outline" size={52} color="#7A1313" />
            <Text style={styles.emptyTitle}>Sua lista está vazia</Text>
            <Text style={styles.emptyText}>
              Toque no coração de um restaurante para adicioná-lo aos favoritos.
            </Text>
          </View>
        ) : (
          favorites.map((restaurant) => (
            <View key={restaurant.id} style={styles.favoriteCard}>
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
                  <Text style={styles.cardTitle}>{restaurant.name}</Text>
                  <Text style={styles.cardCategory}>{restaurant.category}</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                    <Text style={styles.reviewsText}>{restaurant.reviews}</Text>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7A1313',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7A1313',
  },
  emptyText: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    textAlign: 'center',
  },
  favoriteCard: {
    backgroundColor: '#7A1313',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 2,
  },
  cardCategory: {
    fontSize: 13,
    color: '#E0E0E0',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#E0E0E0',
    marginLeft: 5,
  },
  heartButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
