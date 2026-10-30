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
import { categories, restaurants } from './catalog';

const tabs = [
  { id: 'home', label: 'Início', image: require('./assets/home.png') },
  { id: 'explore', label: 'Explorar', image: require('./assets/imagemmapa.png') },
  { id: 'menu', label: 'Cardápio', image: require('./assets/garfos.png') },
  { id: 'profile', label: 'Perfil', image: require('./assets/perfil(2).png') },
];

export default function ExploreScreen({
  onTabSelect,
  onRestaurantSelect,
  isDarkMode = false,
  fontSizeScale = 1.0,
}) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = isDarkMode ? darkTheme : lightTheme;

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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: theme.titleColor, fontSize: 26 * fontSizeScale }]}>
          Explorar
        </Text>
        <Text style={[styles.subtitle, { color: theme.subText, fontSize: 14 * fontSizeScale }]}>
          Encontre seu próximo pedido
        </Text>

        <View style={[styles.searchContainer, { backgroundColor: theme.searchBg, borderColor: theme.searchBorder }]}>
          <View style={styles.searchIcon}>
            <View style={[styles.searchIconCircle, { borderColor: theme.searchIconColor }]} />
            <View style={[styles.searchIconHandle, { backgroundColor: theme.searchIconColor }]} />
          </View>
          <TextInput
            style={[styles.searchInput, { color: theme.text, fontSize: 14 * fontSizeScale }]}
            placeholder="Buscar restaurantes..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            accessibilityLabel="Buscar restaurantes"
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text, fontSize: 18 * fontSizeScale }]}>
          Categorias
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          <TouchableOpacity
            style={[
              styles.categoryItem,
              { backgroundColor: theme.cardBg, borderColor: theme.border },
              activeCategory === null && {
                borderColor: theme.selectedCategoryBorder,
                backgroundColor: theme.selectedCategoryBg,
              },
            ]}
            onPress={() => setActiveCategory(null)}
            accessibilityRole="button"
            accessibilityState={{ selected: activeCategory === null }}
          >
            <Text
              style={[
                styles.allCategoriesText,
                { color: theme.subText, fontSize: 13 * fontSizeScale },
                activeCategory === null && {
                  color: theme.selectedCategoryText,
                  fontWeight: '700',
                },
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
                  { backgroundColor: theme.cardBg, borderColor: theme.border },
                  isSelected && {
                    borderColor: theme.selectedCategoryBorder,
                    backgroundColor: theme.selectedCategoryBg,
                  },
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
                    { color: theme.subText, fontSize: 11 * fontSizeScale },
                    isSelected && {
                      color: theme.selectedCategoryText,
                      fontWeight: '700',
                    },
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.resultsHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text, fontSize: 18 * fontSizeScale }]}>
            Restaurantes
          </Text>
          <Text style={[styles.resultCount, { color: theme.subText, fontSize: 12 * fontSizeScale }]}>
            {filteredRestaurants.length} encontrados
          </Text>
        </View>

        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              style={[
                styles.restaurantCard,
                { backgroundColor: theme.cardBg, borderColor: theme.border },
              ]}
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
                <Text style={[styles.restaurantName, { color: theme.restaurantTitle, fontSize: 16 * fontSizeScale }]}>
                  {restaurant.name}
                </Text>
                <Text style={[styles.restaurantCategory, { color: theme.subText, fontSize: 13 * fontSizeScale }]}>
                  {restaurant.category}
                </Text>
                <View style={styles.detailsRow}>
                  <Text style={styles.starIcon}>★</Text>
                  <Text style={[styles.detailText, { color: theme.subText, fontSize: 12 * fontSizeScale }]}>
                    {restaurant.rating} {restaurant.reviews}
                  </Text>
                  <Text style={[styles.timeText, { color: theme.subText, fontSize: 11 * fontSizeScale }]}>
                    {restaurant.time}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={[styles.emptyState, { color: theme.subText, fontSize: 14 * fontSizeScale }]}>
            Nenhum restaurante encontrado.
          </Text>
        )}
      </ScrollView>

      <View style={[styles.bottomTabBar, { backgroundColor: theme.tabBarBg, borderTopColor: theme.tabBarBorder }]}>
        {tabs.map((tab) => {
          const isActive = tab.id === 'explore';

          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                isActive && styles.activeTabButton,
              ]}
              onPress={() => {
                onTabSelect?.(tab.id);
              }}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: isActive }}
            >
              <Image source={tab.image} style={styles.tabIcon} resizeMode="contain" />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const lightTheme = {
  background: '#FAFAFA',
  cardBg: '#FFF',
  border: '#EEE',
  titleColor: '#7A1313',
  subText: '#666',
  searchBg: '#FFF',
  searchBorder: '#8B0000',
  searchIconColor: '#8B0000',
  text: '#111',
  restaurantTitle: '#111',
  selectedCategoryBorder: '#7A1313',
  selectedCategoryBg: '#FFF3F3',
  selectedCategoryText: '#7A1313',
  tabBarBg: '#7A1313',
  tabBarBorder: '#5A0D0D',
};

const darkTheme = {
  background: '#121212',
  cardBg: '#1E1E1E',
  border: '#333333',
  titleColor: '#FFFFFF',
  subText: '#AAAAAA',
  searchBg: '#1E1E1E',
  searchBorder: '#A56868',
  searchIconColor: '#FFF',
  text: '#FFFFFF',
  restaurantTitle: '#E06B6B',
  selectedCategoryBorder: '#A56868',
  selectedCategoryBg: '#2A1A1A',
  selectedCategoryText: '#E06B6B',
  tabBarBg: '#1E1E1E',
  tabBarBorder: '#333333',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 28, // Ajustado para afastar da barra de status superior
    paddingBottom: 90,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
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
    borderRadius: 8,
  },
  searchIconHandle: {
    position: 'absolute',
    width: 8,
    height: 2,
    right: -5,
    bottom: 0,
    transform: [{ rotate: '45deg' }],
  },
  searchInput: {
    flex: 1,
  },
  sectionTitle: {
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
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 9,
    paddingVertical: 8,
  },
  categoryIcon: {
    width: 34,
    height: 34,
    marginBottom: 4,
  },
  categoryName: {
    textAlign: 'center',
  },
  allCategoriesText: {},
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },
  resultCount: {},
  restaurantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
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
    fontWeight: 'bold',
  },
  restaurantCategory: {
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
  detailText: {},
  timeText: {
    marginLeft: 'auto',
  },
  emptyState: {
    textAlign: 'center',
    paddingVertical: 24,
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
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