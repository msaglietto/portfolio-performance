'use strict'

const { test, beforeEach, afterEach } = require('tap')
const { stub } = require('sinon')

const { build } = require('../helper')
const performanceController = require('../../controllers/performance')

beforeEach((done) => {
  const perfStub = stub(performanceController, 'calculate')
  perfStub.resolves('Test')
  done()
})

afterEach((done) => {
  performanceController.calculate.restore()
  done()
})

test('calculate route calls calculate controller', async (t) => {
  const app = build(t)

  const body = {
    dateFrom: '10/10/2010',
    initialBalance: 10,
    allocation: [{
      symbol: 'Test',
      percentage: 1
    }]
  }
  const res = await app.inject({
    url: '/api/calculate',
    method: 'post',
    body
  })

  t.equal(res.payload, 'Test')
  t.equal(performanceController.calculate.calledWith(body), true)
})

test('calculate route should validate body', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/api/calculate',
    method: 'post',
    body: { }
  })

  t.deepEqual(JSON.parse(res.payload), {
    'statusCode': 400,
    'error': 'Bad Request',
    'message': "body should have required property 'dateFrom', body should have required property 'initialBalance', body should have required property 'allocation'"
  })
})
