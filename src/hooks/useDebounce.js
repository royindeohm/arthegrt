/**
 * useDebounce Hook
 * 
 * Delays updating a value until a specified time has passed since the
 * last change. Essential for search inputs to prevent excessive re-renders
 * and filtering on every keystroke.
 * 
 * How it works:
 * 1. User types → `value` updates immediately (controlled input stays responsive)
 * 2. A timeout starts (default 300ms)
 * 3. If user types again before timeout completes, the timer resets
 * 4. Once the user pauses, `debouncedValue` updates and triggers filtering
 * 
 * This dramatically reduces the number of filter/sort computations when
 * the product list is large (2500+ products per the spec).
 * 
 * @param {*} value — The value to debounce.
 * @param {number} delay — Debounce delay in milliseconds.
 * @returns {*} The debounced value.
 */
import { useState, useEffect } from 'react';

const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel the timer if value changes before delay expires
    // This is the key mechanism — each new keystroke cancels the previous timer
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
