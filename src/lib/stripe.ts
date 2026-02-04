import { loadStripe } from '@stripe/stripe-js';

// Stripe publishable key - this is a public key and safe to expose
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = stripePublishableKey 
  ? loadStripe(stripePublishableKey) 
  : null;

export const isStripeConfigured = !!stripePublishableKey;
