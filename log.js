import winston from 'winston';
import fs from 'fs';
import 'winston-daily-rotate-file';

// log directory based on environment
let logDir = 'devLog';
if (process.env.NODE_ENV === 'prod') {
  logDir = 'prodLog';
} else if (process.env.NODE_ENV === 'staging') {
  logDir = 'stagLog';
} else if (process.env.NODE_ENV === 'dev') {
  logDir = 'devLog';
}

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date().toLocaleTimeString());
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      timestamp: tsFormat,
      // handleExceptions: true,
      // json: true,
      prettyPrint: true,
      colorize: true,
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: `${logDir}/info-logs/-results.log`,
      timestamp: new Date().toLocaleTimeString(),
      datePattern: 'DD-MM-YYYY',
      json: true,
      prettyPrint: true,
      prepend: true,
      eol: '\n\n',
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      name: 'error',
      filename: `${logDir}/error-logs/-results.log`,
      timestamp: tsFormat(),
      datePattern: 'DD-MM-YYYY',
      json: false,
      handleExceptions: false,
      eol: '\n\n\n',
    }),
  ],
  exitOnError: false,
});

const stream = {
  write: (message) => {
    logger.info(message);
  },
};

export {
  logger,
  stream,
};
