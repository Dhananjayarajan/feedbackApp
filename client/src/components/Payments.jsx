import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY); // Your publishable key

const Payments = () => {
  const handleClick = async () => {
    const stripe = await stripePromise;
    
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const session = await res.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <button onClick={handleClick} className="btn black">
      Add Credits
    </button>
  );
};

export default Payments;
