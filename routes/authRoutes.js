const passport = require('passport');

module.exports = (app) => {
  const redirectDomain = process.env.REDIRECT_DOMAIN || 'http://localhost:5173';

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect(`${redirectDomain}/surveys`);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect(`${redirectDomain}`);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
