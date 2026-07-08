import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const MobileMenu = ({ isOpen, onClose }) => {
  const { totalItems } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-surface border-l-4 border-on-surface shadow-[-4px_0_0_0_rgba(38,24,28,1)] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b-4 border-on-surface">
          <span className="font-headline-md italic uppercase font-bold text-xl text-primary tracking-tight">
            ELITE
          </span>
          <button
            className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors bg-transparent border-2 border-on-surface cursor-pointer text-lg hover:bg-surface-container"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col py-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 font-headline-sm uppercase text-sm font-bold transition-colors ${isActive ? 'text-primary bg-surface-container border-r-4 border-primary' : 'text-on-surface hover:text-primary hover:bg-surface-container'}`
            }
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 font-headline-sm uppercase text-sm font-bold transition-colors ${isActive ? 'text-primary bg-surface-container border-r-4 border-primary' : 'text-on-surface hover:text-primary hover:bg-surface-container'}`
            }
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            Collections
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 font-headline-sm uppercase text-sm font-bold transition-colors ${isActive ? 'text-primary bg-surface-container border-r-4 border-primary' : 'text-on-surface hover:text-primary hover:bg-surface-container'}`
            }
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            Cart {totalItems > 0 && `(${totalItems})`}
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
