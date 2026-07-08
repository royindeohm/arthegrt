import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { fetchProductById } from '../services/productService';
import useCart from '../hooks/useCart';
import { useToast } from '../context/ToastContext';
import Rating from '../components/common/Rating';
import Spinner from '../components/common/Spinner';
import ProductCard from '../components/product/ProductCard';
import { formatPrice, getStockStatus } from '../utils/formatters';
import { TOAST_TYPES } from '../utils/constants';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart, items } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setQuantity(1);

    fetchProductById(id)
      .then((data) => {
        if (active) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const handleQtyIncrease = () => {
    if (quantity >= product.stock) return;
    setQuantity((prev) => prev + 1);
  };

  const handleQtyDecrease = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (product.stock === 0) return;

    const cartItem = items.find((item) => item.id === product.id);
    const existingQty = cartItem ? cartItem.quantity : 0;
    const finalQty = existingQty + quantity;

    if (finalQty > product.stock) {
      addToast(
        `Cannot add ${quantity} more. You already have ${existingQty} in cart, and stock limit is ${product.stock}.`,
        TOAST_TYPES.WARNING,
        'Stock Limit Exceeded'
      );
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    addToast(
      `Added ${quantity} x ${product.name} to cart.`,
      TOAST_TYPES.SUCCESS,
      'Added to Cart'
    );
    setQuantity(1);
  };

  if (loading) {
    return (
      <main className="px-4 py-8 max-w-[1440px] mx-auto">
        <Spinner size="lg" text="Loading product details..." />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="px-4 py-8 max-w-[1440px] mx-auto text-center">
        <h2 className="font-headline-lg text-2xl font-bold text-on-surface uppercase">Product Not Found</h2>
        <p className="text-on-surface-variant text-sm my-4">
          {error || 'The requested product is missing or invalid.'}
        </p>
        <Link to="/products" className="inline-block bg-primary-container text-on-primary-container border-2 border-on-surface py-3 px-6 font-headline-sm uppercase text-sm font-bold hover:bg-primary hover:text-on-primary pixel-button-shadow">
          Back to Catalog
        </Link>
      </main>
    );
  }

  const stockInfo = getStockStatus(product.stock);

  return (
    <main className="px-4 py-8 max-w-[1440px] mx-auto">
      <nav className="flex items-center gap-2 text-on-surface-variant text-sm mb-4" aria-label="Breadcrumb">
        <Link to="/" className="font-label-caps uppercase hover:text-primary">Home</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link to="/products" className="font-label-caps uppercase hover:text-primary">Products</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="font-label-caps uppercase text-on-surface font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-4">
        <div className="lg:col-span-7">
          <div className="aspect-[4/5] overflow-hidden bg-surface-container border-4 border-on-surface shadow-[6px_6px_0px_0px_rgba(38,24,28,1)]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover bg-center hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <span className="font-label-caps uppercase text-xs text-on-surface-variant tracking-wider">Limited Edition</span>
          <h1 className="font-headline-lg text-2xl font-bold text-on-surface uppercase tracking-tight mt-1">{product.name}</h1>

          <div className="flex items-center gap-2 mt-2">
            <Rating value={product.rating} />
            <span className="font-label-caps uppercase text-xs text-on-surface-variant">
              Verified Customer Rating
            </span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <span className="font-headline-lg text-xl font-bold text-primary">{formatPrice(product.price)}</span>
            <span className="font-headline-sm text-sm text-on-surface-variant line-through">{formatPrice(product.price * 1.2)}</span>
          </div>

          <p className="text-on-surface-variant text-sm mt-4 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-2 mt-4">
            <span className="font-label-caps uppercase text-xs text-on-surface-variant">Stock Status:</span>
            <span className={`font-headline-sm uppercase text-xs font-bold ${
              stockInfo.variant === 'in-stock' ? 'text-secondary' :
              stockInfo.variant === 'low-stock' ? 'text-primary-container' : 'text-error'
            }`}>
              {stockInfo.label}
            </span>
          </div>

          <div className="border-t-2 border-on-surface my-4" />

          {product.stock > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="font-label-caps uppercase text-xs text-on-surface-variant">Quantity:</span>
                <div className="flex items-center border-2 border-on-surface">
                  <button
                    className="px-4 py-2 text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40 border-r-2 border-on-surface"
                    onClick={handleQtyDecrease}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-headline-sm text-on-surface font-bold" aria-label={`Quantity: ${quantity}`}>
                    {quantity}
                  </span>
                  <button
                    className="px-4 py-2 text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40 border-l-2 border-on-surface"
                    onClick={handleQtyIncrease}
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="w-full bg-primary-container text-on-primary-container border-2 border-on-surface font-headline-sm uppercase text-sm font-bold py-3 px-6 hover:bg-primary hover:text-on-primary transition-colors pixel-button-shadow"
                onClick={handleAddToCart}
                aria-label={`Add ${quantity} units of ${product.name} to cart`}
              >
                Add To Cart
              </button>
            </div>
          ) : (
            <button className="w-full bg-surface-container-highest text-on-surface-variant border-2 border-on-surface py-3 px-6 font-headline-sm uppercase text-sm font-bold cursor-not-allowed" disabled>
              Out of Stock
            </button>
          )}

          <div className="border-t-2 border-on-surface my-4" />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span>1 Year Official Warranty Included</span>
            </div>
            <div className="flex items-center gap-3 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              <span>Free Shipping on orders over $150</span>
            </div>
            <div className="flex items-center gap-3 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-primary">autorenew</span>
              <span>30-Day Hassle-Free Returns policy</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16" aria-labelledby="related-title">
          <div className="mb-6">
            <h2 id="related-title" className="font-headline-md text-xl font-bold text-on-surface uppercase">Customers Also Bought</h2>
            <div className="h-2 w-32 bg-secondary-container my-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetailPage;
