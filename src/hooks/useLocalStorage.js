/**
 * useLocalStorage Hook
 * 
 * A generic hook for persisting state in localStorage with automatic
 * JSON serialization/deserialization.
 * 
 * Why a custom hook instead of inline useEffect?
 * - Encapsulates the try/catch error handling for corrupted storage
 * - Reusable across any component that needs persistence
 * - Handles edge cases: empty storage, invalid JSON, quota exceeded
 * 
 * @param {string} key — The localStorage key.
 * @param {*} initialValue — Fallback value if nothing is stored.
 * @returns {[*, Function]} Tuple of [storedValue, setValue].
 */
import { useState, useCallback } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Initialize state from localStorage (runs only once)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      // Return parsed value if it exists, otherwise the initial value
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If JSON.parse fails (corrupted data), fall back to initial value
      console.warn(
        `useLocalStorage: Failed to parse stored value for key "${key}". ` +
        `Falling back to initial value.`,
        error
      );
      return initialValue;
    }
  });

  /**
   * Wrapper around setState that also persists to localStorage.
   * Supports both direct values and updater functions (like setState).
   */
  const setValue = useCallback(
    (value) => {
      try {
        // Allow functional updates (same pattern as useState)
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // Handles quota exceeded, private browsing restrictions, etc.
        console.warn(
          `useLocalStorage: Failed to save value for key "${key}".`,
          error
        );
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

export default useLocalStorage;
