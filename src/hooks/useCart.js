/**
 * useCart Hook
 * 
 * Convenience hook that wraps the CartContext and exposes
 * a clean API for cart operations. This abstraction means
 * components never need to import context + dispatch directly.
 * 
 * Benefits:
 * - Single import for all cart operations
 * - Derived values (isInCart) computed here, not in every component
 * - Easy to mock in tests
 * 
 * @returns {Object} Cart state and action methods.
 */
import { useContext, useCallback } from 'react';
import { CartContext } from '../context/CartContext';
import { CART_ACTIONS } from '../utils/constants';

const useCart = () => {
  const { state, dispatch } = useContext(CartContext);

  const addToCart = useCallback(
    (product) => {
      dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: product });
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    (productId) => {
      dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: productId });
    },
    [dispatch]
  );

  const increaseQty = useCallback(
    (productId) => {
      dispatch({ type: CART_ACTIONS.INCREASE_QTY, payload: productId });
    },
    [dispatch]
  );

  const decreaseQty = useCallback(
    (productId) => {
      dispatch({ type: CART_ACTIONS.DECREASE_QTY, payload: productId });
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  }, [dispatch]);

  /**
   * Checks if a product is already in the cart.
   * Useful for showing "Added" state on product cards.
   */
  const isInCart = useCallback(
    (productId) => {
      return state.items.some((item) => item.id === productId);
    },
    [state.items]
  );

  /**
   * Gets the quantity of a specific product in the cart.
   * Returns 0 if the product is not in the cart.
   */
  const getItemQty = useCallback(
    (productId) => {
      const item = state.items.find((item) => item.id === productId);
      return item ? item.quantity : 0;
    },
    [state.items]
  );

  return {
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    isInCart,
    getItemQty,
  };
};

export default useCart;
