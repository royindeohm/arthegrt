import useCart from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatters';

const OrderSummary = () => {
  const { items, totalPrice, totalItems } = useCart();

  const shippingCost = totalPrice > 150 || totalPrice === 0 ? 0 : 15.0;
  const taxCost = totalPrice * 0.08;
  const grandTotal = totalPrice + shippingCost + taxCost;

  return (
    <div className="bg-surface-container-lowest border-4 border-on-surface p-6 shadow-[6px_6px_0px_0px_rgba(38,24,28,1)]" role="region" aria-label="Order summary review">
      <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-6 uppercase">Review Your Order</h3>

      <div className="max-h-[250px] overflow-y-auto mb-4 space-y-3 hide-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 object-cover border-2 border-on-surface flex-shrink-0"
              loading="lazy"
              width="56"
              height="56"
            />
            <div className="flex-1 min-w-0">
              <p className="font-headline-sm text-sm font-bold text-on-surface truncate">{item.name}</p>
              <p className="text-xs text-on-surface-variant">Qty: {item.quantity}</p>
            </div>
            <span className="font-headline-sm text-sm font-bold text-on-surface flex-shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-on-surface my-3" />

      <div className="flex justify-between items-center py-1">
        <span className="text-sm text-on-surface-variant">Subtotal ({totalItems} items)</span>
        <span className="font-headline-sm text-sm text-on-surface font-bold">{formatPrice(totalPrice)}</span>
      </div>

      <div className="flex justify-between items-center py-1">
        <span className="text-sm text-on-surface-variant">Estimated Tax (8%)</span>
        <span className="font-headline-sm text-sm text-on-surface font-bold">{formatPrice(taxCost)}</span>
      </div>

      <div className="flex justify-between items-center py-1">
        <span className="text-sm text-on-surface-variant">Shipping</span>
        <span className="font-headline-sm text-sm text-on-surface font-bold">{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
      </div>

      <div className="flex justify-between items-center pt-2 mt-2 border-t-2 border-on-surface">
        <span className="font-headline-sm text-base font-bold text-on-surface uppercase">Total Due</span>
        <span className="font-headline-sm text-base font-bold text-primary">{formatPrice(grandTotal)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
