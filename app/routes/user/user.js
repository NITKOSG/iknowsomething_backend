import express from 'express';
import jwt from 'jsonwebtoken';
import async from 'async';
import {
  logger,
} from '../../../log';
import User from '../../models/user';
import ResponseTemplate from '../../global/templates/response';

const router = express.Router();

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      logger.error(err);
      res.status(401).json(ResponseTemplate.error(401, err));
    } else {
      res.json(ResponseTemplate.success('success', { users }));
    }
  });
});

router.get('/:id', (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      logger.error(err);
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        data: {
          user,
        },
      });
    }
  });
});

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, (err) => {
    if (err) {
      logger.error(err);
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        msg: 'user updated successfully.',
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      logger.error(err);
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        msg: 'user deleted successfully.',
      });
    }
  });
});

export default router;
