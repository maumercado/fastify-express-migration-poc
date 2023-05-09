const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.addHook('preHandler', (req, reply, done) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== 'my-secret-key') {
      reply.code(401)
      return { message: 'Unauthorized' }
    }
    done()
  })
})
