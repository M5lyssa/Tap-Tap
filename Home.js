import React, { useMemo, useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const categories = [
  { id: 'lanches', name: 'Lanches', image: require('./assets/lanches.png') },
  { id: 'japonesa', name: 'Japonesa', image: require('./assets/japones.png') },
  { id: 'bebidas', name: 'Bebidas', image: require('./assets/bebidas.png') },
  { id: 'pizzas', name: 'Pizzas', image: require('./assets/pizzas.png') },
  { id: 'outras', name: 'Outras', image: require('./assets/outros.png') },
];

const bannerSlides = [
  {
    id: 'bebidas',
    image: require('./assets/promobebidas.jpg'),
    label: 'Promoção de bebidas',
  },
  {
    id: 'hamburguer',
    image: require('./assets/promohamburguer.jpg'),
    label: 'Promoção de hambúrguer',
  },
  {
    id: 'farmacia',
    image: require('./assets/farmacia.jpg'),
    label: 'Ofertas de farmácia',
  },
  {
    id: 'ofertas',
    image: require('./assets/imagemcarrocel.jpg'),
    label: 'Ofertas de hoje: até 50% de desconto',
  },
];

const restaurants = [
  {
    id: 'burger-house',
    name: 'Burguer house',
    category: 'Hambúrguer • $$',
    categoryId: 'lanches',
    rating: '4,5',
    reviews: '(12k)',
    time: '30 - 45 min',
    image: require('./assets/burger.png'),
  },
  {
    id: 'pizza-house',
    name: 'Pizzahouse',
    category: 'Pizza • $$$',
    categoryId: 'pizzas',
    rating: '3,5',
    reviews: '(18k)',
    time: '30 - 45 min',
    image: require('./assets/imagemcarrocel.jpg'),
  },
];

const tabs = [
  { id: 'home', label: 'Início', image: require('./assets/home.png') },
  { id: 'explore', label: 'Explorar', image: require('./assets/imagemmapa.png') },
  { id: 'menu', label: 'Cardápio', image: require('./assets/garfos.png') },
  { id: 'profile', label: 'Perfil', image: require('./assets/perfil(2).png') },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBanner, setActiveBanner] = useState(0);
  const bannerCarouselRef = useRef(null);
  const { width: windowWidth } = useWindowDimensions();
  const bannerWidth = windowWidth - 32;

  const filteredRestaurants = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('pt-BR');

    return restaurants.filter((restaurant) => {
      const matchesCategory =
        activeCategory === null || restaurant.categoryId === activeCategory;
      const matchesSearch =
        query.length === 0 ||
        `${restaurant.name} ${restaurant.category}`.toLocaleLowerCase('pt-BR').includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.locationContainer}>
          <Image
            source={require('./assets/boxicons_location-pin.png')}
            style={styles.locationIcon}
            resizeMode="contain"
          />
          <Text style={styles.locationText}>Maceió, AL</Text>
          <Text style={styles.locationChevron}>⌄</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <View style={styles.searchIconCircle} />
            <View style={styles.searchIconHandle} />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar restaurantes, pratos..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            accessibilityLabel="Buscar restaurantes e pratos"
          />
        </View>

        <ScrollView
          ref={bannerCarouselRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={[styles.bannerCarousel, { width: bannerWidth }]}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / bannerWidth,
            );
            setActiveBanner(index);
          }}
          accessibilityLabel="Carrossel de ofertas"
        >
          {bannerSlides.map((slide) => (
            <Image
              key={slide.id}
              source={slide.image}
              style={[styles.bannerImage, { width: bannerWidth }]}
              resizeMode="cover"
              accessibilityLabel={slide.label}
            />
          ))}
        </ScrollView>
        <View style={styles.bannerIndicators}>
          {bannerSlides.map((slide, index) => (
            <TouchableOpacity
              key={slide.id}
              style={[
                styles.bannerIndicator,
                activeBanner === index && styles.activeBannerIndicator,
              ]}
              onPress={() => {
                bannerCarouselRef.current?.scrollTo({
                  x: index * bannerWidth,
                  animated: true,
                });
                setActiveBanner(index);
              }}
              accessibilityRole="button"
              accessibilityLabel={`Ir para oferta ${index + 1}: ${slide.label}`}
              accessibilityState={{ selected: activeBanner === index }}
            />
          ))}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.map((category) => {
            const isSelected = activeCategory === category.id;

            return (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                activeOpacity={0.8}
                onPress={() =>
                  setActiveCategory(isSelected ? null : category.id)
                }
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <Image
                  source={category.image}
                  style={[
                    styles.categoryIcon,
                    isSelected && styles.selectedCategoryIcon,
                  ]}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.categoryName,
                    isSelected && styles.selectedCategoryName,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Restaurantes em destaque</Text>
          <TouchableOpacity
            onPress={() => setActiveCategory(null)}
            accessibilityRole="button"
          >
            <Text style={styles.seeAllText}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {filteredRestaurants.length > 0 ? (
          <View style={styles.restaurantsGrid}>
            {filteredRestaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.restaurantCard}
                activeOpacity={0.9}
                accessibilityRole="button"
                accessibilityLabel={`${restaurant.name}, ${restaurant.category}, nota ${restaurant.rating}`}
              >
                <Image
                  source={restaurant.image}
                  style={styles.restaurantImage}
                  resizeMode="cover"
                />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName} numberOfLines={1}>
                    {restaurant.name}
                  </Text>
                  <Text style={styles.restaurantCategory} numberOfLines={1}>
                    {restaurant.category}
                  </Text>
                  <View style={styles.restaurantDetailsRow}>
                    <Text style={styles.starIcon}>★</Text>
                    <Text style={styles.ratingText}>
                      {restaurant.rating}{' '}
                      <Text style={styles.reviewsText}>{restaurant.reviews}</Text>
                    </Text>
                    <Text style={styles.clockIcon}>◷</Text>
                    <Text style={styles.timeText}>{restaurant.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyState}>
            Nenhum restaurante encontrado.
          </Text>
        )}
      </ScrollView>

      <View style={styles.bottomTabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => setActiveTab(tab.id)}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 90,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIcon: {
    width: 22,
    height: 22,
    marginRight: 4,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  locationChevron: {
    fontSize: 20,
    color: '#000',
    marginLeft: 5,
    marginTop: -5,
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
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
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
    fontSize: 15,
    color: '#000',
  },
  bannerCarousel: {
    height: 110,
    borderRadius: 16,
    marginBottom: 8,
  },
  bannerImage: {
    height: 110,
  },
  bannerIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  bannerIndicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D5B8B8',
    marginHorizontal: 4,
  },
  activeBannerIndicator: {
    width: 18,
    backgroundColor: '#8B0000',
  },
  categoriesRow: {
    paddingVertical: 4,
    marginBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 18,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },
  selectedCategoryIcon: {
    opacity: 0.75,
  },
  categoryName: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  selectedCategoryName: {
    color: '#8B0000',
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAllText: {
    fontSize: 14,
    color: '#8B0000',
    fontWeight: '600',
  },
  restaurantsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  restaurantCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  restaurantImage: {
    width: '100%',
    height: 110,
  },
  restaurantInfo: {
    padding: 10,
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8B0000',
  },
  restaurantCategory: {
    fontSize: 12,
    color: '#666',
    marginVertical: 3,
  },
  restaurantDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  starIcon: {
    fontSize: 14,
    color: '#DAA520',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 4,
  },
  reviewsText: {
    fontWeight: 'normal',
    color: '#777',
  },
  clockIcon: {
    fontSize: 17,
    color: '#555',
    marginLeft: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 3,
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
    borderTopColor: '#5a0d0d',
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
