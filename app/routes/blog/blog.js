import express from 'express';
import async from 'async';
import {
  logger,
} from '../../../log';
import Blog from '../../models/blog';

const router = express.Router();

router.get('/', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      logger.err(err);
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        data: {
          blogs,
        },
      });
    }
  });
});

export default router;
