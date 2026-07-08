import useCart from '../hooks/useCart';
import { useToast } from '../context/ToastContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyState from '../components/common/EmptyState';
import { TOAST_TYPES } from '../utils/constants';

const CartPage = () => {
  const { items, clearCart, totalItems } = useCart();
  const { addToast } = useToast();

  const handleClearCart = () => {
    if (items.length === 0) return;
    clearCart();
    addToast(
      'Your shopping cart has been cleared.',
      TOAST_TYPES.INFO,
      'Cart Cleared'
    );
  };

  if (items.length === 0) {
    return (
      <main className="px-4 py-8 max-w-[1440px] mx-auto">
        <EmptyState
          icon="shopping_cart"
          title="Your Cart is Empty"
          description="It looks like you haven't added any products to your shopping cart yet. Discover our premium selections and start shopping now!"
          actionText="Continue Shopping"
          actionTo="/products"
        />
      </main>
    );
  }

  return (
    <main className="px-4 py-8 max-w-[1440px] mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="font-headline-lg text-2xl font-bold text-on-surface uppercase tracking-tight">
          Shopping Cart <span className="font-headline-sm text-sm text-on-surface-variant">({totalItems} items)</span>
        </h1>
        <button
          className="flex items-center gap-2 font-label-caps uppercase text-xs text-on-surface-variant hover:text-error transition-colors"
          onClick={handleClearCart}
          aria-label="Clear all items from shopping cart"
        >
          <span className="material-symbols-outlined text-[16px]">delete</span>
          Clear Cart
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <section className="flex flex-col gap-4" aria-label="Shopping cart items">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </section>

        <aside className="lg:sticky lg:top-8 self-start">
          <CartSummary />
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
