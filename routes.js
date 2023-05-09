module.exports = async function (fastify, opts) {

  fastify.get('/properties/:id', async (req, res) => {
    // now we have access to req.log['info', 'error', 'warn', 'debug'] methods in all routes
    // simply because of fastify's encapsulation
    const property = await fastify.db.get('properties').getById(req.params.id).value()
    if (!property) {
      res.code(404)
      return { message: 'Property not found' }
    }
    return property
  })

  fastify.post('/properties', async (req, res) => {
    const newProperty = await fastify.db.get('properties').insert(req.body).write()
    res.code(201)
    return newProperty
  })

  fastify.patch('/properties/:id', async (req, res) => {
    const updatedProperty = await fastify.db.get('properties').updateById(req.params.id, req.body).write()
    if (!updatedProperty) {
      res.code(404)
      return { message: 'Property not found' }
    }
    return updatedProperty
  })
}
