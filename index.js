const fastifyExpress = require('@fastify/express')
const express = require('express')
const routes = require('./routes')

const middleware = require('./middleware')

async function createServer () {
  const fastify = require('fastify')({
    logger: process.env.NODE_ENV !== 'test'
  })
  await fastify.register(fastifyExpress)

  // Middleware example for checking API key
  await fastify.use(express.json())
  await fastify.use(middleware.checkAPIKey)
  fastify.express.disabled('x-powered-by') // true

  await fastify.use('/api', routes)
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
