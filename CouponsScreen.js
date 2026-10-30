import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { coupons } from './couponUtils';

export default function CouponsScreen({
  selectedCoupon,
  onBack,
  onSelectCoupon,
  isDarkMode = false,
  fontSizeScale = 1.0,
}) {
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.backButtonBg }]}
          onPress={onBack}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={24} color={theme.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primaryText, fontSize: 22 * fontSizeScale }]}>
          Meus cupons
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.instructions, { color: theme.subText, fontSize: 14 * fontSizeScale }]}>
          Você pode usar apenas um cupom por pedido. Ao escolher outro, ele
          substituirá o cupom atual.
        </Text>

        {coupons.map((item) => {
          const isSelected = selectedCoupon?.id === item.id;

          return (
            <View key={item.id} style={[styles.couponCard, { backgroundColor: theme.cardBg }]}>
              <View style={styles.couponInfo}>
                <Text style={[styles.couponCode, { fontSize: 22 * fontSizeScale }]}>{item.code}</Text>
                <Text style={[styles.couponDescription, { fontSize: 15 * fontSizeScale }]}>
                  {item.description}
                </Text>
                <Text style={[styles.couponValidity, { color: theme.validityText, fontSize: 13 * fontSizeScale }]}>
                  Válido até {item.validity}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.useButton,
                  { backgroundColor: theme.useBtnBg },
                  isSelected && { backgroundColor: theme.selectedBtnBg },
                ]}
                onPress={() => onSelectCoupon?.(item)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={
                  isSelected ? `Cupom ${item.code} aplicado` : `Usar cupom ${item.code}`
                }
              >
                <Text
                  style={[
                    styles.useButtonText,
                    { color: theme.useBtnText, fontSize: 15 * fontSizeScale },
                    isSelected && { color: theme.selectedBtnText },
                  ]}
                >
                  {isSelected ? 'Aplicado' : 'Usar'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const lightTheme = {
  background: '#FAFAFA',
  headerBg: '#FAFAFA',
  cardBg: '#7A1313',
  primaryText: '#7A1313',
  subText: '#666666',
  validityText: '#E0E0E0',
  backButtonBg: '#F0F0F0',
  useBtnBg: '#FFF',
  useBtnText: '#7A1313',
  selectedBtnBg: '#F2DADA',
  selectedBtnText: '#555',
};

const darkTheme = {
  background: '#121212',
  headerBg: '#121212',
  cardBg: '#1E1E1E',
  primaryText: '#E06B6B',
  subText: '#AAAAAA',
  validityText: '#AAAAAA',
  backButtonBg: '#2A2A2A',
  useBtnBg: '#7A1313',
  useBtnText: '#FFF',
  selectedBtnBg: '#3A2A2A',
  selectedBtnText: '#E06B6B',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 35, 
    paddingBottom: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  instructions: {
    lineHeight: 20,
    marginBottom: 16,
  },
  couponCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  couponInfo: {
    flex: 1,
    marginRight: 12,
  },
  couponCode: {
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  couponDescription: {
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  couponValidity: {},
  useButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  useButtonText: {
    fontWeight: 'bold',
  },
});