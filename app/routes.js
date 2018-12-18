import auth from './routes/auth/auth';
import user from './routes/user/user';
import blog from './routes/blog/blog';
import ValidAuthToken from './global/middlewares/ValidAuthToken';

const router = (app) => {
  app.use('/auth', auth);
  app.use('/users', user);
  app.use('/blog', ValidAuthToken, blog);
};

export default router;
