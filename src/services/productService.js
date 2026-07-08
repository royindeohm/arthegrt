/**
 * Product Service — Mock API Layer
 * 
 * Simulates real API calls using Promises with deliberate delays.
 * This abstraction means the rest of the app is structured exactly
 * as if it were consuming a real REST API, making it trivial to
 * swap in a real backend later.
 * 
 * The 2500ms delay matches the specification requirement and
 * triggers skeleton loading states in the UI.
 */

import products from '../data/products';

/** Simulated network latency in milliseconds */
const MOCK_DELAY = 2500;

/**
 * Fetches all products after a simulated network delay.
 * 
 * @returns {Promise<Array>} Resolves with the full product array.
 *          Rejects if an unexpected error occurs (defensive pattern).
 */
export const fetchMockProducts = () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve([...products]); // Return a shallow copy to prevent external mutations
      }, MOCK_DELAY);
    } catch (error) {
      reject(new Error('Failed to fetch products. Please try again later.'));
    }
  });
};

/**
 * Fetches a single product by ID.
 * 
 * @param {number|string} id — The product ID to look up.
 * @returns {Promise<Object>} Resolves with the product object,
 *          or rejects if the product is not found.
 */
export const fetchProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === Number(id));

      if (product) {
        resolve({ ...product }); // Return a copy to prevent mutations
      } else {
        reject(new Error(`Product with ID ${id} not found.`));
      }
    }, 800); // Shorter delay for single-item fetches (better UX)
  });
};
