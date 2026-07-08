/**
 * Application Constants
 * 
 * Centralizes all magic strings, config values, and enum-like constants.
 * Prevents typos and makes refactoring effortless — change once, update everywhere.
 */

/** Sort options for the product list */
export const SORT_OPTIONS = {
  DEFAULT: '',
  PRICE_LOW: 'price-low',
  PRICE_HIGH: 'price-high',
  ALPHA_AZ: 'alpha-az',
  ALPHA_ZA: 'alpha-za',
  NEWEST: 'newest',
  RATING: 'rating',
};

/** Human-readable labels for sort options (used in the dropdown) */
export const SORT_LABELS = {
  [SORT_OPTIONS.DEFAULT]: 'Default',
  [SORT_OPTIONS.PRICE_LOW]: 'Price: Low to High',
  [SORT_OPTIONS.PRICE_HIGH]: 'Price: High to Low',
  [SORT_OPTIONS.ALPHA_AZ]: 'Name: A → Z',
  [SORT_OPTIONS.ALPHA_ZA]: 'Name: Z → A',
  [SORT_OPTIONS.NEWEST]: 'Newest First',
  [SORT_OPTIONS.RATING]: 'Best Rating',
};

/** Cart action types for the reducer */
export const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  INCREASE_QTY: 'INCREASE_QTY',
  DECREASE_QTY: 'DECREASE_QTY',
  CLEAR_CART: 'CLEAR_CART',
  RESTORE_CART: 'RESTORE_CART',
};

/** Product action types for the reducer */
export const PRODUCT_ACTIONS = {
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SEARCH: 'SET_SEARCH',
  SET_SORT: 'SET_SORT',
  TOGGLE_CATEGORY: 'TOGGLE_CATEGORY',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
};

/** Toast action types */
export const TOAST_ACTIONS = {
  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
};

/** Toast type variants */
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

/** localStorage keys — centralized to prevent key mismatches */
export const STORAGE_KEYS = {
  CART: 'ecommerce_cart',
};

/** Routes — centralized for Link/navigate references */
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_SUCCESS: '/order-success',
};

/** Toast auto-dismiss duration in milliseconds */
export const TOAST_DURATION = 3000;
