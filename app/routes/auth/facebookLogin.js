import config from '../../../config';
import http from '../../helper/httpFunc';
import {
  logger,
} from '../../../log';

const verify = (loginInfo, callback) => {
  http.httpGet(`${config.api.facebook}${loginInfo.token}`, (err, res) => {
    if (err) {
      logger.error(err);
      console.log(err);
      return callback(err, null);
    }
    res.picture = res.picture.data.url;
    return callback(null, res);
  });
};

export default { verify };
