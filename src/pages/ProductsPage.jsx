import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import CategoryFilter from '../components/filters/CategoryFilter';
import SortDropdown from '../components/filters/SortDropdown';
import ProductGrid from '../components/product/ProductGrid';

import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const { filteredProducts, loading } = useContext(ProductContext);

  return (
    <main className="px-4 md:px-16 py-8 max-w-[1440px] mx-auto">
      <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6">
        <Link to="/" className="font-label-caps uppercase hover:text-primary">Home</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="font-label-caps uppercase text-on-surface font-bold">All Products</span>
      </div>
      <header className="mb-6">
        <h1 className="font-headline-lg text-3xl font-bold text-on-surface uppercase tracking-tight">Essential Collections</h1>
        <div className="h-2 w-32 bg-secondary-container my-2" />
        <p className="text-on-surface-variant text-sm">
          Browse our full range of high-quality premium products
        </p>
      </header>
      <section className="flex flex-wrap items-center gap-4 py-4 border-y-2 border-on-surface mb-6" aria-label="Filters and sorting controls">
        <CategoryFilter />
        <SortDropdown />
        <div className="text-on-surface-variant font-label-caps uppercase text-sm ml-auto" aria-live="polite">
          {loading ? (
            'Loading...'
          ) : (
            `${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'} found`
          )}
        </div>
      </section>
      <section aria-label="Products list">
        <ProductGrid />
      </section>
    </main>
  );
};

export default ProductsPage;
