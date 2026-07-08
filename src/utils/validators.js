/**
 * Validation Utilities
 * 
 * Pure functions for form validation. Each validator returns an error message
 * string if invalid, or an empty string if valid. This pattern makes it
 * trivial to compose validators and display per-field error messages.
 */

/**
 * Validates that a field is not empty after trimming whitespace.
 * @param {string} value — The field value.
 * @param {string} fieldName — Human-readable field name for the error message.
 * @returns {string} Error message or empty string.
 */
export const validateRequired = (value, fieldName) => {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }
  return '';
};

/**
 * Validates email format using a RFC 5322-inspired regex.
 * Note: Perfect email validation is impossible with regex alone, but this
 * catches the vast majority of user input errors.
 * 
 * @param {string} email — The email string to validate.
 * @returns {string} Error message or empty string.
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email is required';
  }

  // Standard email regex: local@domain.tld
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return '';
};

/**
 * Validates phone number — must be exactly 10 digits.
 * Strips non-digit characters before checking length.
 * 
 * @param {string} phone — The phone number string.
 * @returns {string} Error message or empty string.
 */
export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return 'Phone number is required';
  }

  // Strip all non-digit characters (spaces, dashes, parentheses)
  const digits = phone.replace(/\D/g, '');

  if (digits.length !== 10) {
    return 'Phone number must be exactly 10 digits';
  }
  return '';
};

/**
 * Validates the entire checkout form.
 * Returns an object mapping field names to error messages.
 * 
 * @param {Object} formData — The form field values.
 * @returns {Object} Errors object — empty strings mean the field is valid.
 */
export const validateCheckoutForm = (formData) => {
  const errors = {};

  errors.fullName = validateRequired(formData.fullName, 'Full name');
  errors.email = validateEmail(formData.email);
  errors.phone = validatePhone(formData.phone);
  errors.address = validateRequired(formData.address, 'Address');
  errors.city = validateRequired(formData.city, 'City');
  errors.postalCode = validateRequired(formData.postalCode, 'Postal code');
  errors.country = validateRequired(formData.country, 'Country');

  return errors;
};

/**
 * Checks if any error exists in a validation result object.
 * @param {Object} errors — Errors object from validateCheckoutForm.
 * @returns {boolean} True if at least one field has an error.
 */
export const hasErrors = (errors) => {
  return Object.values(errors).some((error) => error !== '');
};
