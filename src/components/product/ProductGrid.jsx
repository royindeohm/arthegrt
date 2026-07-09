import { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import ProductCard from './ProductCard';
import SkeletonCard from '../common/SkeletonCard';
import EmptyState from '../common/EmptyState';

const ProductGrid = () => {
  const { filteredProducts, loading } = useContext(ProductContext);

  /**
   * Load More Pagination — Incremental Rendering for Large Catalogs
   *
   * Why pagination over virtualization here:
   * - Virtualization (e.g., react-window) requires fixed row heights or
   *   complex measurement logic for responsive CSS grids, adding fragility.
   * - "Load More" is simpler, works with any grid layout, and gives the user
   *   explicit control over how many items are rendered.
   * - With 2,500+ products, rendering all at once causes noticeable freezes
   *   on initial render. Incrementally revealing 20 at a time keeps each
   *   paint cycle well under the 16ms frame budget.
   * - visibleCount resets to 20 whenever filteredProducts changes
   *   (new filter/search/sort), so pagination never stays stuck on an old
   *   scroll position after the results change.
   */
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    setVisibleCount(20);
  }, [filteredProducts]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" aria-busy="true" aria-label="Loading products">
        {Array.from({ length: 8 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <EmptyState
        icon="search_off"
        title="No products found"
        description="Try adjusting your filters or search query to find what you're looking for."
        actionText="Clear Filters"
        actionTo="/products"
      />
    );
  }

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list" aria-label="Product catalog">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-primary-container text-on-primary-container border-2 border-on-surface font-headline-sm uppercase text-sm font-bold px-6 py-3 hover:bg-primary hover:text-on-primary transition-colors pixel-button-shadow"
            aria-label="Load more products"
          >
            Load More ({filteredProducts.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
