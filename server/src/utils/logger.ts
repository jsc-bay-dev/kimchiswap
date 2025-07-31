import winston from 'winston'; // logger to log the errors

// log format to log the errors
const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

// create a logger to log the errors
export const logger = winston.createLogger({
    level: process.env['LOG_LEVEL'] || 'info',
    format: logFormat,
    defaultMeta: { service: 'kimchiswap-backend' },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  });

  // if the environment is not production, log the errors to the console
  if (process.env['NODE_ENV'] !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }));
  }