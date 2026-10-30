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
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={24} color="#7A1313" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus cupons</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.instructions}>
          Você pode usar apenas um cupom por pedido. Ao escolher outro, ele
          substituirá o cupom atual.
        </Text>

        {coupons.map((item) => {
          const isSelected = selectedCoupon?.id === item.id;

          return (
            <View key={item.id} style={styles.couponCard}>
              <View style={styles.couponInfo}>
                <Text style={styles.couponCode}>{item.code}</Text>
                <Text style={styles.couponDescription}>
                  {item.description}
                </Text>
                <Text style={styles.couponValidity}>
                  Válido até {item.validity}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.useButton, isSelected && styles.selectedButton]}
                onPress={() => onSelectCoupon(item)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={
                  isSelected ? `Cupom ${item.code} aplicado` : `Usar cupom ${item.code}`
                }
              >
                <Text
                  style={[
                    styles.useButtonText,
                    isSelected && styles.selectedButtonText,
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7A1313',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  instructions: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  couponCard: {
    backgroundColor: '#7A1313',
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  couponDescription: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  couponValidity: {
    fontSize: 13,
    color: '#E0E0E0',
  },
  useButton: {
    backgroundColor: '#FFF',
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
  selectedButton: {
    backgroundColor: '#F2DADA',
  },
  useButtonText: {
    color: '#7A1313',
    fontSize: 15,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: '#555',
  },
});
