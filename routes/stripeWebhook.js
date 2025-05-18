const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    let event;

    console.log('Received webhook event');

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        keys.stripeWebhookSecret
      );
      console.log('Stripe webhook signature verified successfully');
    } catch (err) {
      console.error('Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const googleId = session.metadata.googleId;

      console.log('Checkout session completed event received');
      console.log('Session metadata:', session.metadata);

      if (!googleId) {
        console.error('Missing googleId in session metadata');
        return res.status(400).send('Missing googleId in metadata');
      }

      try {
        const user = await User.findOne({ googleId });
        console.log('User fetched from DB:', user);

        if (user) {
          console.log(`Current credits: ${user.credits}`);
          user.credits += 5;
          await user.save();
          console.log(`Credits updated to: ${user.credits}`);
        } else {
          console.error('User not found with googleId:', googleId);
        }
      } catch (err) {
        console.error('Error fetching or updating user:', err);
        return res.status(500).send('Internal server error');
      }
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send({});
  });
};
