'use strict'
/**
 * @description Add only basic controller test
 * TODO Test branches
 */

const { test } = require('tap')
const { stub } = require('sinon')
const superagent = require('superagent')

const performanceController = require('../../controllers/performance')

test('Performance Controller', async (t) => {
  const queryStub = stub().resolves({ body: 'Test' })
  const superStub = stub(superagent, 'get').returns({
    query: queryStub
  })
  const history = {
    '2019-06-21': { 'open': '100', 'close': '200', 'high': '200.85', 'low': '198.15', 'volume': '47800589' },
    '2019-06-22': { 'open': '200', 'close': '150', 'high': '200.85', 'low': '198.15', 'volume': '47800589' }
  }

  t.test('Initial Allocation should set divide the initial balance', (t) => {
    const result = performanceController.getInitialAllocation({
      initialBalance: 100,
      allocation: [{
        symbol: 'a',
        percentage: 0.5
      }, {
        symbol: 'b',
        percentage: 0.4
      }]
    })

    t.deepEqual(result, {
      a: 50,
      b: 40,
      rest: 10
    })

    t.end()
  })

  await t.test('Fetch Stock Histroy shuld query wtd API', async () => {
    queryStub.reset()
    queryStub.resolves({ body: 'Test' })
    const result = await performanceController.fetchStockHistroy({ symbol: 'test', dateFrom: '123' })
    const args = queryStub.getCall(0).args[0]

    t.equal(args.date_from, '123')
    t.equal(args.symbol, 'test')
    t.equal(result, 'Test')
  })

  t.test('calculate stock performance should return a history of values', (t) => {
    const result = performanceController.calculateStockPerformance(history, 100)

    t.deepEqual(result, [{
      date: '2019-06-21',
      value: 200
    }, {
      date: '2019-06-22',
      value: 150
    }])

    t.end()
  })

  await t.test('Calculate should get return the performance for a list of stocks', async (t) => {
    queryStub.reset()
    queryStub.resolves({
      body: {
        name: 'test',
        history
      }
    })

    const result = await performanceController.calculate({ dateFrom: '2019-06-21', initialBalance: 100, allocation: [{ symbol: 'test', percentage: 1 }] })

    t.deepEqual(result, [{
      name: 'test',
      performance: [{
        date: '2019-06-21',
        value: 200
      }, {
        date: '2019-06-22',
        value: 150
      }]
    }])
  })

  superStub.restore()
})
