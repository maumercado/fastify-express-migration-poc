const fp = require('fastify-plugin')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodashId = require('lodash-id')

module.exports = fp(async function (fastify, opts) {
  // Set up the database
  const adapter = new FileSync(opts.filename || '../db.json')
  const db = low(adapter)
  db._.mixin(lodashId)
  fastify.decorate('db', db)
})
