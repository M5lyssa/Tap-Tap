import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const paymentMethods = [
  { id: 'pix', name: 'Pix', icon: 'qrcode', type: 'material' },
  { id: 'credit', name: 'Cartão de crédito', icon: 'card-outline', type: 'ion' },
  { id: 'debit', name: 'Cartão de débito', icon: 'card-outline', type: 'ion' },
  { id: 'cash', name: 'Dinheiro', icon: 'cash-outline', type: 'ion' },
];

const formatCurrency = (value) =>
  `R$ ${value.toFixed(2).replace('.', ',')}`;

export default function CheckoutScreen({ total, onBack }) {
  const [selectedPayment, setSelectedPayment] = useState('pix');
  const [coupon, setCoupon] = useState('');

  const handleFinishOrder = () => {
    Alert.alert(
      'Finalização do pedido',
      'O envio e a confirmação de pedidos ainda não estão conectados.',
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Voltar ao carrinho"
        >
          <Ionicons name="arrow-back" size={24} color="#7A1313" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finalizar pedidos</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.darkCard}>
          <View style={styles.addressHeaderRow}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="home-map-marker"
                size={22}
                color="#7A1313"
              />
            </View>
            <Text style={styles.darkCardTitle}>Endereço de entrega</Text>
          </View>
          <View style={styles.addressDetailsRow}>
            <Text style={styles.addressText}>Rua resenha, 123 - Maceió/AL</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Endereço de entrega',
                  'A alteração de endereço ainda não está disponível.',
                )
              }
              accessibilityRole="button"
            >
              <Text style={styles.changeText}>Alterar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderBox}>
            <Text style={styles.sectionHeaderTitle}>Forma de pagamento</Text>
          </View>
          <View style={styles.paymentList}>
            {paymentMethods.map((method) => {
              const isSelected = selectedPayment === method.id;

              return (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentItem,
                    isSelected && styles.paymentItemSelected,
                  ]}
                  onPress={() => setSelectedPayment(method.id)}
                  activeOpacity={0.8}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                >
                  <View style={styles.paymentItemLeft}>
                    {method.type === 'material' ? (
                      <MaterialCommunityIcons
                        name={method.icon}
                        size={20}
                        color="#7A1313"
                      />
                    ) : (
                      <Ionicons
                        name={method.icon}
                        size={20}
                        color="#7A1313"
                      />
                    )}
                    <Text style={styles.paymentText}>{method.name}</Text>
                  </View>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#7A1313"
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.darkCard}>
          <Text style={styles.darkCardTitle}>Cupom de desconto</Text>
          <View style={styles.couponContainer}>
            <MaterialCommunityIcons
              name="ticket-percent-outline"
              size={20}
              color="#7A1313"
              style={styles.couponIcon}
            />
            <TextInput
              style={styles.couponInput}
              placeholder="Inserir cupom"
              placeholderTextColor="#888"
              value={coupon}
              onChangeText={setCoupon}
              autoCapitalize="characters"
              accessibilityLabel="Inserir cupom de desconto"
            />
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
        </View>

        <TouchableOpacity
          style={styles.finishButton}
          onPress={handleFinishOrder}
          activeOpacity={0.8}
          accessibilityRole="button"
        >
          <Text style={styles.finishButtonText}>Finalizar pedido</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  darkCard: {
    backgroundColor: '#7A1313',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    elevation: 3,
  },
  addressHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  darkCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  addressDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 42,
  },
  addressText: {
    fontSize: 14,
    color: '#FFF',
    flex: 1,
  },
  changeText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  sectionContainer: {
    backgroundColor: '#7A1313',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    elevation: 3,
  },
  sectionHeaderBox: {
    padding: 16,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  paymentList: {
    backgroundColor: '#FFF',
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  paymentItemSelected: {
    backgroundColor: '#FFF5F5',
  },
  paymentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 15,
    color: '#7A1313',
    fontWeight: 'bold',
    marginLeft: 12,
  },
  couponContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    height: 44,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 10,
  },
  couponIcon: {
    marginRight: 8,
  },
  couponInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 4,
  },
  totalLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  finishButton: {
    backgroundColor: '#7A1313',
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  finishButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
