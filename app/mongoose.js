import mongoose from 'mongoose';
import configDatabase from '../config';

mongoose.Promise = global.Promise;

const MongoConnect = () => {
  const options = { keepAlive: 300000, connectTimeoutMS: 30000, useNewUrlParser: true };
  const db = mongoose.connect(configDatabase.db.url, options, (error) => {
    if (error) {
      console.log(`Mongoose default connection error: ${error}`);
    } else {
      console.log('mongo Connected :)');
    }
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  global.db = db;
  return db;
};

export default MongoConnect;
