const router = require('express').Router();
const passport = require('passport');

// login
router.get('/login', (req, res) => {
  //code executed at login
  res.send(
    'This is Login (for the time being), For connecting to FB please visit /auth/login/facebook'
  );
});

// logout
router.get('/logout', (req, res) => {
  //code executed at logout
  req.logout();
  console.log('user has logged out');
  res.redirect('/');
});

// FB auth
router.get(
  '/login/facebook',
  passport.authenticate('facebook', {
    scope: ['profile', 'email']
  }),
  () => {
    console.log('connecting to facebook');
  }
);

// FB callback
router.get('/login/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  console.log('User has logged out');
  res.redirect('/dashboard');
});

module.exports = router;
