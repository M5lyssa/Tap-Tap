import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SettingsScreen({
  onBack,
  isDarkMode,
  onToggleTheme,
  fontSizeScale,
  onChangeFontSize,
}) {
  const [notifications, setNotifications] = useState({
    promos: false,
    orders: true,
    personalized: true,
  });

  const [useLocation, setUseLocation] = useState(true);

  const minScale = 1.0;
  const maxScale = 1.25;

  const handleIncreaseFont = () => {
    if (fontSizeScale < maxScale) {
      onChangeFontSize(Math.min(fontSizeScale + 0.05, maxScale));
    }
  };

  const handleDecreaseFont = () => {
    if (fontSizeScale > minScale) {
      onChangeFontSize(Math.max(fontSizeScale - 0.05, minScale));
    }
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }]}
            onPress={onBack}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Image
              source={require('./assets/left.png')}
              style={styles.backIconImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: currentTheme.title, fontSize: 24 * fontSizeScale }]}>Configuração</Text>
        </View>

        <Text style={[styles.sectionHeaderTitle, { color: currentTheme.sectionTitle, fontSize: 16 * fontSizeScale }]}>Aparência</Text>
        <View style={[styles.card, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }]}>
          <View style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Image
                source={require('./assets/map_art-gallery.png')}
                style={styles.optionIcon}
                resizeMode="contain"
              />
              <Text style={[styles.optionText, { color: currentTheme.text, fontSize: 15 * fontSizeScale }]}>Tema</Text>
            </View>
            <TouchableOpacity
              onPress={onToggleTheme}
              activeOpacity={0.8}
              accessibilityRole="switch"
              accessibilityState={{ checked: isDarkMode }}
            >
              <Image
                source={
                  isDarkMode
                    ? require('./assets/Group 31.png')
                    : require('./assets/Group 34.png')
                }
                style={styles.switchIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.divider, { backgroundColor: currentTheme.border }]} />

          <View style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Image
                source={require('./assets/boxicons_text-underline.png')}
                style={styles.optionIcon}
                resizeMode="contain"
              />
              <Text style={[styles.optionText, { color: currentTheme.text, fontSize: 15 * fontSizeScale }]}>Tamanho do texto</Text>
            </View>
            <View style={styles.fontControls}>
              <TouchableOpacity
                style={styles.fontButton}
                onPress={handleIncreaseFont}
                accessibilityRole="button"
                accessibilityLabel="Aumentar tamanho do texto"
              >
                <Image
                  source={require('./assets/Group 29.png')}
                  style={styles.fontControlButtonImg}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={[styles.fontLabelA, { color: currentTheme.text, fontSize: 16 * fontSizeScale }]}>A</Text>
              <TouchableOpacity
                style={styles.fontButton}
                onPress={handleDecreaseFont}
                accessibilityRole="button"
                accessibilityLabel="Diminuir tamanho do texto"
              >
                <Image
                  source={require('./assets/Group 30.png')}
                  style={styles.fontControlButtonImg}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionHeaderTitle, { color: currentTheme.sectionTitle, fontSize: 16 * fontSizeScale }]}>Notificações</Text>
        <View style={[styles.card, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }]}>
          <View style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Image
                source={require('./assets/carbon_notification.png')}
                style={styles.optionIcon}
                resizeMode="contain"
              />
              <Text style={[styles.optionText, { color: currentTheme.text, fontSize: 15 * fontSizeScale }]}>Promoções</Text>
            </View>
            <TouchableOpacity
              onPress={() => setNotifications((prev) => ({ ...prev, promos: !prev.promos }))}
              activeOpacity={0.8}
            >
              <Image
                source={
                  notifications.promos
                    ? require('./assets/Group 31.png')
                    : require('./assets/Group 34.png')
                }
                style={styles.switchIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.divider, { backgroundColor: currentTheme.border }]} />

          <View style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Image
                source={require('./assets/carbon_notification.png')}
                style={styles.optionIcon}
                resizeMode="contain"
              />
              <Text style={[styles.optionText, { color: currentTheme.text, fontSize: 15 * fontSizeScale }]}>Pedidos</Text>
            </View>
            <TouchableOpacity
              onPress={() => setNotifications((prev) => ({ ...prev, orders: !prev.orders }))}
              activeOpacity={0.8}
            >
              <Image
                source={
                  notifications.orders
                    ? require('./assets/Group 31.png')
                    : require('./assets/Group 34.png')
                }
                style={styles.switchIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.divider, { backgroundColor: currentTheme.border }]} />

          <View style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Image
                source={require('./assets/carbon_notification.png')}
                style={styles.optionIcon}
                resizeMode="contain"
              />
              <Text style={[styles.optionText, { color: currentTheme.text, fontSize: 15 * fontSizeScale }]}>Ofertas personalizadas</Text>
            </View>
            <TouchableOpacity
              onPress={() => setNotifications((prev) => ({ ...prev, personalized: !prev.personalized }))}
              activeOpacity={0.8}
            >
              <Image
                source={
                  notifications.personalized
                    ? require('./assets/Group 31.png')
                    : require('./assets/Group 34.png')
                }
                style={styles.switchIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.sectionHeaderTitle, { color: currentTheme.sectionTitle, fontSize: 16 * fontSizeScale }]}>Localização</Text>
        <View style={[styles.card, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }]}>
          <View style={styles.optionColumn}>
            <View style={styles.optionRowFull}>
              <View style={styles.optionLeft}>
                <Image
                  source={require('./assets/fluent_location-ripple-16-regular.png')}
                  style={styles.optionIcon}
                  resizeMode="contain"
                />
                <Text style={[styles.optionText, { color: currentTheme.text, fontSize: 15 * fontSizeScale }]}>Usar minha localização</Text>
              </View>
              <TouchableOpacity
                onPress={() => setUseLocation(!useLocation)}
                activeOpacity={0.8}
              >
                <Image
                  source={
                    useLocation
                      ? require('./assets/Group 31.png')
                      : require('./assets/Group 34.png')
                  }
                  style={styles.switchIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.locationSubText, { color: currentTheme.subText, fontSize: 12 * fontSizeScale }]}>
              Usada para facilitar possíveis entregas
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const lightTheme = {
  background: '#FAFAFA',
  cardBg: '#FFFFFF',
  border: '#7A1313',
  title: '#7A1313',
  sectionTitle: '#7A1313',
  text: '#7A1313',
  subText: '#A56868',
};

