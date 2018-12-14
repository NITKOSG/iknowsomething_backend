import fetch from 'node-fetch';

const httpGet = (url, callback) => {
  fetch(url)
    .then(res => res.json())
    .then(json => callback(null, json))
    .catch(err => callback(err, null));
};

export default {
  httpGet,
};
