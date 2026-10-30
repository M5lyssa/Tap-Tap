import React, { useEffect, useState } from 'react';
import {
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
      image: require('./assets/burger3.jpg'),
    },
    {
      id: 'chicken',
      title: 'House Burger',
      description: 'Hambúrguer bovino, queijo, molho especial e batata crocante.',
      price: 'R$ 52,99',
      image: require('./assets/burger1.jpg'),
    },
    {
      id: 'bacon',
      title: 'Combo Brabo da Casa',
      description: 'Hambúrguer com bacon, queijo derretido e molho da casa.',
      price: 'R$ 49,99',
      image: require('./assets/burger4.jpg'),
    },
  ],
  'pizza-house': [
    {
      id: 'margherita',
      title: 'Combo Margherita',
      description: 'Pizza com molho de tomate, queijo e manjericão.',
      price: 'R$ 39,99',
      image: require('./assets/margherita.jpg'),
    },
    {
      id: 'calabresa',
      title: 'Combo Calabresa',
      description: 'Pizza de calabresa com queijo e cebola.',
      price: 'R$ 44,99',
      image: require('./assets/calabresa.jpg'),
    },
    {
      id: 'family',
      title: 'Combo Família',
      description: 'Pizza grande para compartilhar com quem você gosta.',
      price: 'R$ 59,99',
      image: require('./assets/familia.jpg'),
    },
  ],
  'acai-house': [
    {
      id: 'acai-copo-300ml',
      title: 'Açaí Tradicional 300ml',
      description: 'Copo ideal para um lanche rápido',
      price: 'R$ 18,90',
      image: require('./assets/acai3.jpg'),
    },
    {
      id: 'acai-copo-500ml',
      title: 'Açaí Especial 500ml',
      description: 'O tamanho perfeito!',
      price: 'R$ 24,90',
      image: require('./assets/acai2.jpg'),
    },
    {
      id: 'acai-copo-700ml',
      title: 'Açaí Supremo 700ml',
      description: 'Para quem tem muita fome!',
      price: 'R$ 32,00',
      image: require('./assets/acai1.jpg'),
    },
  ],
  'feijoada-house': [
    {
      id: 'feijoada1',
      title: 'Feijoada Individual',
      description: 'Uma porção individual de feijoada servida em tigela rústica, com arroz branco, couve refogada, farofa e fatias de laranja.',
      price: 'R$ 45,00',
      image: require('./assets/feijoada1.jpg'),
    },
    {
      id: 'feijoada2',
      title: 'Feijoada para 2 pessoas',
      description: 'Travessas centrais de partilha com arroz, farofa, couve e laranjas fatiadas.',
      price: 'R$ 80,00',
      image: require('./assets/feijoada2.jpg'),
    },
    {
      id: 'feijoada3',
      title: 'Feijoada para 3 pessoas',
      description: 'Porções generosas para satisfazer três apetites.',
      price: 'R$ 110,00',
      image: require('./assets/feijoada3.jpg'),
    },
  ],
  'sushi-house': [
    {
      id: 'combo1',
      title: 'Combo Box (6 peças)',
      description: 'Combinado com 6 peças: 2 Uramaki Filadélfia...',
      price: 'R$ 25,00',
      image: require('./assets/combo3.jpg'),
    },
    {
      id: 'combo2',
      title: 'Box Magnífico (20 peças)',
      description: 'Esse combinado vai te surpreender!',
      price: 'R$ 55,00',
      image: require('./assets/combo2.jpg'),
    },
    {
      id: 'combo3',
      title: 'Combo Especial',
      description: 'Combinado com 28 Peças: 5 Hossomaki...',
      price: 'R$ 68,90',
      image: require('./assets/combo1.jpg'),
    },
  ],
  'emporio-bebidas': [
    {
      id: 'cerveja',
      title: 'Cerveja',
      description: 'Bebida gelada para acompanhar.',
      price: 'R$ 12,00',
      image: require('./assets/cerveja.jpg'),
    },
    {
      id: 'vinho',
      title: 'Vinhos',
      description: 'Seleção especial de vinhos.',
      price: 'R$ 55,00',
      image: require('./assets/vinho.jpg'),
    },
    {
      id: 'refrigerante',
      title: 'Refrigerante',
      description: 'Lata 350ml.',
      price: 'R$ 6,50',
      image: require('./assets/refrigerante.jpg'),
    },
  ],
};

