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
  cartItems,
  onBack,
  onContinue,
  onUpdateQuantity,
  onRemoveItem,
}) {
  const deliveryFee = 0;
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Voltar ao restaurante"
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu carrinho</Text>
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
            <Text style={styles.emptyText}>O seu carrinho está vazio.</Text>
            <Text style={styles.emptyHint}>
              Adicione itens do cardápio para continuar.
            </Text>
          </View>
        ) : (
          cartItems.map((item) => (
            <View key={item.id} style={styles.cartItemCard}>
              <Image
                source={item.image}
                style={styles.itemImage}
                resizeMode="cover"
                accessibilityLabel={item.name}
              />

              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>
                  {formatCurrency(item.price)}
                </Text>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => onUpdateQuantity(item.id, -1)}
                    accessibilityRole="button"
                    accessibilityLabel={`Diminuir quantidade de ${item.name}`}
                  >
                    <Text style={styles.qtyButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => onUpdateQuantity(item.id, 1)}
                    accessibilityRole="button"
                    accessibilityLabel={`Aumentar quantidade de ${item.name}`}
                  >
                    <Text style={styles.qtyButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onRemoveItem(item.id)}
                accessibilityRole="button"
                accessibilityLabel={`Remover ${item.name} do carrinho`}
              >
                <Text style={styles.deleteIcon}>×</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.footerContainer}>
          <Text style={styles.summaryTitle}>Resumo de valores</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sub-total</Text>
            <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Entrega</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(deliveryFee)}
            </Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>{formatCurrency(total)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.checkoutFooter}>
            <View>
              <Text style={styles.totalWithDeliveryLabel}>
                Total com entrega
              </Text>
              <Text style={styles.totalWithDeliveryValue}>
                {formatCurrency(total)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              activeOpacity={0.8}
              onPress={onContinue}
              accessibilityRole="button"
            >
              <Text style={styles.continueButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  backIcon: {
    fontSize: 34,
    lineHeight: 38,
    color: '#8B0000',
    marginTop: -4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B0000',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 300,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  emptyHint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
  },
  cartItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    paddingVertical: 14,
    paddingHorizontal: 4,
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DDD',
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
    color: '#000',
  },
  qtyText: {
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteButton: {
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    fontSize: 26,
    color: '#444',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    elevation: 10,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  totalRow: {
    marginBottom: 16,
  },
  summaryTotalLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  summaryTotalValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  checkoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalWithDeliveryLabel: {
    fontSize: 12,
    color: '#666',
  },
  totalWithDeliveryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#7A1313',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
