import express from 'express';
import config from './config';
import MongoConnect from './app/mongoose';
import AppRoutes from './app/routes';
import middleware from './app/middleware';

const app = express();
// ---------------------------------------------//
// invoke routes, Middleware, Mongo connect here
MongoConnect();
middleware(app);
AppRoutes(app);

// ---------------------------------------------//
app.listen(config.app.PORT);
console.log(`app running on ${config.app.PORT}`);

export default app;
