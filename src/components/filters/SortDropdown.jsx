import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { SORT_OPTIONS, SORT_LABELS } from '../../utils/constants';

const SortDropdown = () => {
  const { sort, setSort } = useContext(ProductContext);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort-dropdown" className="font-label-caps uppercase text-sm font-bold text-on-surface-variant">
        Sort By:
      </label>
      <select
        id="sort-dropdown"
        className="bg-surface-container-lowest border-2 border-on-surface text-on-surface font-headline-sm uppercase text-sm px-3 py-2 focus:outline-none focus:border-secondary-container transition-all duration-300 cursor-pointer appearance-none"
        value={sort}
        onChange={handleSortChange}
        aria-label="Sort products by selection"
      >
        {Object.values(SORT_OPTIONS).map((optionKey) => (
          <option key={optionKey} value={optionKey}>
            {SORT_LABELS[optionKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
