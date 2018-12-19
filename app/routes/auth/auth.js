import express from 'express';
import async from 'async';
import jwt from 'jsonwebtoken';
import {
  logger,
} from '../../../log';
import authController from './authController';
import googleAuth from './googleLogin';
import User from '../../models/user';
import config from '../../../config';
import ResponseTemplate from '../../global/templates/response';

const router = express.Router();

router.post('/login', (req, res) => {
  const loginData = req.body;
  const tasks = [

    // Verifying token of the user
    (callback) => {
      googleAuth.verify(loginData, (err, user) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        return callback(null, user);
      });
    },

    (user, callback) => {
      if (user.email.split('@')[1] !== 'nitkkr.ac.in' && config.app.nitkkr_domain_email) {
        return callback('Use NIT KKR domain email only', null);
      }
      return callback(null, user);
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
          if (config.app.nitkkr_domain_email) {
            // eslint-disable-next-line
            user.rollNo = user.email.split('@')[0].split('_')[1];
          }
          authController.createUser(user, (err1, newUser) => {
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

router.post('/onboard', (req, res) => {
  jwt.verify(req.body.data.token, config.app.WEB_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.json(ResponseTemplate.error(401, 'Invalid User'));
    } else if (decoded.user.onboard) {
      res.json(ResponseTemplate.success('You have been boarded before.'));
    } else {
      User.findByIdAndUpdate(decoded.user._id, {
        $set: {
          name: `${req.body.data.firstName} ${req.body.data.lastName}`,
          onboard: true,
          username: req.body.data.username,
          phone: req.body.data.number,
          branch: req.body.data.branch.split('_')[1],
          course: req.body.data.branch.split('_')[0],
        },
      }, { new: true }, (error, modifiedUser) => {
        if (error) {
          res.json(ResponseTemplate.error(401, 'Some error occurred while onboarding'));
        }
        const token = jwt.sign({
          user: modifiedUser,
        }, config.app.WEB_TOKEN_SECRET, {
          expiresIn: config.app.jwt_expiry_time,
        });
        res.json(ResponseTemplate.success('On boarded successfully', {
          token,
        }));
      });
    }
  });
});

export default router;
