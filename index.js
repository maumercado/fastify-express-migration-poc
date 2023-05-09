const routes = require('./routes')
const db = require('./database')

const middleware = require('./middleware')

async function createServer () {
  const fastify = require('fastify')({
    logger: process.env.NODE_ENV !== 'test'
  })

  await fastify.register(db, {
    filename: './db.json',
  })

  // Middleware example for checking API key
  fastify.register(middleware)

  fastify.register(routes, { prefix: '/api' })
  // Start the server
  const port = process.env.PORT || 3000
  try {
    await fastify.listen({ port })
    fastify.log.info(`Server started on port ${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  return fastify
}

if (require.main === module) {
  createServer()
} else {
  module.exports = createServer
}
