import jwt from 'jsonwebtoken';
import ResponseTemplate from '../templates/response';
import configServer from '../../../config';
import User from '../../models/user';
import { logger } from '../../../log';

const ValidAuthToken = (req, res, next) => {
  const token = (req.headers.authorization).split(' ')[1];
  if (token) {
    jwt.verify(token, configServer.app.WEB_TOKEN_SECRET, (err, decodedUser) => {
      if (err) {
        logger.error(err);
        res.status(401).json(ResponseTemplate.authError());
      } else {
        User.findById(decodedUser.user._id, (error, user) => {
          if (error) {
            res.status(401).json(ResponseTemplate.authError());
          } else {
            req.user = user;
            next();
          }
        });
      }
    });
  } else {
    res.status(401).json(ResponseTemplate.authError());
  }
};


export default ValidAuthToken;
