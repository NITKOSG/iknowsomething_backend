import config from '../../../config';
import http from '../../helper/httpFunc';
import {
  logger,
} from '../../../log';

const verify = (loginInfo, callback) => {
  http.httpGet(`${config.api.google}${loginInfo.token}`, (err, res) => {
    if (err) {
      logger.error(err);
      return callback(err, null);
    }
    return callback(null, res);
  });
};

export default { verify };
