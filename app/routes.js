import index from './routes/index';
import dashboard from './routes/dashboard';
import auth from './routes/auth';

const router = (app) => {
  app.use('/', index);
  app.use('/dashboard', dashboard);
  app.use('/auth', auth);
};

export default router;
