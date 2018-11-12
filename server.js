import express from 'express';
import config from './config';
import MongoConnect from './app/mongoose';
import AppRoutes from './app/routes';
import { middleware } from './app/middleware';

const cookieSession = require('cookie-session');
const keys = require('./keys');
const indexRouter = require('./app/routes/index');
const authRouter = require('./app/routes/auth');
const dashboardRouter = require('./app/routes/dashboard');
const passportSetup_fb = require('./app/auth/passport-fb-setup');

addPath(__dirname);

const app = express();
// ---------------------------------------------//
// invoke routes, MIddleware, Mongo connect here
MongoConnect();
middleware(app);
AppRoutes(app);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKeys]
  })
);

app.get('/', indexRouter);
app.get('/auth', authRouter);
app.get('/dashboard', dashboardRouter);

// ---------------------------------------------//
app.listen(config.app.PORT);
console.log(`app running on ${config.app.PORT}`);

export default app;
