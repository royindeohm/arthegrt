/**
 * Toast Context — Global Toast Notification System
 * 
 * Manages a queue of toast notifications with auto-dismiss.
 * Each toast gets a unique ID and automatically removes itself after TOAST_DURATION.
 * 
 * Why a separate context instead of local state?
 * - Toasts can be triggered from ANY component (cart actions, form validation, checkout)
 * - They need to render in a fixed position independent of the component tree
 * - A global queue prevents overlapping toasts and manages dismiss timing
 */

import { createContext, useReducer, useCallback, useContext } from 'react';
import { TOAST_ACTIONS, TOAST_TYPES, TOAST_DURATION } from '../utils/constants';

const ToastContext = createContext();

let toastIdCounter = 0;

const toastReducer = (state, action) => {
  switch (action.type) {
    case TOAST_ACTIONS.ADD_TOAST:
      return [...state, action.payload];

    case TOAST_ACTIONS.REMOVE_TOAST:
      return state.filter((toast) => toast.id !== action.payload);

    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  /**
   * Adds a toast notification to the queue.
   * Each toast auto-dismisses after TOAST_DURATION ms.
   * 
   * @param {string} message — The toast message.
   * @param {string} type — One of TOAST_TYPES (success, error, warning, info).
   * @param {string} [title] — Optional title for the toast.
   */
  const addToast = useCallback((message, type = TOAST_TYPES.INFO, title = '') => {
    const id = ++toastIdCounter;

    dispatch({
      type: TOAST_ACTIONS.ADD_TOAST,
      payload: { id, message, type, title },
    });

    // Auto-dismiss after TOAST_DURATION
    setTimeout(() => {
      dispatch({ type: TOAST_ACTIONS.REMOVE_TOAST, payload: id });
    }, TOAST_DURATION);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: TOAST_ACTIONS.REMOVE_TOAST, payload: id });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

/**
 * Custom hook for consuming the toast context.
 * Provides a cleaner API than useContext(ToastContext) in every component.
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
