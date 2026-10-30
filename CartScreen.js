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

const formatCurrency = (value) =>
  `R$ ${value.toFixed(2).replace('.', ',')}`;

export default function CartScreen({
  cartItems = [],
  onBack,
  onContinue,
  onUpdateQuantity,
  onRemoveItem,
  selectedCoupon,
  couponDiscount = 0,
  deliveryFee = 0,
  onChooseCoupon,
  onRemoveCoupon,
  isDarkMode = false,
  fontSizeScale = 1.0,
}) {
  const theme = isDarkMode ? darkTheme : lightTheme;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const total = Math.max(0, subtotal + deliveryFee - couponDiscount);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.border }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.backButtonBg }]}
          onPress={onBack}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Voltar ao restaurante"
        >
          <Text style={[styles.backIcon, { color: theme.primaryText }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primaryText, fontSize: 20 * fontSizeScale }]}>
          Meu carrinho
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          cartItems.length === 0 && styles.emptyScrollContainer,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={[styles.emptyText, { color: theme.text, fontSize: 16 * fontSizeScale }]}>
              O seu carrinho está vazio.
            </Text>
            <Text style={[styles.emptyHint, { color: theme.subText, fontSize: 14 * fontSizeScale }]}>
              Adicione itens do cardápio para continuar.
            </Text>
            <TouchableOpacity
              style={[styles.emptyCouponButton, { backgroundColor: theme.primaryBtnBg }]}
              onPress={onChooseCoupon}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Abrir meus cupons"
            >
              <Text style={[styles.emptyCouponButtonText, { fontSize: 14 * fontSizeScale }]}>
                Ver meus cupons
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          cartItems.map((item) => (
            <View key={item.id} style={[styles.cartItemCard, { backgroundColor: theme.cardBg, borderBottomColor: theme.cardBorder }]}>
              <Image
                source={item.image}
                style={styles.itemImage}
                resizeMode="cover"
                accessibilityLabel={item.name}
              />

              <View style={styles.itemDetails}>
                <Text style={[styles.itemName, { color: theme.text, fontSize: 15 * fontSizeScale }]}>
                  {item.name}
                </Text>
                <Text style={[styles.itemPrice, { color: theme.subText, fontSize: 14 * fontSizeScale }]}>
                  {formatCurrency(item.price)}
                </Text>

                <View style={[styles.quantityContainer, { backgroundColor: theme.qtyBg, borderColor: theme.qtyBorder }]}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => onUpdateQuantity?.(item.id, -1)}
                    accessibilityRole="button"
                    accessibilityLabel={`Diminuir quantidade de ${item.name}`}
                  >
                    <Text style={[styles.qtyButtonText, { color: theme.text }]}>−</Text>
                  </TouchableOpacity>
                  <Text style={[styles.qtyText, { color: theme.text, fontSize: 14 * fontSizeScale }]}>
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => onUpdateQuantity?.(item.id, 1)}
                    accessibilityRole="button"
                    accessibilityLabel={`Aumentar quantidade de ${item.name}`}
                  >
                    <Text style={[styles.qtyButtonText, { color: theme.text }]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onRemoveItem?.(item.id)}
                accessibilityRole="button"
                accessibilityLabel={`Remover ${item.name} do carrinho`}
              >
                <Text style={[styles.deleteIcon, { color: theme.subText }]}>×</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={[styles.footerContainer, { backgroundColor: theme.cardBg, borderTopColor: theme.border }]}>
          <Text style={[styles.summaryTitle, { color: theme.text, fontSize: 16 * fontSizeScale }]}>
            Resumo de valores
          </Text>

          <View style={[styles.couponRow, { backgroundColor: theme.couponBg }]}>
            <View style={styles.couponInfo}>
              <Text style={[styles.summaryLabel, { color: theme.subText, fontSize: 13 * fontSizeScale }]}>
                Cupom
              </Text>
              <Text style={[styles.couponCode, { color: theme.primaryText, fontSize: 13 * fontSizeScale }]}>
                {selectedCoupon ? selectedCoupon.code : 'Nenhum aplicado'}
              </Text>
            </View>
            {selectedCoupon && (
              <TouchableOpacity
                onPress={onRemoveCoupon}
                accessibilityRole="button"
                accessibilityLabel="Remover cupom"
              >
                <Text style={[styles.removeCouponText, { color: theme.subText, fontSize: 12 * fontSizeScale }]}>
                  Remover
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.chooseCouponButton, { backgroundColor: theme.primaryBtnBg }]}
              onPress={onChooseCoupon}
              accessibilityRole="button"
            >
              <Text style={[styles.chooseCouponText, { fontSize: 12 * fontSizeScale }]}>
                {selectedCoupon ? 'Trocar' : 'Usar cupom'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.subText, fontSize: 14 * fontSizeScale }]}>
              Sub-total
            </Text>
            <Text style={[styles.summaryValue, { color: theme.text, fontSize: 14 * fontSizeScale }]}>
              {formatCurrency(subtotal)}
            </Text>
          </View>

          {selectedCoupon && couponDiscount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.subText, fontSize: 14 * fontSizeScale }]}>
                Desconto ({selectedCoupon.code})
              </Text>
              <Text style={[styles.discountValue, { fontSize: 14 * fontSizeScale }]}>
                -{formatCurrency(couponDiscount)}
              </Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.subText, fontSize: 14 * fontSizeScale }]}>
              Entrega
            </Text>
            <Text style={[styles.summaryValue, { color: theme.text, fontSize: 14 * fontSizeScale }]}>
              {selectedCoupon?.type === 'free-delivery'
                ? 'Grátis'
                : formatCurrency(deliveryFee)}
            </Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={[styles.summaryTotalLabel, { color: theme.text, fontSize: 15 * fontSizeScale }]}>
              Total
            </Text>
            <Text style={[styles.summaryTotalValue, { color: theme.text, fontSize: 15 * fontSizeScale }]}>
              {formatCurrency(total)}
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.checkoutFooter}>
            <View>
              <Text style={[styles.totalWithDeliveryLabel, { color: theme.subText, fontSize: 12 * fontSizeScale }]}>
                Total com entrega
              </Text>
              <Text style={[styles.totalWithDeliveryValue, { color: theme.text, fontSize: 18 * fontSizeScale }]}>
                {formatCurrency(total)}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.continueButton, { backgroundColor: theme.primaryBtnBg }]}
              activeOpacity={0.8}
              onPress={onContinue}
              accessibilityRole="button"
            >
              <Text style={[styles.continueButtonText, { fontSize: 16 * fontSizeScale }]}>
                Continuar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const lightTheme = {
  background: '#FAFAFA',
  headerBg: '#FAFAFA',
  cardBg: '#FFF',
  cardBorder: '#EBEBEB',
  border: '#E0E0E0',
  text: '#000',
  subText: '#555',
  primaryText: '#8B0000',
  primaryBtnBg: '#7A1313',
  backButtonBg: '#F0F0F0',
  qtyBg: '#F2F2F2',
  qtyBorder: '#DDD',
  couponBg: '#FFF5F5',
};

