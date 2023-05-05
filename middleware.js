const logger = require('./logger');

module.exports = {
  checkAPIKey: function checkAPIKey(req, res, next) {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey !== 'my-secret-key') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  },
  logRequests: function logRequests(req, _, next) {
    logger.info({ message: 'Request received', method: req.method, url: req.url, headers: req.headers });
    next();
  }
}
