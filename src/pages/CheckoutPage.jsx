import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { useToast } from '../context/ToastContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import Spinner from '../components/common/Spinner';
import { TOAST_TYPES } from '../utils/constants';

const CheckoutPage = () => {
  const { items } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      addToast(
        'Your cart is empty. Please add products before checking out.',
        TOAST_TYPES.WARNING,
        'Checkout Blocked'
      );
      navigate('/cart', { replace: true });
    }
  }, [items, navigate, addToast]);

  if (items.length === 0) {
    return null;
  }

  const handlePlaceOrder = (formData) => {
    setIsProcessing(true);

    setTimeout(() => {
      addToast(
        'Thank you! Your order has been placed successfully.',
        TOAST_TYPES.SUCCESS,
        'Order Placed'
      );

      setIsProcessing(false);
      navigate('/order-success', {
        state: {
          customerName: formData.fullName,
          email: formData.email,
        },
      });
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-surface">
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60" role="dialog" aria-modal="true" aria-label="Processing your order">
          <Spinner size="lg" />
          <h2 className="text-white font-headline-lg text-xl font-bold uppercase tracking-tight mt-6">Processing Your Order</h2>
          <p className="text-white/70 text-sm mt-2">
            Securing your items and compiling your receipt. Please do not refresh.
          </p>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-8">
        <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6">
          <Link to="/" className="font-label-caps uppercase hover:text-primary">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-label-caps uppercase text-on-surface font-bold">Checkout</span>
        </div>

        <header className="mb-6">
          <h1 className="font-headline-lg text-3xl font-bold text-on-surface uppercase tracking-tight">Checkout</h1>
          <div className="h-2 w-32 bg-secondary-container my-2" />
          <p className="text-on-surface-variant text-sm">Please enter your shipping address to complete your order</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-7" aria-label="Shipping form details">
            <h2 className="font-headline-sm text-lg font-bold text-on-surface uppercase mb-4">Step 1: Shipping Information</h2>
            <CheckoutForm
              isProcessing={isProcessing}
              onSubmit={handlePlaceOrder}
            />
            <div className="mt-8">
              <h2 className="font-headline-sm text-lg font-bold text-on-surface uppercase mb-4">Step 2: Delivery Method</h2>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-4 p-4 border-2 border-on-surface bg-surface-container-lowest cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-surface-container transition-colors shadow-[4px_4px_0px_0px_rgba(38,24,28,1)]">
                  <input type="radio" name="delivery" className="accent-primary" defaultChecked />
                  <div>
                    <span className="block font-headline-sm uppercase text-sm font-bold text-on-surface">Express Delivery</span>
                    <span className="font-label-caps uppercase text-xs text-on-surface-variant">2-3 business days</span>
                  </div>
                  <span className="ml-auto font-headline-sm text-sm font-bold text-on-surface">$25.00</span>
                </label>
                <label className="flex items-center gap-4 p-4 border-2 border-on-surface bg-surface-container-lowest cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-surface-container transition-colors shadow-[4px_4px_0px_0px_rgba(38,24,28,1)]">
                  <input type="radio" name="delivery" className="accent-primary" />
                  <div>
                    <span className="block font-headline-sm uppercase text-sm font-bold text-on-surface">Standard Delivery</span>
                    <span className="font-label-caps uppercase text-xs text-on-surface-variant">5-7 business days</span>
                  </div>
                  <span className="ml-auto font-headline-sm text-sm font-bold text-on-surface">Free</span>
                </label>
              </div>
            </div>
          </section>

          <aside className="lg:col-span-5 lg:sticky lg:top-8 self-start">
            <h2 className="font-headline-sm text-lg font-bold text-on-surface uppercase mb-4">Order Summary</h2>
            <OrderSummary />
            <button
              onClick={() => document.querySelector('form')?.requestSubmit()}
              disabled={isProcessing}
              className="w-full bg-primary-container text-on-primary-container border-2 border-on-surface font-headline-sm uppercase text-sm font-bold py-3 px-6 hover:bg-primary hover:text-on-primary transition-colors disabled:opacity-50 mt-4 pixel-button-shadow"
            >
              Complete Purchase
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
