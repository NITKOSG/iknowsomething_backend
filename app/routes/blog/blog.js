import express from 'express';
import jwt from 'jsonwebtoken';
import async from 'async';
import ResponseTemplate from '../../global/templates/response';
import {
  logger,
} from '../../../log';
import Blog from '../../models/blog';
import config from '../../../config';

const router = express.Router();

router.get('/', (req, res) => {
  const pageNo = req.query.page;
  const perPage = 10;
  Blog
    .find({})
    .skip((pageNo - 1) * perPage)
    .limit(perPage)
    .populate('userId')
    .exec((err, blogs) => {
      if (err) {
        logger.error(err);
        res.json(ResponseTemplate.error(401, 'Error while fetching the blogs'));
      } else {
        res.json(ResponseTemplate.success('Blog fetched successfully', {
          blogs,
        }));
      }
    });
  // Blog.find({}, null, { limit: perPage, skip: (pageNo - 1) * perPage }, (err, blogs) => {
  //   if (err) {
  //     logger.error(err);
  //     res.json(ResponseTemplate.error(401, 'Error while fetching the blogs'));
  //   } else {
  //     res.json(ResponseTemplate.success('Blog fetched successfully', { blogs }));
  //   }
  // });
});

router.post('/', (req, res) => {
  const {
    data,
  } = req.body;

  jwt.verify(data.token, config.app.WEB_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.json(ResponseTemplate.error(401, 'Invalid User'));
    } else {
      const blog = new Blog();
      blog.userId = decoded.user._id;
      blog.blogTitle = data.title;
      blog.blogContent = data.content;
      blog.save((error) => {
        if (error) {
          logger.error(err);
          res.json(ResponseTemplate.error(401, 'Some error occured while saving the blog'));
        } else {
          res.json(ResponseTemplate.success('Blog created Successfully'));
        }
      });
    }
  });
});

router.get('/:id', (req, res) => {
  Blog.findById(req.params.id)
    .populate('userId')
    .exec((err, blog) => {
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
            blog,
          },
        });
      }
    });
});

router.put('/:id', (req, res) => {
  console.log(req.user);
  const task = [
    (callback) => {
      Blog.findByIdAndUpdate(req.params.id, {
        $push: {
          likes: {
            userId: req.user._id,
          },
        },
      }, (err, result) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, result);
      });
    },
  ];

  const task1 = [
    (callback) => {
      Blog.findByIdAndUpdate(req.params.id, {
        $push: {
          comments: {
            content: req.body.commentContent,
            userId: req.user._id,
          },
        },
      }, (err, result) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, result);
      });
    },
  ];

  const taskDecide = (action) => {
    switch (action) {
      case 'LIKE':
        return task;
      case 'COMMENT':
        return task1;
      default:
        return null;
    }
  };

  async.waterfall(taskDecide(req.query.action), (err, result) => {
    if (err) {
      logger.error(err);
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        result,
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      logger.error(err);
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        msg: 'blog deleted successfully.',
      });
    }
  });
});

export default router;
