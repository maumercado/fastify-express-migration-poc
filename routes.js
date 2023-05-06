const asyncHandler = require('express-async-handler')
const express = require('express')
const db = require('./database')

const router = express.Router()

router.get('/properties/:id', async (req, res) => {
  // now we have access to req.log['info', 'error', 'warn', 'debug'] methods in all routes
  // simply because of fastify's encapsulation
  const property = await db.get('properties').getById(req.params.id).value()
  if (!property) {
    return res.status(404).json({ message: 'Property not found' })
  }
  res.json(property)
})

router.post('/properties', asyncHandler(async (req, res) => {
  const newProperty = await db.get('properties').insert(req.body).write()
  res.status(201).json(newProperty)
}))

router.patch('/properties/:id', asyncHandler(async (req, res) => {
  const updatedProperty = await db.get('properties').updateById(req.params.id, req.body).write()
  if (!updatedProperty) {
    return res.status(404).json({ message: 'Property not found' })
  }
  res.json(updatedProperty)
}))

module.exports = router
