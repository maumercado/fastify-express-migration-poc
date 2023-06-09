const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodashId = require('lodash-id')
// Set up the database
const adapter = new FileSync('db.json')
const db = low(adapter)
db._.mixin(lodashId)

module.exports = db
