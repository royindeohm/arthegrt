import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import ProductCard from './ProductCard';
import SkeletonCard from '../common/SkeletonCard';
import EmptyState from '../common/EmptyState';

const ProductGrid = () => {
  const { filteredProducts, loading } = useContext(ProductContext);

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list" aria-label="Product catalog">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
