import express from 'express';
import jwt from 'jsonwebtoken';
import async from 'async';
import {
  logger,
} from '../../../log';
import User from '../../models/user';

const router = express.Router();

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
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
          users,
        },
      });
    }
  });
});

export default router;
