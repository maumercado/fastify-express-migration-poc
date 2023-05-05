const express = require('express');

const logger = require('./logger');
const middleware = require('./middleware');
const router = require('./routes');

// Create the Express app
const createServer = () => {

  const app = express();
  app.use(express.json());

  // Middleware for logging requests
  app.use(middleware.logRequests);

  // Middleware example for checking API key
  app.use(middleware.checkAPIKey);

  app.use('/api', router);

  // Start the server
  const port = process.env.PORT || 3000;
  return app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
  });
}

module.exports = createServer();
