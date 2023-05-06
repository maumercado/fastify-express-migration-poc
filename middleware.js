
module.exports = {
  checkAPIKey: function checkAPIKey (req, res, next) {
    const apiKey = req.header('x-api-key')
    if (!apiKey || apiKey !== 'my-secret-key') {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    next()
  }
}
