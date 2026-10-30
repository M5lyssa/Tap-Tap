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
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const menuItems = [
  { id: 'addresses', title: 'Meus endereços', icon: 'map-pin', type: 'feather' },
  {
    id: 'coupons',
    title: 'Meus cupons',
    icon: 'ticket-outline',
    type: 'material',
  },
  {
    id: 'favorites',
    title: 'Favoritos',
    icon: 'heart-outline',
    type: 'ion',
  },
  {
    id: 'support',
    title: 'Suporte',
    icon: 'help-circle-outline',
    type: 'ion',
  },
  {
    id: 'history',
    title: 'Histórico',
    icon: 'receipt-outline',
    type: 'ion',
  },
];

const tabs = [
  { id: 'home', label: 'Início', image: require('./assets/home.png') },
  { id: 'explore', label: 'Explorar', image: require('./assets/imagemmapa.png') },
  { id: 'menu', label: 'Cardápio', image: require('./assets/garfos.png') },
  { id: 'profile', label: 'Perfil', image: require('./assets/perfil(2).png') },
];

export default function ProfileScreen({ onTabSelect, onLogout }) {
  const showUnavailableMessage = (title) => {
    Alert.alert(title, 'Esta opção estará disponível em breve.');
  };

  const confirmLogout = () => {
    Alert.alert('Sair da conta', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: onLogout },
    ]);
  };

  const renderMenuIcon = (item) => {
    if (item.type === 'feather') {
      return <Feather name={item.icon} size={20} color="#7A1313" />;
    }

    if (item.type === 'material') {
      return (
        <MaterialCommunityIcons
          name={item.icon}
          size={20}
          color="#7A1313"
        />
      );
    }

    return <Ionicons name={item.icon} size={20} color="#7A1313" />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topHeader}>
          <TouchableOpacity
            onPress={() => showUnavailableMessage('Configurações')}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Configurações"
          >
            <Ionicons name="settings-outline" size={24} color="#7A1313" />
          </TouchableOpacity>
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={80} color="#7A1313" />
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={14} color="#FFF" />
            </View>
          </View>
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>Claudelmilso</Text>
          <Text style={styles.userEmail}>Claudelmilso@gmail.com</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Pedidos</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Avaliações</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Cupons</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              onPress={() => showUnavailableMessage(item.title)}
              activeOpacity={0.8}
              accessibilityRole="button"
            >
              <View style={styles.menuLeft}>
                {renderMenuIcon(item)}
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={confirmLogout}
          activeOpacity={0.7}
          accessibilityRole="button"
        >
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomTabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              tab.id === 'profile' && styles.activeTabButton,
            ]}
            onPress={() => onTabSelect?.(tab.id)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: tab.id === 'profile' }}
          >
            <Image
              source={tab.image}
              style={styles.tabIcon}
              resizeMode="contain"
            />
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
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 90,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: '#7A1313',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#DAA520',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#DDD',
  },
  menuContainer: {
    marginBottom: 20,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    elevation: 2,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7A1313',
    marginLeft: 12,
  },
  menuArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7A1313',
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
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
    borderTopColor: '#5A0D0D',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabIcon: {
    width: 26,
    height: 26,
  },
  activeTabButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
});
