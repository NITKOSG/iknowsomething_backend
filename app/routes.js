import user from './routes/user/user';
import blog from './routes/blog/blog';

const router = (app) => {
  app.use('/users', user);
  app.use('/blog', blog);
};

export default router;
