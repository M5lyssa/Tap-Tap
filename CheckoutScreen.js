import React, { useState, useEffect } from 'react';
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

export default function CheckoutScreen({
  cartTotal = 43.8,
  selectedCoupon,
  couponDiscount = 0,
  onBack,
  onChooseCoupon,
  onOrderComplete,
  isDarkMode = false,
  fontSizeScale = 1.0,
}) {
  const [selectedPayment, setSelectedPayment] = useState('pix');
  const [showPopup, setShowPopup] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleFinalizeOrder = () => {
    setShowPopup(true);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        onOrderComplete?.();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showPopup, onOrderComplete]);

  const formatCurrency = (value) =>
    `R$ ${value.toFixed(2).replace('.', ',')}`;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
            onPress={onBack}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Image
              source={require('./assets/left.png')}
              style={[styles.backIconImg, isDarkMode && { tintColor: '#FFF' }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.headerTitleColor, fontSize: 24 * fontSizeScale }]}>
            Finalizar pedidos
          </Text>
        </View>

        {/* Endereço de entrega */}
        <View style={[styles.cardSection, { backgroundColor: theme.primaryCardBg }]}>
          <View style={styles.addressRow}>
            <Image
              source={require('./assets/Group 68.png')}
              style={styles.addressIcon}
              resizeMode="contain"
            />
            <View style={styles.addressInfo}>
              <Text style={[styles.addressTitle, { fontSize: 15 * fontSizeScale }]}>Endereço de entrega</Text>
              <Text style={[styles.addressSub, { fontSize: 12 * fontSizeScale }]}>Rua resenha, 123 - Maceió/AL</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Endereço de entrega',
                  'A alteração de endereço ainda não está disponível.',
                )
              }
              accessibilityRole="button"
            >
              <Text style={[styles.changeText, { fontSize: 14 * fontSizeScale }]}>Alterar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Forma de pagamento */}
        <View style={[styles.paymentCard, { backgroundColor: theme.primaryCardBg }]}>
          <Text style={[styles.sectionCardTitle, { fontSize: 16 * fontSizeScale }]}>Forma de pagamento</Text>

          {/* Pix */}
          <TouchableOpacity
            style={[styles.paymentOption, { backgroundColor: theme.optionBg }]}
            onPress={() => setSelectedPayment('pix')}
            activeOpacity={0.7}
          >
            <View style={styles.paymentLeft}>
              <Image
                source={require('./assets/Group 72.png')}
                style={styles.paymentIcon}
                resizeMode="contain"
              />
              <Text style={[styles.paymentText, { color: theme.optionText, fontSize: 14 * fontSizeScale }]}>Pix</Text>
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
            style={[styles.paymentOption, { backgroundColor: theme.optionBg }]}
            onPress={() => setSelectedPayment('credit')}
            activeOpacity={0.7}
          >
            <View style={styles.paymentLeft}>
              <Image
                source={require('./assets/pepicons-pop_credit-card-circle.png')}
                style={styles.paymentIcon}
                resizeMode="contain"
              />
              <Text style={[styles.paymentText, { color: theme.optionText, fontSize: 14 * fontSizeScale }]}>Cartão de crédito</Text>
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
            style={[styles.paymentOption, { backgroundColor: theme.optionBg }]}
            onPress={() => setSelectedPayment('debit')}
            activeOpacity={0.7}
          >
            <View style={styles.paymentLeft}>
              <Image
                source={require('./assets/pepicons-pop_credit-card-circle.png')}
                style={styles.paymentIcon}
                resizeMode="contain"
              />
              <Text style={[styles.paymentText, { color: theme.optionText, fontSize: 14 * fontSizeScale }]}>Cartão de débito</Text>
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
            style={[styles.paymentOption, styles.lastPaymentOption, { backgroundColor: theme.optionBg }]}
            onPress={() => setSelectedPayment('cash')}
            activeOpacity={0.7}
          >
            <View style={styles.paymentLeft}>
              <Image
                source={require('./assets/f7_money-dollar-circle.png')}
                style={styles.paymentIcon}
                resizeMode="contain"
              />
              <Text style={[styles.paymentText, { color: theme.optionText, fontSize: 14 * fontSizeScale }]}>Dinheiro</Text>
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
        <View style={[styles.couponCard, { backgroundColor: theme.primaryCardBg }]}>
          <Text style={[styles.sectionCardTitle, { fontSize: 16 * fontSizeScale }]}>Cupom de desconto</Text>
          <View style={[styles.couponInfoWrapper, { backgroundColor: theme.optionBg }]}>
            <Text style={[styles.appliedCouponText, { color: theme.optionText, fontSize: 14 * fontSizeScale }]}>
              {selectedCoupon ? selectedCoupon.code : 'Nenhum cupom aplicado'}
            </Text>
            <TouchableOpacity
              style={[styles.chooseCouponButton, { backgroundColor: theme.couponButtonBg }]}
              onPress={onChooseCoupon}
              activeOpacity={0.8}
              accessibilityRole="button"
            >
              <Text style={[styles.chooseCouponText, { color: theme.couponButtonText, fontSize: 13 * fontSizeScale }]}>
                {selectedCoupon ? 'Trocar' : 'Escolher cupom'}
              </Text>
            </TouchableOpacity>
          </View>
          {selectedCoupon && couponDiscount > 0 && (
            <Text style={[styles.couponDiscountText, { fontSize: 13 * fontSizeScale }]}>
              Desconto: -{formatCurrency(couponDiscount)}
            </Text>
          )}
        </View>

        {/* Total e Botão Finalizar */}
        <View style={styles.footerSummary}>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: theme.text, fontSize: 22 * fontSizeScale }]}>Total</Text>
            <Text style={[styles.totalValue, { color: theme.text, fontSize: 26 * fontSizeScale }]}>{formatCurrency(cartTotal)}</Text>
          </View>

          <TouchableOpacity
            style={[styles.finalizeButton, { backgroundColor: theme.primaryBtnBg }]}
            onPress={handleFinalizeOrder}
            activeOpacity={0.85}
          >
            <Text style={[styles.finalizeButtonText, { fontSize: 18 * fontSizeScale }]}>Finalizar pedido</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Pop-up rápido de confirmação */}
      {showPopup && (
        <View style={styles.popupContainer}>
          <Text style={[styles.popupText, { fontSize: 16 * fontSizeScale }]}>Pedido concluído com sucesso!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const lightTheme = {
  background: '#FAFAFA',
  cardBg: '#FFF',
  border: '#E0E0E0',
  headerTitleColor: '#7A1313',
  primaryCardBg: '#7A1313',
  optionBg: '#FFF',
  optionText: '#000',
  couponButtonBg: '#F2DADA',
  couponButtonText: '#7A1313',
  primaryBtnBg: '#7A1313',
  text: '#000',
};

const darkTheme = {
  background: '#121212',
  cardBg: '#1E1E1E',
  border: '#333333',
  headerTitleColor: '#FFFFFF',
  primaryCardBg: '#1E1E1E',
  optionBg: '#2A2A2A',
  optionText: '#FFFFFF',
  couponButtonBg: '#3A2A2A',
  couponButtonText: '#E06B6B',
  primaryBtnBg: '#7A1313',
  text: '#FFFFFF',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12, // Abaixado para não ficar sob a barra de status do celular
    marginBottom: 20,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backIconImg: {
    width: 22,
    height: 22,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  cardSection: {
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
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 2,
  },
  addressSub: {
    color: '#E0E0E0',
  },
  changeText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  paymentCard: {
    borderRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
  },
  sectionCardTitle: {
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 12,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontWeight: '600',
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
  },
  couponInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
  },
  appliedCouponText: {
    flex: 1,
    fontWeight: '600',
  },
  chooseCouponButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  chooseCouponText: {
    fontWeight: 'bold',
  },
  couponDiscountText: {
    marginTop: 8,
    color: '#FFF',
    fontWeight: '600',
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
    fontWeight: 'bold',
  },
  totalValue: {
    fontWeight: 'bold',
  },
  finalizeButton: {
    borderRadius: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  finalizeButtonText: {
    color: '#FFF',
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
});