const darkTheme = {
  background: '#121212',
  headerBg: '#1E1E1E',
  cardBg: '#1E1E1E',
  cardBorder: '#333333',
  border: '#333333',
  text: '#FFF',
  subText: '#AAA',
  primaryText: '#E06B6B',
  primaryBtnBg: '#7A1313',
  backButtonBg: '#2A2A2A',
  qtyBg: '#2A2A2A',
  qtyBorder: '#444',
  couponBg: '#2A1A1A',
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
    borderBottomWidth: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backIcon: {
    fontSize: 34,
    lineHeight: 38,
    marginTop: -4,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 360,
  },
  emptyScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontWeight: '600',
  },
  emptyHint: {
    textAlign: 'center',
    marginTop: 6,
  },
  emptyCouponButton: {
    marginTop: 18,
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  emptyCouponButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  cartItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderBottomWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemName: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemPrice: {
    fontWeight: '600',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  qtyButton: {
    minWidth: 32,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 18,
  },
  qtyText: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  deleteButton: {
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    fontSize: 26,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    elevation: 10,
  },
  summaryTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {},
  summaryValue: {
    fontWeight: '500',
  },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  couponInfo: {
    flex: 1,
  },
  couponCode: {
    fontWeight: 'bold',
    marginTop: 2,
  },
  removeCouponText: {
    marginRight: 10,
    textDecorationLine: 'underline',
  },
  chooseCouponButton: {
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 6,
  },
  chooseCouponText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  discountValue: {
    color: '#18733B',
    fontWeight: '600',
  },
  totalRow: {
    marginBottom: 16,
  },
  summaryTotalLabel: {
    fontWeight: 'bold',
  },
  summaryTotalValue: {
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    marginBottom: 12,
  },
  checkoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalWithDeliveryLabel: {},
  totalWithDeliveryValue: {
    fontWeight: 'bold',
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});