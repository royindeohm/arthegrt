import { useEffect, useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { generateOrderId } from '../utils/formatters';

const OrderSuccessPage = () => {
  const location = useLocation();
  const [orderId, setOrderId] = useState('');
  const { clearCart } = useCart();

  useEffect(() => {
    setOrderId(generateOrderId());
    clearCart();
  }, [clearCart]);

  if (!location.state || !location.state.customerName) {
    return <Navigate to="/" replace />;
  }

  const { customerName, email } = location.state;

  return (
    <main className="px-4 py-16 max-w-2xl mx-auto text-center">
      <span className="material-symbols-outlined text-[64px] text-secondary-container">check_circle</span>

      <h1 className="font-headline-lg text-3xl font-bold text-on-surface uppercase tracking-tight mt-4">
        Order Confirmed!
      </h1>
      <div className="h-2 w-32 bg-secondary-container mx-auto my-4" />

      <p className="text-on-surface-variant text-sm mt-4">
        Thank you for your purchase, <strong className="text-on-surface font-bold">{customerName}</strong>!
      </p>

      <p className="text-on-surface-variant text-sm mt-2">
        A confirmation receipt has been sent to <strong className="text-on-surface font-bold">{email}</strong>.
      </p>

      <p className="mt-6 font-label-caps uppercase text-xs text-on-surface-variant">
        Order Reference ID: <strong className="font-headline-sm text-sm text-on-surface font-bold">{orderId}</strong>
      </p>

      <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
        <Link to="/" className="bg-surface-container-lowest text-on-surface border-2 border-on-surface py-3 px-6 font-headline-sm uppercase text-sm font-bold hover:bg-surface-container transition-colors">
          Back to Home
        </Link>
        <Link to="/products" className="bg-primary-container text-on-primary-container border-2 border-on-surface py-3 px-6 font-headline-sm uppercase text-sm font-bold hover:bg-primary hover:text-on-primary transition-colors pixel-button-shadow">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
};

export default OrderSuccessPage;
