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

const menuOptions = [
  { id: 'addresses', label: 'Meus endereços', icon: require('./assets/Vector (10).png') },
  { id: 'coupons', label: 'Meus cupons', icon: require('./assets/Vector (11).png') },
  { id: 'favorites', label: 'Favoritos', icon: require('./assets/Vector (7).png') },
  { id: 'support', label: 'Suporte', icon: require('./assets/Group 21.png') },
  { id: 'history', label: 'Histórico', icon: require('./assets/icon-park-outline_history-query.png') },
];

export default function ProfileScreen({
  onTabSelect,
  onLogout,
  onOpenSettings,
  onAddressesPress,
  onCouponsPress,
  onCouponsSelect,
  onFavoritesPress,
  onFavoritesSelect,
  onSupportPress,
  onHistoryPress,
  isDarkMode,
  fontSizeScale = 1.0,
}) {
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleMenuPress = (id) => {
    switch (id) {
      case 'addresses':
        onAddressesPress?.();
        break;
      case 'coupons':
        (onCouponsSelect || onCouponsPress)?.();
        break;
      case 'favorites':
        (onFavoritesSelect || onFavoritesPress)?.();
        break;
      case 'support':
        onSupportPress?.();
        break;
      case 'history':
        onHistoryPress?.();
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={onOpenSettings} 
          activeOpacity={0.8}
          accessibilityLabel="Configurações"
          accessibilityRole="button"
        >
          <Image
            source={require('./assets/energy-icons_settings-20-bold.png')}
            style={[styles.settingsIcon, isDarkMode && { tintColor: '#FFF' }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('./assets/carbon_user-avatar-filled-alt.png')}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.userName, { color: theme.text, fontSize: 22 * fontSizeScale }]}>
            Claudelmilso
          </Text>
          <Text style={[styles.userEmail, { fontSize: 12 * fontSizeScale }]}>
            Claudelmilso@gmail.com
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: theme.text, fontSize: 20 * fontSizeScale }]}>0</Text>
            <Text style={[styles.statLabel, { fontSize: 12 * fontSizeScale }]}>Pedidos</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: theme.text, fontSize: 20 * fontSizeScale }]}>0</Text>
            <Text style={[styles.statLabel, { fontSize: 12 * fontSizeScale }]}>Avaliações</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: theme.text, fontSize: 20 * fontSizeScale }]}>0</Text>
            <Text style={[styles.statLabel, { fontSize: 12 * fontSizeScale }]}>Cupons</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuOptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuButton,
                { backgroundColor: theme.cardBg, borderColor: theme.border },
              ]}
              activeOpacity={0.7}
              onPress={() => handleMenuPress(item.id)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              <View style={styles.menuLeftContent}>
                <Image
                  source={item.icon}
                  style={[
                    styles.menuIcon,
                    item.id === 'support' && styles.supportIcon,
                    isDarkMode && item.id !== 'support' && { tintColor: '#FFF' },
                  ]}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.menuLabel,
                    { color: theme.menuText, fontSize: 15 * fontSizeScale },
                  ]}
                >
                  {item.label}
                </Text>
              </View>
              <Text style={[styles.chevron, { color: theme.menuText }]}>{'>'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
          activeOpacity={0.6}
          accessibilityRole="button"
          accessibilityLabel="Sair da conta"
        >
          <Text
            style={[
              styles.logoutText,
              { color: isDarkMode ? '#E06B6B' : '#7A1313', fontSize: 16 * fontSizeScale },
            ]}
          >
            Sair da conta
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View
        style={[
          styles.bottomTabBar,
          { backgroundColor: theme.tabBarBg, borderTopColor: theme.tabBarBorder },
        ]}
      >
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
  background: '#FFFFFF',
  cardBg: '#FFFFFF',
  border: '#7A1313',
  text: '#000000',
  menuText: '#7A1313',
  divider: '#D9D9D9',
  tabBarBg: '#7A1313',
  tabBarBorder: '#5a0d0d',
};

const darkTheme = {
  background: '#121212',
  cardBg: '#1E1E1E',
  border: '#A56868',
  text: '#FFFFFF',
  menuText: '#FFFFFF',
  divider: '#333333',
  tabBarBg: '#1E1E1E',
  tabBarBorder: '#333333',
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 85,
    alignItems: 'center',
  },
  settingsButton: {
    alignSelf: 'flex-start',
    padding: 4,
    marginTop: 12,
    marginBottom: 4,
  },
  settingsIcon: { width: 28, height: 28 },
  profileHeader: { alignItems: 'center', marginBottom: 16 },
  avatarContainer: { width: 100, height: 100, marginBottom: 10 },
  avatarImage: { width: '100%', height: '100%' },
  userName: { fontWeight: 'bold', marginBottom: 2 },
  userEmail: { color: '#777777', fontWeight: '500' },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around', // <--- Corrigido aqui (era justify.content)
    width: '100%',
    marginVertical: 12,
  },
  statBox: { alignItems: 'center', flex: 1 },
  statNumber: { fontWeight: 'bold' },
  statLabel: { color: '#777777', fontWeight: '500', marginTop: 2 },
  divider: { width: 1, height: 30 },
  menuContainer: { width: '100%', marginTop: 6 },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    elevation: 2,
  },
  menuLeftContent: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { width: 22, height: 22, marginRight: 14 },
  supportIcon: { width: 26, height: 26, marginLeft: -2, marginRight: 12 },
  menuLabel: { fontWeight: 'bold' },
  chevron: { fontSize: 18, fontWeight: 'bold' },
  logoutButton: { marginTop: 8, paddingVertical: 8, paddingHorizontal: 20 },
  logoutText: { fontWeight: 'bold' },
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
  activeTabButton: { backgroundColor: 'rgba(255, 255, 255, 0.12)' },
  tabIcon: { width: 26, height: 26 },
});