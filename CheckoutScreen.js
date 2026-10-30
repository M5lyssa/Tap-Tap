import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CheckoutScreen({ cartTotal = 43.80, onBack, onOrderComplete }) {
  const [selectedPayment, setSelectedPayment] = useState('pix');
  const [coupon, setCoupon] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleFinalizeOrder = () => {
    setShowPopup(true);
  };

  // Controla o tempo de exibição do pop-up e redireciona após 2.5 segundos
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        onOrderComplete?.(); // Volta para a Home ou limpa o fluxo
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showPopup, onOrderComplete]);

  const formatCurrency = (value) =>
    `R$ ${value.toFixed(2).replace('.', ',')}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
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
          <Text style={styles.headerTitle}>Finalizar pedidos</Text>
        </View>

        {/* Endereço de entrega */}
        <View style={styles.cardSection}>
          <View style={styles.addressRow}>
            <Image
              source={require('./assets/Group 68.png')}
              style={styles.addressIcon}
              resizeMode="contain"
            />
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Endereço de entrega</Text>
              <Text style={styles.addressSub}>Rua resenha, 123 - Maceió/AL</Text>
            </View>
            <TouchableOpacity onPress={() => console.log('Alterar endereço')}>
              <Text style={styles.changeText}>Alterar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Forma de pagamento */}
        <View style={styles.paymentCard}>
          <Text style={styles.sectionCardTitle}>Forma de pagamento</Text>

          {/* Pix */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setSelectedPayment('pix')}
            activeOpacity={0.7}
          >
            <View style={styles.paymentLeft}>
              <Image
                source={require('./assets/Group 72.png')}
                style={styles.paymentIcon}
                resizeMode="contain"
              />
              <Text style={styles.paymentText}>Pix</Text>
            </View>
            <Image
              source={require('./assets/grommet-icons_status-good.png')}
              style={[
                styles.radioIcon,
                selectedPayment === 'pix' && styles.radioSelected,
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Cartão de crédito */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setSelectedPayment('credit')}
            activeOpacity={0.7}
          >
            <View style={styles.paymentLeft}>
              <Image
                source={require('./assets/pepicons-pop_credit-card-circle.png')}
                style={styles.paymentIcon}
                resizeMode="contain"
              />
              <Text style={styles.paymentText}>Cartão de crédito</Text>
            </View>
            <Image
              source={require('./assets/grommet-icons_status-good.png')}
              style={[
                styles.radioIcon,
                selectedPayment === 'credit' && styles.radioSelected,
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Cartão de débito */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setSelectedPayment('debit')}
            activeOpacity={0.7}
          >
            <View style={styles.paymentLeft}>
              <Image
                source={require('./assets/pepicons-pop_credit-card-circle.png')}
                style={styles.paymentIcon}
                resizeMode="contain"
              />
              <Text style={styles.paymentText}>Cartão de débito</Text>
            </View>
            <Image
              source={require('./assets/grommet-icons_status-good.png')}
              style={[
                styles.radioIcon,
                selectedPayment === 'debit' && styles.radioSelected,
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Dinheiro */}
          <TouchableOpacity
            style={[styles.paymentOption, styles.lastPaymentOption]}
            onPress={() => setSelectedPayment('cash')}
            activeOpacity={0.7}
          >
            <View style={styles.paymentLeft}>
              <Image
                source={require('./assets/f7_money-dollar-circle.png')}
                style={styles.paymentIcon}
                resizeMode="contain"
              />
              <Text style={styles.paymentText}>Dinheiro</Text>
            </View>
            <Image
              source={require('./assets/grommet-icons_status-good.png')}
              style={[
                styles.radioIcon,
                selectedPayment === 'cash' && styles.radioSelected,
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Cupom de desconto */}
        <View style={styles.couponCard}>
          <Text style={styles.sectionCardTitle}>Cupom de desconto</Text>
          <View style={styles.couponInputWrapper}>
            <Image
              source={require('./assets/Group.png')}
              style={styles.couponIcon}
              resizeMode="contain"
            />
            <TextInput
              style={styles.couponInput}
              placeholder="Inserir cupom"
              placeholderTextColor="#888"
              value={coupon}
              onChangeText={setCoupon}
            />
          </View>
        </View>

        {/* Total e Botão Finalizar */}
        <View style={styles.footerSummary}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(cartTotal)}</Text>
          </View>

          <TouchableOpacity
            style={styles.finalizeButton}
            onPress={handleFinalizeOrder}
            activeOpacity={0.85}
          >
            <Text style={styles.finalizeButtonText}>Finalizar pedido</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Pop-up rápido de confirmação */}
      {showPopup && (
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>Pedido concluído com sucesso!</Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backIconImg: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7A1313',
  },
  cardSection: {
    backgroundColor: '#7A1313',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 2,
  },
  addressSub: {
    fontSize: 12,
    color: '#E0E0E0',
  },
  changeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  paymentCard: {
    backgroundColor: '#7A1313',
    borderRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
  },
  sectionCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 12,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  lastPaymentOption: {
    marginBottom: 16,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  radioIcon: {
    width: 20,
    height: 20,
    tintColor: '#CCC',
  },
  radioSelected: {
    tintColor: '#7A1313',
  },
  couponCard: {
    backgroundColor: '#7A1313',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
  },
  couponInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
  },
  couponIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  couponInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  footerSummary: {
    marginTop: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  totalLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  finalizeButton: {
    backgroundColor: '#7A1313',
    borderRadius: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  finalizeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupContainer: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 10,
    zIndex: 999,
  },
  popupText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});