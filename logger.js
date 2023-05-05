const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() })
  ],
});

logger.transports.forEach((transport) => {
  if (transport) {
    transport.silent = process.env.NODE_ENV === 'test';
  }
});

module.exports = logger;
