import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatters';
import { TOAST_TYPES } from '../../utils/constants';

const CartItem = React.memo(({ item }) => {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();
  const { addToast } = useToast();

  const handleIncrease = () => {
    if (item.quantity >= item.stock) {
      addToast(
        `Cannot add more. Only ${item.stock} items in stock.`,
        TOAST_TYPES.WARNING,
        'Stock Limit Reached'
      );
      return;
    }
    increaseQty(item.id);
  };

  const handleDecrease = () => {
    decreaseQty(item.id);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    addToast(
      `${item.name} removed from cart`,
      TOAST_TYPES.INFO,
      'Removed from Cart'
    );
  };

  const lineTotal = item.price * item.quantity;

  return (
    <div className="grid grid-cols-[80px_1fr_auto] gap-4 items-center bg-surface-container-lowest border-4 border-on-surface p-4 shadow-[6px_6px_0px_0px_rgba(38,24,28,1)]" role="listitem">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-24 object-cover border-2 border-on-surface"
        loading="lazy"
        width="100"
        height="100"
      />
      <div className="flex flex-col gap-1">
        <Link to={`/products/${item.id}`} className="font-headline-sm text-sm font-bold text-on-surface hover:text-primary transition-colors">
          {item.name}
        </Link>
        <span className="text-xs text-on-surface-variant">
          {formatPrice(item.price)} each
        </span>
        <button
          className="font-label-caps uppercase text-xs text-on-surface-variant hover:text-error transition-colors mt-1 self-start"
          onClick={handleRemove}
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center">
          <button
            className="w-8 h-8 flex items-center justify-center border-2 border-on-surface text-on-surface hover:bg-surface-container transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            aria-label={`Decrease quantity of ${item.name}`}
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-bold text-on-surface border-y-2 border-on-surface py-1" aria-label={`Quantity: ${item.quantity}`}>
            {item.quantity}
          </span>
          <button
            className="w-8 h-8 flex items-center justify-center border-2 border-on-surface text-on-surface hover:bg-surface-container transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={handleIncrease}
            disabled={item.quantity >= item.stock}
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
        </div>
        <span className="font-headline-sm text-sm font-bold text-on-surface">
          {formatPrice(lineTotal)}
        </span>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;
