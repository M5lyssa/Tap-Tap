import React from 'react';
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

const menuOptions = [
  {
    id: 'addresses',
    label: 'Meus endereços',
    icon: require('./assets/Vector (10).png'),
  },
  {
    id: 'coupons',
    label: 'Meus cupons',
    icon: require('./assets/Vector (11).png'),
  },
  {
    id: 'favorites',
    label: 'Favoritos',
    icon: require('./assets/Vector (7).png'),
  },
  {
    id: 'support',
    label: 'Suporte',
    icon: require('./assets/Group 21.png'),
  },
  {
    id: 'history',
    label: 'Histórico',
    icon: require('./assets/icon-park-outline_history-query.png'),
  },
];

export default function ProfileScreen({ onTabSelect, onLogout }) {
  const showUnavailableMessage = (title) => {
    Alert.alert(title, 'Esta opção estará disponível em breve.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Ícone de Configurações bem abaixo da barra do celular */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => showUnavailableMessage('Configurações')}
          accessibilityLabel="Configurações"
        >
          <Image
            source={require('./assets/energy-icons_settings-20-bold.png')}
            style={styles.settingsIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Avatar e Perfil (Com foto um pouco menor) */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('./assets/carbon_user-avatar-filled-alt.png')}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.userName}>Claudelmilso</Text>
          <Text style={styles.userEmail}>Claudelmilso@gmail.com</Text>
        </View>

        {/* Estatísticas (Pedidos, Avaliações, Cupons) */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Pedidos</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Avaliações</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Cupons</Text>
          </View>
        </View>

        {/* Opções de Menu */}
        <View style={styles.menuContainer}>
          {menuOptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuButton}
              activeOpacity={0.7}
              onPress={() => showUnavailableMessage(item.label)}
            >
              <View style={styles.menuLeftContent}>
                <Image
                  source={item.icon}
                  style={[
                    styles.menuIcon,
                    item.id === 'support' && styles.supportIcon,
                  ]}
                  resizeMode="contain"
                />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Text style={styles.chevron}>{'>'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botão Sair da Conta (reposicionado mais acima) */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
          activeOpacity={0.6}
        >
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Barra Inferior de Navegação */}
      <View style={styles.bottomTabBar}>
        {[
          { id: 'home', label: 'Início', image: require('./assets/home.png') },
          { id: 'explore', label: 'Explorar', image: require('./assets/imagemmapa.png') },
          { id: 'menu', label: 'Cardápio', image: require('./assets/garfos.png') },
          { id: 'profile', label: 'Perfil', image: require('./assets/perfil(2).png') },
        ].map((tab) => {
          const isActive = tab.id === 'profile';

          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => onTabSelect?.(tab.id)}
              activeOpacity={0.8}
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
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 85,
    alignItems: 'center',
  },
  settingsButton: {
    alignSelf: 'flex-start',
    padding: 4,
    marginTop: 22, // Bem mais abaixo para afastar da barra do celular
    marginBottom: 4,
  },
  settingsIcon: {
    width: 28,
    height: 28,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 100, // Foto reduzida para otimizar o espaço
    height: 100,
    marginBottom: 10,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    color: '#777777',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 12,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  statLabel: {
    fontSize: 12,
    color: '#777777',
    fontWeight: '500',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#D9D9D9',
  },
  menuContainer: {
    width: '100%',
    marginTop: 6,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#7A1313',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  menuLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginRight: 14,
  },
  supportIcon: {
    width: 26,  // Ícone de suporte um pouco maior
    height: 26,
    marginLeft: -2,
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7A1313',
  },
  chevron: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7A1313',
  },
  logoutButton: {
    marginTop: 8, // Mais próximo do menu e longe da barra inferior
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7A1313',
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