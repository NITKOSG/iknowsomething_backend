import express from 'express';
import async from 'async';
import jwt from 'jsonwebtoken';
import {
  logger,
} from '../../../log';
import authController from './authController';
import googleAuth from './googleLogin';
import facebookAuth from './facebookLogin';
import User from '../../models/user';
import config from '../../../config';
import ResponseTemplate from '../../global/templates/response';

const router = express.Router();

router.post('/login', (req, res) => {
  const loginData = req.body;
  const tasks = [

    // Verifying token of the user
    (callback) => {
      if (loginData.provider === 'google') {
        googleAuth.verify(loginData, (err, user) => {
          if (err) {
            logger.error(err);
            return callback(err, null);
          }
          return callback(null, user);
        });
      } else if (loginData.provider === 'facebook') {
        facebookAuth.verify(loginData, (err, user) => {
          if (err) {
            logger.error(err);
            return callback(err, null);
          }
          return callback(null, user);
        });
      } else {
        return callback('provider not given', null);
      }
    },

    // Checking the user in database amd further processing
    (user, callback) => {
      User.findOne({
        email: user.email,
      }, (err, usr) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        if (!usr) {
          authController.createUser(usr, (err1, newUser) => {
            if (err1) {
              logger.error(err1);
              return callback(err1, null);
            }
            return callback(null, newUser);
          });
        } else {
          return callback(null, usr);
        }
      });
    },

    // Generating the jwt token
    (user, callback) => {
      // req.session.email = user.email;
      const token = jwt.sign({
        user,
      }, config.app.WEB_TOKEN_SECRET, {
        expiresIn: config.app.jwt_expiry_time,
      });

      return callback(null, token);
    },
  ];

  async.waterfall(tasks, (err, response) => {
    if (err) {
      res.status(401).json(ResponseTemplate.error(401, err));
    } else {
      res.status(200).json(ResponseTemplate.success('successfully logged in', {
        token: response,
      }));
    }
  });
});

export default router;
