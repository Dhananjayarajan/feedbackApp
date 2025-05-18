const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        keys.stripeWebhookSecret
      );
    } catch (err) {
      console.error('Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const googleId = session.metadata.googleId;

      if (!googleId) return res.status(400).send('Missing googleId in metadata');

      try {
        const user = await User.findOne({ googleId });
        if (user) {
          user.credits += 5;
          await user.save();
        } else {
          console.error('User not found');
        }
      } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
      }
    }

    res.status(200).send({});
  });
};
