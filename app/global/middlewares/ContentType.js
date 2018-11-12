import ResponseTemplate from '../templates/response';

const ContentType = (req, res, next) => {
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'];

    if (!contentType || contentType.indexOf('application/json') !== 0) {
      res.json(ResponseTemplate.invalidContentType());
    } else {
      next();
    }
  } else {
    next();
  }
};


export default ContentType;
