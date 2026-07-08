import { useState } from 'react';
import { validateCheckoutForm, hasErrors } from '../../utils/validators';

const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'United States',
};

const CheckoutForm = ({ isProcessing, onSubmit }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldErrors = validateCheckoutForm({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldErrors = validateCheckoutForm(formData);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    const validationErrors = validateCheckoutForm(formData);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      const firstErrorField = Object.keys(validationErrors).find(
        (key) => validationErrors[key]
      );
      if (firstErrorField) {
        const input = document.getElementById(firstErrorField);
        if (input) input.focus();
      }
      return;
    }

    onSubmit(formData);
  };

  return (
    <form className="bg-surface-container-lowest border-4 border-on-surface p-6 shadow-[6px_6px_0px_0px_rgba(38,24,28,1)]" onSubmit={handleSubmit} noValidate>
      <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-6 uppercase">Shipping Address</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 relative form-floating">
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={`block w-full px-3 pt-5 pb-2 text-sm text-on-surface bg-surface-container-lowest border-2 transition-all duration-300 peer placeholder-transparent ${
              errors.fullName
                ? 'border-error focus:outline-none focus:border-error'
                : 'border-on-surface focus:outline-none focus:border-secondary-container'
            }`}
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isProcessing}
            required
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          <label
            htmlFor="fullName"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant transition-all duration-200 pointer-events-none"
          >
            Full Name
          </label>
          {errors.fullName && (
            <span id="fullName-error" className="text-error text-xs mt-1 flex items-center gap-1" role="alert">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              {errors.fullName}
            </span>
          )}
        </div>

        <div className="relative form-floating">
          <input
            type="email"
            id="email"
            name="email"
            className={`block w-full px-3 pt-5 pb-2 text-sm text-on-surface bg-surface-container-lowest border-2 transition-all duration-300 peer placeholder-transparent ${
              errors.email
                ? 'border-error focus:outline-none focus:border-error'
                : 'border-on-surface focus:outline-none focus:border-secondary-container'
            }`}
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isProcessing}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant transition-all duration-200 pointer-events-none"
          >
            Email Address
          </label>
          {errors.email && (
            <span id="email-error" className="text-error text-xs mt-1 flex items-center gap-1" role="alert">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              {errors.email}
            </span>
          )}
        </div>

        <div className="relative form-floating">
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`block w-full px-3 pt-5 pb-2 text-sm text-on-surface bg-surface-container-lowest border-2 transition-all duration-300 peer placeholder-transparent ${
              errors.phone
                ? 'border-error focus:outline-none focus:border-error'
                : 'border-on-surface focus:outline-none focus:border-secondary-container'
            }`}
            placeholder="1234567890"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isProcessing}
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          <label
            htmlFor="phone"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant transition-all duration-200 pointer-events-none"
          >
            Phone Number
          </label>
          {errors.phone && (
            <span id="phone-error" className="text-error text-xs mt-1 flex items-center gap-1" role="alert">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              {errors.phone}
            </span>
          )}
        </div>

        <div className="sm:col-span-2 relative form-floating">
          <input
            type="text"
            id="address"
            name="address"
            className={`block w-full px-3 pt-5 pb-2 text-sm text-on-surface bg-surface-container-lowest border-2 transition-all duration-300 peer placeholder-transparent ${
              errors.address
                ? 'border-error focus:outline-none focus:border-error'
                : 'border-on-surface focus:outline-none focus:border-secondary-container'
            }`}
            placeholder="123 Main St, Apt 4B"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isProcessing}
            required
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? 'address-error' : undefined}
          />
          <label
            htmlFor="address"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant transition-all duration-200 pointer-events-none"
          >
            Street Address
          </label>
          {errors.address && (
            <span id="address-error" className="text-error text-xs mt-1 flex items-center gap-1" role="alert">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              {errors.address}
            </span>
          )}
        </div>

        <div className="relative form-floating">
          <input
            type="text"
            id="city"
            name="city"
            className={`block w-full px-3 pt-5 pb-2 text-sm text-on-surface bg-surface-container-lowest border-2 transition-all duration-300 peer placeholder-transparent ${
              errors.city
                ? 'border-error focus:outline-none focus:border-error'
                : 'border-on-surface focus:outline-none focus:border-secondary-container'
            }`}
            placeholder="New York"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isProcessing}
            required
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? 'city-error' : undefined}
          />
          <label
            htmlFor="city"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant transition-all duration-200 pointer-events-none"
          >
            City
          </label>
          {errors.city && (
            <span id="city-error" className="text-error text-xs mt-1 flex items-center gap-1" role="alert">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              {errors.city}
            </span>
          )}
        </div>

        <div className="relative form-floating">
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            className={`block w-full px-3 pt-5 pb-2 text-sm text-on-surface bg-surface-container-lowest border-2 transition-all duration-300 peer placeholder-transparent ${
              errors.postalCode
                ? 'border-error focus:outline-none focus:border-error'
                : 'border-on-surface focus:outline-none focus:border-secondary-container'
            }`}
            placeholder="10001"
            value={formData.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isProcessing}
            required
            aria-invalid={!!errors.postalCode}
            aria-describedby={errors.postalCode ? 'postalCode-error' : undefined}
          />
          <label
            htmlFor="postalCode"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant transition-all duration-200 pointer-events-none"
          >
            Postal / ZIP Code
          </label>
          {errors.postalCode && (
            <span id="postalCode-error" className="text-error text-xs mt-1 flex items-center gap-1" role="alert">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              {errors.postalCode}
            </span>
          )}
        </div>

        <div className="sm:col-span-2 relative form-floating">
          <select
            id="country"
            name="country"
            className="block w-full px-3 pt-5 pb-2 text-sm text-on-surface bg-surface-container-lowest border-2 border-on-surface focus:outline-none focus:border-secondary-container transition-all duration-300"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isProcessing}
            required
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
          </select>
          <label
            htmlFor="country"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant transition-all duration-200 pointer-events-none"
          >
            Country
          </label>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-primary-container text-on-primary-container border-2 border-on-surface font-headline-sm uppercase text-base font-bold py-3 px-6 hover:bg-primary hover:text-on-primary transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 pixel-button-shadow"
          disabled={isProcessing}
          aria-label={isProcessing ? 'Processing order' : 'Place Order'}
        >
          {isProcessing ? (
            <>
              <span className="w-5 h-5 border-2 border-on-primary-container border-t-transparent rounded-full animate-spin" />
              Processing Order...
            </>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
