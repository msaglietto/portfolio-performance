'use strict'

const performanceController = require('../../controllers/performance')

const schema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['dateFrom', 'initialBalance', 'allocation'],
    properties: {
      dateFrom: {
        type: 'string',
        formate: 'date'
      },
      initialBalance: { type: 'number' },
      allocation: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            symbol: { type: 'string' },
            percentage: {
              type: 'number',
              minimum: 0,
              maxiimum: 1
            }
          }
        }
      }
    }
  },

  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          performance: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                date: { type: 'string' },
                value: { type: 'number' }
              }
            }
          }
        }
      }
    }
  }
}

module.exports = async function (fastify, opts) {
  fastify.post('/api/calculate', { schema }, async function (request, reply) {
    return performanceController.calculate(request.body)
  })
}
