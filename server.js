import express from 'express';
import path from 'path';
import config from './config';
import swagger from './app/swagger';
import MongoConnect from './app/mongoose';
import AppRoutes from './app/routes';
import middleware from './app/middleware';

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
// ---------------------------------------------//
// invoke routes, Middleware, Mongo connect here
if (process.env.GEN_DOC === 'true') {
  swagger(app);
}
MongoConnect();
middleware(app);
AppRoutes(app);
// ---------------------------------------------//
app.listen(config.app.PORT);
console.log(`app running on ${config.app.PORT}`);

export default app;