const reviewsList = [
  { id: '1', author: 'Carlos Silva', date: '12/10/2026', rating: '★★★★★', comment: 'Excelente atendimento e lanche maravilhoso! Recomendo muito.' },
  { id: '2', author: 'Ana Souza', date: '10/10/2026', rating: '★★★★☆', comment: 'Muito bom, só demorou um pouquinho a entrega.' },
  { id: '3', author: 'Marcos Oliveira', date: '05/10/2026', rating: '★★★★★', comment: 'O melhor da região, sempre peço aqui!' },
  { id: '4', author: 'Beatriz Lima', date: '01/10/2026', rating: '★★★★★', comment: 'Sensacional! Sabor impecável.' },
  { id: '5', author: 'João Pedro', date: '28/09/2026', rating: '★★★★☆', comment: 'Gostei bastante, porção bem servida.' },
  { id: '6', author: 'Fernanda Costa', date: '25/09/2026', rating: '★★★★★', comment: 'Perfeito! Chegou super quente e rápido.' },
  { id: '7', author: 'Lucas Martins', date: '20/09/2026', rating: '★★★☆☆', comment: 'Bom, mas achei o preço um pouco alto.' },
  { id: '8', author: 'Juliana Rocha', date: '18/09/2026', rating: '★★★★★', comment: 'Maravilhoso, meu favorito!' },
  { id: '9', author: 'Gabriel Santos', date: '15/09/2026', rating: '★★★★☆', comment: 'Muito saboroso, vale a pena.' },
  { id: '10', author: 'Larissa Ribeiro', date: '10/09/2026', rating: '★★★★★', comment: 'Simplesmente perfeito, nota 10!' },
];

