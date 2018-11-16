import express from 'express';
import async from 'async';
import {
  logger,
} from '../../../log';
import Blog from '../../models/blog';

const router = express.Router();

router.get('/', (req, res) => {
  Blog.find({}, (err, blogs) => {
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
          blogs,
        },
      });
    }
  });
});

router.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog.save((err) => {
    if (err) {
      logger.error(err);
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        msg: 'Blog created successfully',
      });
    }
  });
});

router.get('/:id', (req, res) => {
  Blog.find({}, (err, blog) => {
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
  Blog.findByIdAndUpdate(req.params.id, (err) => {
    if (err) {
      logger.error(err);
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        msg: 'blog updated successfully.',
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
