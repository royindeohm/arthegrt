/**
 * Cart Context — Global Shopping Cart State
 * 
 * Uses React Context + useReducer for predictable state management.
 * This is the canonical React pattern for shared state without external libraries.
 * 
 * Architecture decisions:
 * 1. useReducer over useState — complex state with multiple action types
 *    benefits from the reducer pattern (explicit actions, single source of truth).
 * 2. Derived values (totalItems, totalPrice) are computed IN the reducer
 *    after every mutation, not in components, to ensure consistency.
 * 3. localStorage sync happens in a useEffect that watches state.items,
 *    following the "state is the source of truth" principle.
 * 4. All state updates are IMMUTABLE — spread/map/filter, never push/splice.
 */

import { createContext, useReducer, useEffect } from 'react';
import { CART_ACTIONS, STORAGE_KEYS } from '../utils/constants';

export const CartContext = createContext();

/**
 * Computes derived cart totals from the items array.
 * Extracted as a pure function so it can be called from the reducer
 * after every mutation without duplication.
 */
const computeTotals = (items) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
});

/**
 * Safely reads cart data from localStorage.
 * Returns default state if storage is empty, corrupted, or unavailable.
 */
const loadCartFromStorage = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.CART);
    if (stored) {
      const items = JSON.parse(stored);
      // Validate that parsed data is actually an array
      if (Array.isArray(items)) {
        return { items, ...computeTotals(items) };
      }
    }
  } catch (error) {
    console.warn('CartContext: Failed to load cart from localStorage.', error);
  }
  return { items: [], totalItems: 0, totalPrice: 0 };
};

/**
 * Cart Reducer
 * 
 * Every action returns a completely new state object (immutable).
 * Derived values (totalItems, totalPrice) are recomputed after every change.
 */
const cartReducer = (state, action) => {
  let newItems;

  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        // Product exists — increase quantity (immutable update via map)
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New product — append with quantity 1
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return { items: newItems, ...computeTotals(newItems) };
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      newItems = state.items.filter((item) => item.id !== action.payload);
      return { items: newItems, ...computeTotals(newItems) };
    }

    case CART_ACTIONS.INCREASE_QTY: {
      newItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { items: newItems, ...computeTotals(newItems) };
    }

    case CART_ACTIONS.DECREASE_QTY: {
      newItems = state.items
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        // Remove item if quantity reaches 0
        .filter((item) => item.quantity > 0);
      return { items: newItems, ...computeTotals(newItems) };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return { items: [], totalItems: 0, totalPrice: 0 };
    }

    case CART_ACTIONS.RESTORE_CART: {
      return { items: action.payload, ...computeTotals(action.payload) };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, null, loadCartFromStorage);

  /**
   * Persist cart to localStorage whenever items change.
   * 
   * Why useEffect instead of saving inside the reducer?
   * - Reducers should be pure functions (no side effects).
   * - useEffect is the React-sanctioned place for side effects.
   * - This also naturally batches multiple rapid dispatches.
   */
  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.CART,
        JSON.stringify(state.items)
      );
    } catch (error) {
      console.warn('CartContext: Failed to save cart to localStorage.', error);
    }
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
