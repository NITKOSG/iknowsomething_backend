import ResponseTemplate from '../templates/response';

const EmptyContent = (req, res, next) => {
  if (req.method === 'POST' && Object.keys(req.body).length === 0) {
    res.json(ResponseTemplate.emptyContent());
  } else {
    next();
  }
};


export default EmptyContent;
