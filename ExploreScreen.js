import React, { useMemo, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { categories, restaurants } from './Home';

const tabs = [
  { id: 'home', label: 'Início', image: require('./assets/home.png') },
  { id: 'explore', label: 'Explorar', image: require('./assets/imagemmapa.png') },
  { id: 'menu', label: 'Cardápio', image: require('./assets/garfos.png') },
  { id: 'profile', label: 'Perfil', image: require('./assets/perfil(2).png') },
];

export default function ExploreScreen({ onTabSelect, onRestaurantSelect }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRestaurants = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('pt-BR');

    return restaurants.filter((restaurant) => {
      const matchesCategory =
        activeCategory === null || restaurant.categoryId === activeCategory;
      const matchesSearch =
        query.length === 0 ||
        `${restaurant.name} ${restaurant.category}`
          .toLocaleLowerCase('pt-BR')
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Explorar</Text>
        <Text style={styles.subtitle}>Encontre seu próximo pedido</Text>

        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <View style={styles.searchIconCircle} />
            <View style={styles.searchIconHandle} />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar restaurantes..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            accessibilityLabel="Buscar restaurantes"
          />
        </View>

        <Text style={styles.sectionTitle}>Categorias</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          <TouchableOpacity
            style={[
              styles.categoryItem,
              activeCategory === null && styles.categoryItemSelected,
            ]}
            onPress={() => setActiveCategory(null)}
            accessibilityRole="button"
            accessibilityState={{ selected: activeCategory === null }}
          >
            <Text
              style={[
                styles.allCategoriesText,
                activeCategory === null && styles.categoryNameSelected,
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>
          {categories.map((category) => {
            const isSelected = activeCategory === category.id;

            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  isSelected && styles.categoryItemSelected,
                ]}
                onPress={() =>
                  setActiveCategory(isSelected ? null : category.id)
                }
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <Image
                  source={category.image}
                  style={styles.categoryIcon}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.categoryName,
                    isSelected && styles.categoryNameSelected,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.resultsHeader}>
          <Text style={styles.sectionTitle}>Restaurantes</Text>
          <Text style={styles.resultCount}>
            {filteredRestaurants.length} encontrados
          </Text>
        </View>

        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              style={styles.restaurantCard}
              onPress={() => onRestaurantSelect?.(restaurant)}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={`${restaurant.name}, ${restaurant.category}, nota ${restaurant.rating}`}
            >
              <Image
                source={restaurant.image}
                style={styles.restaurantImage}
                resizeMode="cover"
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantCategory}>
                  {restaurant.category}
                </Text>
                <View style={styles.detailsRow}>
                  <Text style={styles.starIcon}>★</Text>
                  <Text style={styles.detailText}>
                    {restaurant.rating} {restaurant.reviews}
                  </Text>
                  <Text style={styles.timeText}>{restaurant.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyState}>
            Nenhum restaurante encontrado.
          </Text>
        )}
      </ScrollView>

      <View style={styles.bottomTabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              tab.id === 'explore' && styles.activeTabButton,
            ]}
            onPress={() => {
              if (tab.id !== 'menu') {
                onTabSelect?.(tab.id);
              }
            }}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: tab.id === 'explore' }}
          >
            <Image source={tab.image} style={styles.tabIcon} resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 90,
  },
  title: {
    color: '#7A1313',
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#8B0000',
    borderRadius: 30,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchIcon: {
    width: 20,
    height: 16,
    position: 'relative',
    marginRight: 12,
  },
  searchIconCircle: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: '#8B0000',
    borderRadius: 8,
  },
  searchIconHandle: {
    position: 'absolute',
    width: 8,
    height: 2,
    right: -5,
    bottom: 0,
    backgroundColor: '#8B0000',
    transform: [{ rotate: '45deg' }],
  },
  searchInput: {
    flex: 1,
    color: '#222',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#111',
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoriesRow: {
    paddingVertical: 12,
    paddingRight: 8,
  },
  categoryItem: {
    minWidth: 72,
    minHeight: 76,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    marginRight: 10,
    paddingHorizontal: 9,
    paddingVertical: 8,
  },
  categoryItemSelected: {
    borderColor: '#7A1313',
    backgroundColor: '#FFF3F3',
  },
  categoryIcon: {
    width: 34,
    height: 34,
    marginBottom: 4,
  },
  categoryName: {
    color: '#555',
    fontSize: 11,
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: '#7A1313',
    fontWeight: '700',
  },
  allCategoriesText: {
    color: '#555',
    fontSize: 13,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },
  resultCount: {
    color: '#777',
    fontSize: 12,
  },
  restaurantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    elevation: 1,
  },
  restaurantImage: {
    width: 92,
    height: 92,
    borderRadius: 10,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 12,
  },
  restaurantName: {
    color: '#111',
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantCategory: {
    color: '#666',
    fontSize: 13,
    marginTop: 3,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  starIcon: {
    color: '#DAA520',
    fontSize: 15,
    marginRight: 4,
  },
  detailText: {
    color: '#555',
    fontSize: 12,
  },
  timeText: {
    color: '#555',
    fontSize: 11,
    marginLeft: 'auto',
  },
  emptyState: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 24,
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#7A1313',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#5A0D0D',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  activeTabButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  tabIcon: {
    width: 26,
    height: 26,
  },
});
