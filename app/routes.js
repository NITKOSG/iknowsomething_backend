import user from './routes/user/user';
import blog from './routes/blog/blog';
import auth from './routes/auth';

const router = (app) => {
  app.use('/users', user);
  app.use('/blog', blog);
  app.use('/auth', auth);
};

export default router;
