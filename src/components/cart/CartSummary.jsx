import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatters';

const CartSummary = () => {
  const { totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const shippingCost = totalPrice > 150 || totalPrice === 0 ? 0 : 15.0;
  const taxCost = totalPrice * 0.08;
  const grandTotal = totalPrice + shippingCost + taxCost;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-surface-container-lowest border-4 border-on-surface p-6 shadow-[6px_6px_0px_0px_rgba(38,24,28,1)]" role="region" aria-label="Cart summary">
      <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-4 uppercase">Order Summary</h3>

      <div className="flex justify-between items-center py-2 text-sm">
        <span className="text-on-surface-variant">Items ({totalItems})</span>
        <span className="font-headline-sm text-on-surface font-bold">{formatPrice(totalPrice)}</span>
      </div>

      <div className="flex justify-between items-center py-2 text-sm">
        <span className="text-on-surface-variant">Estimated Tax (8%)</span>
        <span className="font-headline-sm text-on-surface font-bold">{formatPrice(taxCost)}</span>
      </div>

      <div className="flex justify-between items-center py-2 text-sm">
        <span className="text-on-surface-variant">Shipping</span>
        <span className="font-headline-sm text-on-surface font-bold">
          {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
        </span>
      </div>

      <div className="flex justify-between items-center py-3 mt-2 border-t-2 border-on-surface">
        <span className="font-headline-sm text-base font-bold text-on-surface uppercase">Grand Total</span>
        <span className="font-headline-sm text-base font-bold text-primary">{formatPrice(grandTotal)}</span>
      </div>

      <div className="mt-4">
        <button
          className="w-full bg-primary-container text-on-primary-container border-2 border-on-surface font-headline-sm uppercase text-base font-bold py-3 px-6 hover:bg-primary hover:text-on-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed pixel-button-shadow"
          onClick={handleCheckout}
          disabled={totalItems === 0}
          aria-label="Proceed to secure checkout"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
