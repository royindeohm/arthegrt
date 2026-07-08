/**
 * Formatting Utilities
 * 
 * Pure functions for display formatting. Keeping these separate
 * from components ensures they can be unit-tested in isolation
 * and reused across the entire application.
 */

/**
 * Formats a number as a US dollar currency string.
 * Uses Intl.NumberFormat for locale-aware formatting.
 * 
 * @param {number} amount — The dollar amount.
 * @returns {string} Formatted string like "$1,299.99".
 */
export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Generates a fake order ID for the success page.
 * Format: ORD-XXXXXXXX (8 random uppercase hex characters).
 * 
 * @returns {string} A pseudo-random order ID string.
 */
export const generateOrderId = () => {
  const hex = Math.random().toString(16).substring(2, 10).toUpperCase();
  return `ORD-${hex}`;
};

/**
 * Returns the stock status label and variant for a product.
 * 
 * @param {number} stock — The stock count.
 * @returns {{ label: string, variant: string }} Status info.
 */
export const getStockStatus = (stock) => {
  if (stock === 0) {
    return { label: 'Out of Stock', variant: 'out-of-stock' };
  }
  if (stock <= 10) {
    return { label: `Only ${stock} left`, variant: 'low-stock' };
  }
  return { label: 'In Stock', variant: 'in-stock' };
};

/**
 * Truncates a string to a maximum length with ellipsis.
 * 
 * @param {string} str — The string to truncate.
 * @param {number} maxLength — Maximum character count.
 * @returns {string} Truncated string.
 */
export const truncate = (str, maxLength = 100) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength).trim() + '…';
};
