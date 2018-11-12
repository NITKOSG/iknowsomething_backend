const router = require('express').Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    // User is not logged in
    res.redirect('/auth/login');
  } else {
    // User has logged in
    next();
  }
};

router.get('/', /*authCheck after passing user in dashboard.ejs*/, (req, res) => {
  // code executed at dashboard
  res.send('This is dashboard page');
});

module.exports = router;
