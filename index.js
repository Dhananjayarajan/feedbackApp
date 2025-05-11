const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./models/user')
require('./services/passport')
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURL);

const app = express();

app.use(
	cookieSession({
		maxAge : 30 * 24 * 60 * 60 * 1000,
		keys : [keys.cookieKey]
	})
)

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5005;

app.listen(PORT);