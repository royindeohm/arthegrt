/**
 * Product Context — Products, Filtering, Sorting, and Search State
 * 
 * Manages the product catalog and all filter/sort/search state in one place.
 * 
 * The key architectural decision here is using useMemo for the derived
 * `filteredProducts` array. This means:
 * - The expensive filter + sort computation only runs when inputs change
 * - Components receive the pre-computed result, not raw data + filter params
 * - Adding new filters/sorts is a single-point change in getFilteredProducts
 */

import { createContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import { PRODUCT_ACTIONS, SORT_OPTIONS } from '../utils/constants';
import { fetchMockProducts } from '../services/productService';

export const ProductContext = createContext();

const initialState = {
  products: [],
  loading: true,
  error: null,
  search: '',
  sort: SORT_OPTIONS.DEFAULT,
  selectedCategories: [],
};

const productReducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload, loading: false, error: null };

    case PRODUCT_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case PRODUCT_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case PRODUCT_ACTIONS.SET_SEARCH:
      return { ...state, search: action.payload };

    case PRODUCT_ACTIONS.SET_SORT:
      return { ...state, sort: action.payload };

    case PRODUCT_ACTIONS.TOGGLE_CATEGORY: {
      const category = action.payload;
      const exists = state.selectedCategories.includes(category);
      return {
        ...state,
        selectedCategories: exists
          ? state.selectedCategories.filter((c) => c !== category)
          : [...state.selectedCategories, category],
      };
    }

    case PRODUCT_ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        search: '',
        sort: SORT_OPTIONS.DEFAULT,
        selectedCategories: [],
      };

    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Fetch products on mount (simulated API call)
  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: true });
        const data = await fetchMockProducts();

        // Prevent state updates after unmount (avoids memory leak warning)
        if (!cancelled) {
          dispatch({ type: PRODUCT_ACTIONS.SET_PRODUCTS, payload: data });
        }
      } catch (error) {
        if (!cancelled) {
          dispatch({
            type: PRODUCT_ACTIONS.SET_ERROR,
            payload: error.message,
          });
        }
      }
    };

    loadProducts();

    // Cleanup function — cancels the state update if the component unmounts
    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * Filtered & sorted products — computed via useMemo.
   * 
   * This is a performance optimization: the filter + sort operation
   * runs only when products, search, sort, or categories change.
   * With 2500+ products, this prevents unnecessary O(n log n) sorts
   * on every render.
   */
  const filteredProducts = useMemo(() => {
    let result = [...state.products];

    // 1. Filter by selected categories (multi-select)
    if (state.selectedCategories.length > 0) {
      result = result.filter((product) =>
        state.selectedCategories.includes(product.category)
      );
    }

    // 2. Filter by search query (matches name or category, case-insensitive)
    if (state.search.trim()) {
      const query = state.search.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // 3. Sort
    switch (state.sort) {
      case SORT_OPTIONS.PRICE_LOW:
        result.sort((a, b) => a.price - b.price);
        break;
      case SORT_OPTIONS.PRICE_HIGH:
        result.sort((a, b) => b.price - a.price);
        break;
      case SORT_OPTIONS.ALPHA_AZ:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SORT_OPTIONS.ALPHA_ZA:
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case SORT_OPTIONS.NEWEST:
        result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case SORT_OPTIONS.RATING:
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order
        break;
    }

    return result;
  }, [state.products, state.search, state.sort, state.selectedCategories]);

  // Memoized dispatch wrappers for consumers
  const setSearch = useCallback(
    (query) => dispatch({ type: PRODUCT_ACTIONS.SET_SEARCH, payload: query }),
    []
  );

  const setSort = useCallback(
    (sort) => dispatch({ type: PRODUCT_ACTIONS.SET_SORT, payload: sort }),
    []
  );

  const toggleCategory = useCallback(
    (category) =>
      dispatch({ type: PRODUCT_ACTIONS.TOGGLE_CATEGORY, payload: category }),
    []
  );

  const clearFilters = useCallback(
    () => dispatch({ type: PRODUCT_ACTIONS.CLEAR_FILTERS }),
    []
  );

  const contextValue = useMemo(
    () => ({
      products: state.products,
      filteredProducts,
      loading: state.loading,
      error: state.error,
      search: state.search,
      sort: state.sort,
      selectedCategories: state.selectedCategories,
      setSearch,
      setSort,
      toggleCategory,
      clearFilters,
    }),
    [
      state.products,
      filteredProducts,
      state.loading,
      state.error,
      state.search,
      state.sort,
      state.selectedCategories,
      setSearch,
      setSort,
      toggleCategory,
      clearFilters,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
