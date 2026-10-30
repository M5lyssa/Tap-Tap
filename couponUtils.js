export const coupons = [
  {
    id: 'welcome',
    code: 'BEM VINDO',
    description: '10% DE DESCONTO',
    validity: '30/11/2026',
    type: 'percentage',
    rate: 0.1,
  },
  {
    id: 'pizza10',
    code: 'PIZZA10',
    description: '10% EM PIZZAS',
    validity: '20/11/2026',
    type: 'pizza-percentage',
    rate: 0.1,
  },
  {
    id: 'frete10',
    code: 'FRETE10',
    description: 'FRETE GRÁTIS',
    validity: '30/11/2026',
    type: 'free-delivery',
  },
];

export function calculateCouponDiscount(coupon, cartItems, deliveryFee) {
  if (!coupon) {
    return 0;
  }

  if (coupon.type === 'free-delivery') {
    return deliveryFee;
  }

  const eligibleSubtotal = cartItems.reduce((subtotal, item) => {
    const isEligible =
      coupon.type === 'percentage' ||
      (coupon.type === 'pizza-percentage' && item.categoryId === 'pizzas');

    return isEligible ? subtotal + item.price * item.quantity : subtotal;
  }, 0);

  return Number((eligibleSubtotal * coupon.rate).toFixed(2));
}
