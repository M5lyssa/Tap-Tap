import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const menuByRestaurant = {
  'burger-house': [
    {
      id: 'classic',
      title: 'Combo Supremo Clássico',
      description: 'Hambúrguer bovino, queijo, molho especial e batata crocante.',
      price: 'R$ 46,99',
      image: require('./assets/combão.png'),
    },
    {
      id: 'chicken',
      title: 'Mega Chicken & Shake',
      description: 'Frango crocante com queijo, acompanhado de bebida.',
      price: 'R$ 52,99',
      image: require('./assets/combão.png'),
    },
    {
      id: 'bacon',
      title: 'Combo Brabo da Casa',
      description: 'Hambúrguer com bacon, queijo derretido e molho da casa.',
      price: 'R$ 49,99',
      image: require('./assets/combão.png'),
    },
  ],
  'pizza-house': [
    {
      id: 'margherita',
      title: 'Combo Margherita',
      description: 'Pizza com molho de tomate, queijo e manjericão.',
      price: 'R$ 39,99',
      image: require('./assets/pizza.png'),
    },
    {
      id: 'calabresa',
      title: 'Combo Calabresa',
      description: 'Pizza de calabresa com queijo e cebola.',
      price: 'R$ 44,99',
      image: require('./assets/pizza.png'),
    },
    {
      id: 'family',
      title: 'Combo Família',
      description: 'Pizza grande para compartilhar com quem você gosta.',
      price: 'R$ 59,99',
      image: require('./assets/pizza.png'),
    },
  ],
};

