import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { CATEGORIES } from '../../data/products';

const CategoryFilter = () => {
  const { selectedCategories, toggleCategory, clearFilters } =
    useContext(ProductContext);

  return (
    <div className="flex items-center gap-4 flex-wrap" role="group" aria-label="Filter products by category">
      <span className="font-label-caps uppercase text-sm font-bold text-on-surface-variant">Categories:</span>
      <button
        className={`pb-1 font-headline-sm uppercase text-sm font-bold transition-all duration-300 border-b-2 ${
          selectedCategories.length === 0
            ? 'text-primary border-primary'
            : 'text-on-surface-variant hover:text-primary border-transparent'
        }`}
        onClick={clearFilters}
        aria-pressed={selectedCategories.length === 0}
      >
        All
      </button>

      {CATEGORIES.map((category) => {
        const isActive = selectedCategories.includes(category);
        return (
          <button
            key={category}
            className={`pb-1 font-headline-sm uppercase text-sm font-bold transition-all duration-300 border-b-2 ${
              isActive
                ? 'text-primary border-primary'
                : 'text-on-surface-variant hover:text-primary border-transparent'
            }`}
            onClick={() => toggleCategory(category)}
            aria-pressed={isActive}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
