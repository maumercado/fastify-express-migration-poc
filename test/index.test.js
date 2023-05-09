const tap = require('tap')
const request = require('supertest')
const app = require('../') // Import the Express app

// Close the server when the tests are done
tap.teardown(() => {
  app.close()
})

// Test GET /api/properties/:id route
tap.test('GET /api/properties/:id', async (t) => {
  const res = await request(app)
    .get('/api/properties/1')
    .set('x-api-key', 'my-secret-key')

  t.equal(res.statusCode, 200, 'Status code should be 200')
  t.same(res.body, { id: '1', name: 'Sample Property', address: '123 Main St' }, 'Response should match expected value')
})

// Test POST /api/properties route
tap.test('POST /api/properties', async (t) => {
  const newProperty = { name: 'New Property', address: '456 Second St' }
  const res = await request(app)
    .post('/api/properties')
    .set('x-api-key', 'my-secret-key')
    .send(newProperty)

  t.equal(res.statusCode, 201, 'Status code should be 201')
  t.match(res.body, { id: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, ...newProperty }, 'Response should match expected value')
})

// Test PATCH /api/properties/:id route
tap.test('PATCH /api/properties/:id', async (t) => {
  const newProperty = { name: 'New Property', address: '456 Second St' }
  const resPost = await request(app)
    .post('/api/properties')
    .set('x-api-key', 'my-secret-key')
    .send(newProperty)

  const updatedProperty = { name: 'Updated Property', address: '789 Third St' }
  const res = await request(app)
    .patch(`/api/properties/${resPost.body.id}`)
    .set('x-api-key', 'my-secret-key')
    .send(updatedProperty)

  t.equal(res.statusCode, 200, 'Status code should be 200')
  t.same(res.body, { id: resPost.body.id, ...updatedProperty }, 'Response should match expected value')
})
