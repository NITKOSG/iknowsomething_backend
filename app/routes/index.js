const router = require('express').Router();

router.get('/', (req, res) => {
  // write code executed at homepage
  res.send('This is homepage');
});

module.exports = router;
