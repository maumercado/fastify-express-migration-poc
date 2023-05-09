const tap = require('tap')
const buildFastify = require('..') // Import the Express app

// Test GET /api/properties/:id route
tap.test('GET /api/properties/:id', async (t) => {
  const app = await buildFastify()

  t.teardown(() => {
    app.close()
  })

  const res = await app.inject({
    method: 'GET',
    url: '/api/properties/1',
    headers: {
      'x-api-key': 'my-secret-key'
    }
  })

  const resObj = await res.json()

  t.equal(res.statusCode, 200, 'Status code should be 200')
  t.same(resObj, { id: '1', name: 'Sample Property', address: '123 Main St' }, 'Response should match expected value')
})

// Test POST /api/properties route
tap.test('POST /api/properties', async (t) => {
  const app = await buildFastify()
  t.teardown(() => {
    app.close()
  })

  const newProperty = { name: 'New Property', address: '456 Second St' }

  const res = await app.inject({
    method: 'POST',
    url: '/api/properties',
    headers: {
      'x-api-key': 'my-secret-key'
    },
    payload: newProperty
  })

  const resObj = await res.json()

  t.equal(res.statusCode, 201, 'Status code should be 201')
  t.match(resObj, { id: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, ...newProperty }, 'Response should match expected value')
})

// Test PATCH /api/properties/:id route
tap.test('PATCH /api/properties/:id', async (t) => {
  const app = await buildFastify()
  t.teardown(() => {
    app.close()
  })

  const newProperty = { name: 'New Property', address: '456 Second St' }
  const resPost = await app.inject({
    method: 'POST',
    url: '/api/properties',
    headers: {
      'x-api-key': 'my-secret-key'
    },
    payload: newProperty
  })

  const resPostObj = await resPost.json()

  const updatedProperty = { name: 'Updated Property', address: '789 Third St' }
  const res = await app.inject({
    method: 'PATCH',
    url: `/api/properties/${resPostObj.id}`,
    headers: {
      'x-api-key': 'my-secret-key'
    },
    payload: updatedProperty
  })

  const resObj = await res.json()

  t.equal(res.statusCode, 200, 'Status code should be 200')
  t.same(resObj, { id: resPostObj.id, ...updatedProperty }, 'Response should match expected value')
})
