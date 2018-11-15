import express from 'express';
import passport from 'passport';

router = express.Router();

// login
router.get('/login', (req, res) => {
  // code executed at login
  res.send(
    'This is Login (for the time being), For connecting to FB please visit /auth/login/facebook, For connecting to google please visit /auth/login/google'
  );
});

// logout
router.get('/logout', (req, res) => {
  // code executed at logout
  req.logout();
  console.log('user has logged out');
  res.redirect('/');
});

// FB auth
router.get('/login/facebook', passport.authenticate('facebook', {
  scope: ['profile', 'email'],
}),
() => {
  console.log('connecting to facebook');
});

// Google auth
router.get('/login/google', passport.authenticate('google', {
  scope: ['profile'],
}),
() => {
  console.log('connecting to google');
});

// FB callback
router.get('/login/facebook/redirect',passport.authenticate('facebook'),(req, res) => {
  console.log('User data retrieved from facebook');
  res.redirect('/dashboard');
});

// Google callback
router.get('/login/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log('User data retrieved from google');
  res.redirect('/dashboard');
});

export default router;
