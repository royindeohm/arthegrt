import { useState, useEffect, useContext, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import useCart from '../../hooks/useCart';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { search, setSearch } = useContext(ProductContext);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    navigate('/products', { replace: true });
  };

  const handleSearchClear = () => {
    setSearch('');
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-surface border-b-4 border-on-surface shadow-[4px_4px_0px_0px_rgba(38,24,28,1)]'
            : 'bg-surface border-b-4 border-on-surface'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-16 py-4">
          <Link to="/" className="font-headline-md italic uppercase text-primary font-bold text-2xl tracking-tight" aria-label="ELITE Home">
            ELITE
          </Link>

          <div className="relative hidden md:flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-secondary text-lg pointer-events-none" aria-hidden="true">search</span>
            <input
              type="search"
              className="w-80 pl-11 pr-8 py-2.5 bg-surface-container-lowest border-2 border-on-surface text-on-surface text-sm placeholder:text-outline focus:outline-none focus:border-secondary-container transition-all"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
              aria-label="Search products"
              id="search-input"
            />
            {search && (
              <button
                className="absolute right-3 text-on-surface-variant hover:text-on-surface transition-colors text-sm leading-none"
                onClick={handleSearchClear}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `font-headline-sm uppercase text-sm font-bold transition-colors pb-1 border-b-2 ${isActive ? 'text-primary border-secondary' : 'text-on-surface border-transparent hover:text-primary'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `font-headline-sm uppercase text-sm font-bold transition-colors pb-1 border-b-2 ${isActive ? 'text-primary border-secondary' : 'text-on-surface border-transparent hover:text-primary'}`
              }
            >
              Collections
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative p-2.5 hover:bg-surface-container transition-all border-2 border-transparent hover:border-on-surface"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <span className="material-symbols-outlined text-on-surface text-[22px]">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-container text-on-secondary-container border-2 border-on-surface text-[10px] font-bold w-5 h-5 flex items-center justify-center" aria-hidden="true">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            <button
              className={`md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 bg-transparent border-2 border-on-surface cursor-pointer hover:bg-surface-container transition-colors`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`block w-5 h-[2px] bg-on-surface transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-5 h-[2px] bg-on-surface transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[2px] bg-on-surface transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <div className="md:hidden px-4 pb-3 pt-2 bg-surface border-b-2 border-on-surface">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-secondary text-lg pointer-events-none" aria-hidden="true">search</span>
          <input
            type="search"
            className="w-full pl-11 pr-8 py-2.5 bg-surface-container-lowest border-2 border-on-surface text-on-surface text-sm placeholder:text-outline focus:outline-none focus:border-secondary-container transition-all"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            aria-label="Search products on mobile"
          />
          {search && (
            <button
              className="absolute right-3 text-on-surface-variant hover:text-on-surface transition-colors text-sm leading-none"
              onClick={handleSearchClear}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
};

export default Navbar;
