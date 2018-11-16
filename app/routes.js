import auth from './auth';

const router = (app) => {
  app.use('/auth', auth);
};

export default router;
