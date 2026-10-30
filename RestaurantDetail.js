import React, { useState, useEffect } from 'react';
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
  { id: '11', author: 'Rafael Almeida', date: '08/09/2026', rating: '★★★★★', comment: 'Atendimento nota 10 e comida deliciosa.' },
  { id: '12', author: 'Camila Fernandes', date: '02/09/2026', rating: '★★★★☆', comment: 'Muito bom, recomendo a todos.' },
  { id: '13', author: 'Bruno Carvalho', date: '30/08/2026', rating: '★★★★★', comment: 'Melhor hambúrguer que já comi.' },
  { id: '14', author: 'Mariana Dias', date: '27/08/2026', rating: '★★★★★', comment: 'Tudo muito fresco e saboroso.' },
  { id: '15', author: 'Thiago Mendes', date: '22/08/2026', rating: '★★★★☆', comment: 'Chegou no horário combinado, recomendo.' },
  { id: '16', author: 'Patrícia Ramos', date: '19/08/2026', rating: '★★★★★', comment: 'Adorei a experiência, voltarei a pedir.' },
  { id: '17', author: 'Rodrigo Azevedo', date: '14/08/2026', rating: '★★★☆☆', comment: 'Estava bom, mas faltou um pouco mais de capricho.' },
  { id: '18', author: 'Vanessa Nogueira', date: '10/08/2026', rating: '★★★★★', comment: 'Delicioso! Aprovado pela família toda.' },
  { id: '19', author: 'Diego Farias', date: '05/08/2026', rating: '★★★★★', comment: 'Excelente custo-benefício.' },
  { id: '20', author: 'Renata Freitas', date: '01/08/2026', rating: '★★★★☆', comment: 'Muito gostoso, recomendo.' },
  { id: '21', author: 'Eduardo Moreira', date: '28/07/2026', rating: '★★★★★', comment: 'Perfeito em todos os sentidos.' },
  { id: '22', author: 'Tatiane Cardoso', date: '24/07/2026', rating: '★★★★★', comment: 'Nota 10 para o sabor e rapidez.' },
  { id: '23', author: 'Felipe Castro', date: '20/07/2026', rating: '★★★★☆', comment: 'Muito bom, recomendo com certeza.' },
  { id: '24', author: 'Jéssica Correia', date: '15/07/2026', rating: '★★★★★', comment: 'Maravilhoso! Sabor inigualável.' },
  { id: '25', author: 'Alexandre Pinto', date: '10/07/2026', rating: '★★★★★', comment: 'Excelente qualidade.' },
  { id: '26', author: 'Priscila Cavalcanti', date: '05/07/2026', rating: '★★★★☆', comment: 'Muito bom, entrega rápida.' },
  { id: '27', author: 'Gustavo Lima', date: '01/07/2026', rating: '★★★★★', comment: 'Sensacional, com certeza pedirei mais vezes.' },
  { id: '28', author: 'Amanda Souza', date: '28/06/2026', rating: '★★★★★', comment: 'Simplesmente maravilhoso.' },
  { id: '29', author: 'Leonardo Silveira', date: '24/06/2026', rating: '★★★★☆', comment: 'Ótimo lanche, recomendo.' },
  { id: '30', author: 'Letícia Moraes', date: '20/06/2026', rating: '★★★★★', comment: 'Perfeito! Adorei cada detalhe.' },
];

export default function RestaurantDetailScreen({
  restaurant,
  onBack,
  cartCount = 0,
  onOpenCart,
  onAddToCart,
}) {
  const [activeTab, setActiveTab] = useState('cardapio');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
            <Image
              source={require('./assets/left.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
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
            {reviewsList.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewAuthor}>{rev.author}</Text>
                  <Text style={styles.reviewDate}>{rev.date}</Text>
                </View>
                <Text style={styles.reviewStars}>{rev.rating}</Text>
                <Text style={styles.reviewQuote}>{rev.comment}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {showPopup && (
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>Item adicionado ao carrinho!</Text>
        </View>
      )}
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
    top: 35,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
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
    backgroundColor: '#FFF',
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
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewAuthor: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  reviewDate: {
    color: '#888',
    fontSize: 12,
  },
  reviewStars: {
    color: '#DAA520',
    fontSize: 14,
    marginTop: 4,
  },
  reviewQuote: {
    fontSize: 14,
    color: '#333',
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
    fontSize: 14,
    fontWeight: 'bold',
  },
});