// import React, {Component} from 'react'
// import StripeCheckOUT from 'react-stripe-checkout'
// import {connect} from 'react-redux'
// import * as actions from '../actions'

// class Payments extends Component {
// 	render() {
// 		return (
// 			<div>
// 				<StripeCheckOUT name='Feedback APP'
// 				description='$5 for 5 email credits'
// 				amount={500} token={token => this.props.handleToken(token)} stripeKey={import.meta.env.VITE_APP_STRIPE_KEY}>
// 					<button className='btn black'>Add Credits</button>
// 				</StripeCheckOUT>
// 			</div>
// 		)
// 	}

// }

// export default connect(null, actions)(Payments) 


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
