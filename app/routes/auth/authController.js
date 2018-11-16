import User from '../../models/user';
import { logger } from '../../../log';

const createUser = (user, callback) => {
  const userData = new User(user);
  userData.save((err, response) => {
    if (err) {
      logger.error(err);
      return callback(err, null);
    }
    return callback(null, response);
  });
};

export default {
  createUser,
};