export default function RestaurantDetailScreen({
  restaurant,
  onBack,
  cartCount = 0,
  onOpenCart,
  onAddToCart,
}) {
  const [activeTab, setActiveTab] = useState('cardapio');
  const [isFavorite, setIsFavorite] = useState(false);
  const menuItems = menuByRestaurant[restaurant.id] || menuByRestaurant['burger-house'];
  const highlights = menuItems.slice(0, 2);

  const addItem = (item) => {
    onAddToCart?.(item);
    Alert.alert('Item adicionado', `${item.title} foi adicionado ao carrinho.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerImageContainer}>
          <Image
            source={restaurant.image}
            style={styles.coverImage}
            resizeMode="cover"
            accessibilityLabel={`Imagem de ${restaurant.name}`}
          />
          <TouchableOpacity
            style={styles.floatingButtonLeft}
            onPress={onBack}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Voltar para restaurantes"
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.floatingButtonRight}
            onPress={() => setIsFavorite((favorite) => !favorite)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
            }
            accessibilityState={{ selected: isFavorite }}
          >
            <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteActive]}>
              {isFavorite ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.restaurantInfoContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantCategory}>{restaurant.category}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
            <Text style={styles.reviewsText}>
              {restaurant.reviews} avaliações
            </Text>
            <Text style={styles.deliveryTime}>{restaurant.time}</Text>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={onOpenCart}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`Abrir carrinho com ${cartCount} itens`}
          >
            <Text style={styles.cartButtonIcon}>🛒</Text>
            <Text style={styles.cartButtonText}>
              Ver carrinho ({cartCount})
            </Text>
            <Text style={styles.cartButtonArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'cardapio' && styles.activeTabItem]}
              onPress={() => setActiveTab('cardapio')}
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === 'cardapio' }}
            >
              <Text
                style={[styles.tabText, activeTab === 'cardapio' && styles.activeTabText]}
              >
                Cardápio
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'avaliacoes' && styles.activeTabItem]}
              onPress={() => setActiveTab('avaliacoes')}
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === 'avaliacoes' }}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'avaliacoes' && styles.activeTabText,
                ]}
              >
                Avaliações
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === 'cardapio' ? (
          <>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Destaques</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.highlightsRow}
              >
                {highlights.map((item, index) => (
                  <View key={item.id} style={styles.highlightCard}>
                    {index === 0 && (
                      <View style={styles.tagBadge}>
                        <Text style={styles.tagText}>Mais pedido</Text>
                      </View>
                    )}
                    <Image
                      source={item.image}
                      style={styles.highlightImage}
                      resizeMode="cover"
                    />
                    <View style={styles.highlightContent}>
                      <Text style={styles.highlightTitle} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={styles.highlightPrice}>{item.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.highlightAddButton}
                      onPress={() => addItem(item)}
                      activeOpacity={0.8}
                      accessibilityRole="button"
                      accessibilityLabel={`Adicionar ${item.title} ao carrinho`}
                    >
                      <Image
                        source={require('./assets/add-item.png')}
                        style={styles.highlightAddButtonImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                {restaurant.categoryId === 'pizzas' ? 'Pizzas e combos' : 'Combos'}
              </Text>
              {menuItems.map((item) => (
                <View key={item.id} style={styles.comboCard}>
                  <Image
                    source={item.image}
                    style={styles.comboImage}
                    resizeMode="cover"
                  />
                  <View style={styles.comboInfo}>
                    <Text style={styles.comboTitle}>{item.title}</Text>
                    <Text style={styles.comboDescription} numberOfLines={3}>
                      {item.description}
                    </Text>
                    <View style={styles.comboFooter}>
                      <Text style={styles.comboPrice}>{item.price}</Text>
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addItem(item)}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        accessibilityLabel={`Adicionar ${item.title} ao pedido`}
                      >
                        <Text style={styles.addButtonText}>Adicionar +</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewScore}>{restaurant.rating} ★</Text>
            <Text style={styles.reviewCount}>
              {restaurant.reviews} avaliações de clientes
            </Text>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewStars}>★★★★★</Text>
              <Text style={styles.reviewQuote}>
                Ótima opção! Pedido saboroso e entrega dentro do prazo.
              </Text>
              <Text style={styles.reviewAuthor}>Avaliação de cliente</Text>
            </View>
          </View>
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
  scrollContainer: {
    paddingBottom: 40,
  },
  headerImageContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  floatingButtonLeft: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 34,
    height: 34,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  floatingButtonRight: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  backIcon: {
    color: '#222',
    fontSize: 36,
    lineHeight: 40,
    marginTop: -4,
  },
  favoriteIcon: {
    color: '#555',
    fontSize: 26,
  },
  favoriteActive: {
    color: '#FF3B30',
  },
  restaurantInfoContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  restaurantCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  starIcon: {
    color: '#DAA520',
    fontSize: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },
  deliveryTime: {
    fontSize: 13,
    color: '#555',
    marginLeft: 'auto',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#E8CACA',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 12,
  },
  cartButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  cartButtonText: {
    flex: 1,
    color: '#7A1313',
    fontSize: 14,
    fontWeight: '600',
  },
  cartButtonArrow: {
    color: '#7A1313',
    fontSize: 24,
    lineHeight: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#B22222',
  },
  tabText: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#B22222',
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  highlightsRow: {
    paddingVertical: 4,
  },
  highlightCard: {
    width: 170,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 14,
    overflow: 'hidden',
    elevation: 2,
  },
  highlightAddButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 40,
    height: 40,
  },
  highlightAddButtonImage: {
    width: '100%',
    height: '100%',
  },
  tagBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 2,
  },
  tagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  highlightImage: {
    width: '100%',
    height: 110,
  },
  highlightContent: {
    padding: 10,
    paddingRight: 52,
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  highlightPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B22222',
  },
  comboCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 14,
    overflow: 'hidden',
    padding: 10,
    elevation: 1,
  },
  comboImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  comboInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  comboTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  comboDescription: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  comboFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  comboPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#B22222',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewsContainer: {
    padding: 20,
  },
  reviewScore: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B22222',
  },
  reviewCount: {
    color: '#666',
    marginTop: 4,
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
  },
  reviewStars: {
    color: '#DAA520',
    fontSize: 16,
  },
  reviewQuote: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    lineHeight: 20,
  },
  reviewAuthor: {
    color: '#777',
    fontSize: 12,
    marginTop: 8,
  },
});
