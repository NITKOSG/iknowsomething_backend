import index from './app/routes/index';
import dashboard from './app/routes/dashboard';
import auth from './app/routes/auth';

const router = (app) => {
  app.use('/', index);
  app.use('/dashboard', dashboard);
  app.use('/auth', auth);
};

export default router;