const darkTheme = {
  background: '#121212',
  cardBg: '#1E1E1E',
  border: '#A56868',
  title: '#FFFFFF',
  sectionTitle: '#E06B6B',
  text: '#FFFFFF',
  subText: '#AAAAAA',
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  backButton: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  backIconImg: { width: 24, height: 24 },
  headerTitle: { fontWeight: 'bold' },
  sectionHeaderTitle: { fontWeight: 'bold', marginBottom: 8, marginTop: 12 },
  card: { borderRadius: 16, borderWidth: 1.5, paddingHorizontal: 16, paddingVertical: 6, marginBottom: 12, elevation: 2 },
  optionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  optionRowFull: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  optionColumn: { paddingVertical: 10 },
  optionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  optionIcon: { width: 24, height: 24, marginRight: 12 },
  optionText: { fontWeight: '600' },
  locationSubText: { marginTop: 4, marginLeft: 36 },
  divider: { height: 1, width: '100%' },
  switchIcon: { width: 50, height: 28 },
  fontControls: { flexDirection: 'row', alignItems: 'center' },
  fontButton: { width: 28, height: 28, justifyContent: 'center', alignItems: 'center' },
  fontControlButtonImg: { width: 26, height: 26 },
  fontLabelA: { fontWeight: 'bold', marginHorizontal: 8 },
});