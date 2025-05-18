const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./models/user');
require('./services/passport');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURL);

const app = express();


app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    next(); 
  } else {
    bodyParser.json()(req, res, next); // 
  }
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/stripeWebhook')(app); // 
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.resolve(__dirname, 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
