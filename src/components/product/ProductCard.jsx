import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../common/Rating';
import useCart from '../../hooks/useCart';
import { useToast } from '../../context/ToastContext';
import { formatPrice, getStockStatus } from '../../utils/formatters';
import { TOAST_TYPES } from '../../utils/constants';

const ProductCard = React.memo(({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { addToast } = useToast();
  const stockStatus = getStockStatus(product.stock);
  const alreadyInCart = isInCart(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) return;

    addToCart(product);
    addToast(
      `${product.name} added to cart`,
      TOAST_TYPES.SUCCESS,
      'Added to Cart'
    );
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-surface-container-lowest border-4 border-on-surface overflow-hidden transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(38,24,28,1)] shadow-[6px_6px_0px_0px_rgba(38,24,28,1)] flex flex-col"
      aria-label={`View ${product.name} - ${formatPrice(product.price)}`}
    >
      <div className="relative overflow-hidden aspect-[3/4] border-b-4 border-on-surface">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={product.image}
          alt={product.name}
          loading="lazy"
          width="600"
          height="600"
        />
        <span className="absolute top-3 left-3 bg-surface-container-lowest border-2 border-on-surface font-headline-sm uppercase text-on-surface text-[11px] font-bold px-2.5 py-1">
          {product.category}
        </span>
        <span
          className={`absolute top-3 right-3 font-headline-sm uppercase text-[11px] font-bold px-2.5 py-1 border-2 border-on-surface ${
            stockStatus.variant === 'out'
              ? 'bg-error text-on-error'
              : stockStatus.variant === 'low'
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-secondary-container text-on-secondary-container'
          }`}
        >
          {stockStatus.label}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="font-label-caps uppercase text-[11px] font-bold text-on-surface-variant tracking-wider">{product.category}</span>
        <h3 className="font-headline-sm text-sm font-bold text-on-surface line-clamp-2">{product.name}</h3>
        <Rating value={product.rating} />
      </div>

      <div className="px-4 pb-4 flex items-center justify-between mt-auto">
        <span className="font-headline-sm text-base font-bold text-primary">{formatPrice(product.price)}</span>
        <button
          className={`font-headline-sm uppercase text-sm font-bold px-4 py-2 border-2 border-on-surface transition-all duration-300 ${
            product.stock === 0
              ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed'
              : alreadyInCart
                ? 'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed'
                : 'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary pixel-button-shadow'
          }`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          aria-label={
            product.stock === 0
              ? `${product.name} is out of stock`
              : alreadyInCart
                ? `${product.name} is already in cart, click to add another`
                : `Add ${product.name} to cart`
          }
        >
          {product.stock === 0
            ? 'Sold Out'
            : alreadyInCart
              ? '✓ In Cart'
              : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
