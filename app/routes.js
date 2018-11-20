import auth from './routes/auth/auth';
import user from './routes/user/user';
import blog from './routes/blog/blog';

const router = (app) => {
  app.use('/auth', auth);
  app.use('/users', user);
  app.use('/blog', blog);
};

export default router;