export default function RestaurantDetailScreen({
  restaurant,
  onBack,
  cartCount = 0,
  onOpenCart,
  onAddToCart,
  isFavorite = false,
  onToggleFavorite,
  isDarkMode,
  fontSizeScale = 1.0,
}) {
  const [activeTab, setActiveTab] = useState('cardapio');
  const [showPopup, setShowPopup] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;
  const menuItems = menuByRestaurant[restaurant.id] || menuByRestaurant['burger-house'];
  const highlights = menuItems.slice(0, 2);

  const addItem = (item) => {
    onAddToCart?.(item);
    setShowPopup(true);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
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
            style={[styles.floatingButtonLeft, { backgroundColor: theme.cardBg }]}
            onPress={onBack}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Voltar para restaurantes"
          >
            <Image
              source={require('./assets/left.png')}
              style={[styles.iconImage, isDarkMode && { tintColor: '#FFF' }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.floatingButtonRight, { backgroundColor: theme.cardBg }]}
            onPress={onToggleFavorite}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
            }
            accessibilityState={{ selected: isFavorite }}
          >
            <Image
              source={
                isFavorite
                  ? require('./assets/heart 8.png')
                  : require('./assets/heart 7.png')
              }
              style={styles.iconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.restaurantInfoContainer, { backgroundColor: theme.cardBg }]}>
          <Text style={[styles.restaurantName, { color: theme.text, fontSize: 24 * fontSizeScale }]}>
            {restaurant.name}
          </Text>
          <Text style={[styles.restaurantCategory, { color: theme.subText, fontSize: 14 * fontSizeScale }]}>
            {restaurant.category}
          </Text>

          <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={[styles.ratingText, { color: theme.text, fontSize: 14 * fontSizeScale }]}>
              {restaurant.rating}
            </Text>
            <Text style={[styles.reviewsText, { color: theme.subText, fontSize: 13 * fontSizeScale }]}>
              {restaurant.reviews} avaliações
            </Text>
            <Text style={[styles.deliveryTime, { color: theme.subText, fontSize: 13 * fontSizeScale }]}>
              {restaurant.time}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.cartButton, { backgroundColor: theme.cartBtnBg, borderColor: theme.cartBtnBorder }]}
            onPress={onOpenCart}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`Abrir carrinho com ${cartCount} itens`}
          >
            <Text style={styles.cartButtonIcon}>🛒</Text>
            <Text style={[styles.cartButtonText, { color: theme.cartBtnText, fontSize: 14 * fontSizeScale }]}>
              Ver carrinho ({cartCount})
            </Text>
            <Text style={[styles.cartButtonArrow, { color: theme.cartBtnText }]}>›</Text>
          </TouchableOpacity>

          <View style={[styles.tabsContainer, { borderBottomColor: theme.border }]}>
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'cardapio' && styles.activeTabItem]}
              onPress={() => setActiveTab('cardapio')}
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === 'cardapio' }}
            >
              <Text
                style={[
                  styles.tabText,
                  { fontSize: 15 * fontSizeScale },
                  activeTab === 'cardapio' && styles.activeTabText,
                ]}
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
                  { fontSize: 15 * fontSizeScale },
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
              <Text style={[styles.sectionTitle, { color: theme.text, fontSize: 18 * fontSizeScale }]}>
                Destaques
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.highlightsRow}
              >
                {highlights.map((item, index) => (
                  <View key={item.id} style={[styles.highlightCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
                    {index === 0 && (
                      <View style={styles.tagBadge}>
                        <Text style={[styles.tagText, { fontSize: 10 * fontSizeScale }]}>Mais pedido</Text>
                      </View>
                    )}
                    <Image
                      source={item.image}
                      style={styles.highlightImage}
                      resizeMode="cover"
                    />
                    <View style={styles.highlightContent}>
                      <Text style={[styles.highlightTitle, { color: theme.text, fontSize: 14 * fontSizeScale }]} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.highlightPrice, { fontSize: 14 * fontSizeScale }]}>{item.price}</Text>
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
              <Text style={[styles.sectionTitle, { color: theme.text, fontSize: 18 * fontSizeScale }]}>
                {restaurant.categoryId === 'pizzas' ? 'Pizzas e combos' : 'Combos'}
              </Text>
              {menuItems.map((item) => (
                <View key={item.id} style={[styles.comboCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
                  <Image
                    source={item.image}
                    style={styles.comboImage}
                    resizeMode="cover"
                  />
                  <View style={styles.comboInfo}>
                    <Text style={[styles.comboTitle, { color: theme.text, fontSize: 15 * fontSizeScale }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.comboDescription, { color: theme.subText, fontSize: 12 * fontSizeScale }]} numberOfLines={3}>
                      {item.description}
                    </Text>
                    <View style={styles.comboFooter}>
                      <Text style={[styles.comboPrice, { color: theme.text, fontSize: 15 * fontSizeScale }]}>
                        {item.price}
                      </Text>
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addItem(item)}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        accessibilityLabel={`Adicionar ${item.title} ao pedido`}
                      >
                        <Text style={[styles.addButtonText, { fontSize: 12 * fontSizeScale }]}>Adicionar +</Text>
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
            <Text style={[styles.reviewCount, { color: theme.subText, fontSize: 13 * fontSizeScale }]}>
              {restaurant.reviews} avaliações de clientes
            </Text>
            {reviewsList.map((rev) => (
              <View key={rev.id} style={[styles.reviewCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
                <View style={styles.reviewHeader}>
                  <Text style={[styles.reviewAuthor, { color: theme.text, fontSize: 14 * fontSizeScale }]}>
                    {rev.author}
                  </Text>
                  <Text style={[styles.reviewDate, { color: theme.subText, fontSize: 12 * fontSizeScale }]}>
                    {rev.date}
                  </Text>
                </View>
                <Text style={styles.reviewStars}>{rev.rating}</Text>
                <Text style={[styles.reviewQuote, { color: theme.text, fontSize: 14 * fontSizeScale }]}>
                  {rev.comment}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {showPopup && (
        <View style={styles.popupContainer}>
          <Text style={[styles.popupText, { fontSize: 14 * fontSizeScale }]}>Item adicionado ao carrinho!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const lightTheme = {
  background: '#FAFAFA',
  cardBg: '#FFF',
  border: '#E0E0E0',
  text: '#000',
  subText: '#666',
  cartBtnBg: '#FFF5F5',
  cartBtnBorder: '#E8CACA',
  cartBtnText: '#7A1313',
};

const darkTheme = {
  background: '#121212',
  cardBg: '#1E1E1E',
  border: '#333',
  text: '#FFF',
  subText: '#AAA',
  cartBtnBg: '#2A1A1A',
  cartBtnBorder: '#552222',
  cartBtnText: '#E06B6B',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
    top: 35,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  floatingButtonRight: {
    position: 'absolute',
    top: 35,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  iconImage: {
    width: 22,
    height: 22,
  },
  restaurantInfoContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  restaurantName: {
    fontWeight: 'bold',
  },
  restaurantCategory: {
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
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviewsText: {
    marginLeft: 5,
  },
  deliveryTime: {
    marginLeft: 'auto',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
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
    fontWeight: '600',
  },
  cartButtonArrow: {
    fontSize: 24,
    lineHeight: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
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
    fontWeight: 'bold',
    marginBottom: 12,
  },
  highlightsRow: {
    paddingVertical: 4,
  },
  highlightCard: {
    width: 170,
    borderRadius: 12,
    borderWidth: 1,
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
    fontWeight: 'bold',
    marginBottom: 4,
  },
  highlightPrice: {
    fontWeight: 'bold',
    color: '#B22222',
  },
  comboCard: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
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
    fontWeight: 'bold',
  },
  comboDescription: {
    marginVertical: 4,
  },
  comboFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  comboPrice: {
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#B22222',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
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
    marginTop: 4,
    marginBottom: 16,
  },
  reviewCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewAuthor: {
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
  },
  reviewStars: {
    color: '#DAA520',
    fontSize: 14,
    marginTop: 4,
  },
  reviewQuote: {
    marginTop: 6,
    lineHeight: 20,
  },
  popupContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 6,
    zIndex: 999,
  },
  popupText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});