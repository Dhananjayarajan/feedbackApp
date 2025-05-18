const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/create-checkout-session', requireLogin, async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: '$5 for 5 email credits',
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: req.user.email, 
      success_url: `${process.env.REDIRECT_DOMAIN}/surveys?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.REDIRECT_DOMAIN}/surveys`,
      metadata: {
        googleId: req.user.googleId, 
      },
    });

    res.send({ id: session.id });
  });
};
