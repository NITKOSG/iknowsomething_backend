import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  // write code executed at homepage
  res.send('This is homepage');
});

export default router;
