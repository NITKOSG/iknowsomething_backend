import express from 'express';
import async from 'async';
import ResponseTemplate from '../../global/templates/response';
import {
  logger,
} from '../../../log';
import Blog from '../../models/blog';

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
});

router.get('/:id', (req, res) => {
  Blog.findById(req.params.id)
    .populate('userId')
    .populate('comments.userId')
    .exec((err, blog) => {
      if (err) {
        logger.error(err);
        res.json(ResponseTemplate.error('Some Error Occured'));
      } else {
        res.json(ResponseTemplate.success('Blog Fetched Successfully', { blog }));
      }
    });
});

router.post('/', (req, res) => {
  const {
    data,
  } = req.body;

  const blog = new Blog();
  blog.userId = req.user._id;
  blog.blogTitle = data.title;
  blog.blogContent = data.content;
  blog.save((error) => {
    if (error) {
      logger.error(error);
      res.json(ResponseTemplate.error(401, 'Some error occured while saving the blog'));
    } else {
      res.json(ResponseTemplate.success('Blog created Successfully'));
    }
  });
});

router.put('/:id', (req, res) => {
  const task = [
    (callback) => {
      Blog.findOneAndUpdate({ _id: req.params.id, 'likes.userId': req.user._id }, {
        $inc: {
          'likes.$.count': 1,
        },
      }, { new: true }, (err, result) => {
        if (err) {
          return callback(err, null);
        }
        if (result == null) {
          Blog.findByIdAndUpdate(req.params.id, {
            $push: {
              likes: {
                count: 1,
                userId: req.user._id,
              },
            },
          }, { new: true }, (error, newResult) => {
            if (error) {
              return callback(err, null);
            }
            return callback(null, newResult);
          });
        } else {
          return callback(null, result);
        }
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
      }, { new: true }, (err, result) => {
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
    } else if (req.query.action === 'LIKE') {
      res.json(ResponseTemplate.success('Content Liked', { result }));
    } else if (req.query.action === 'COMMENT') {
      res.json(ResponseTemplate.success('COMMENTED SUCCESSFULLY', { result }));
    } else {
      res.json(ResponseTemplate.success('Unknown action', null));
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
