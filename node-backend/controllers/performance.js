const superagent = require('superagent')

const API_DATA = {
  base: 'https://api.worldtradingdata.com/api/v1/history',
  query: {
    symbol: 'TEST',
    sort: 'oldest',
    api_token: process.env.WTD_API_TOKEN || 'demo',
    date_from: '',
    date_to: '',
    output: 'json',
    formatted: true
  }
}

const fetchStockHistroy = ({ symbol, dateFrom }) => superagent
  .get(API_DATA.base)
  .query({ ...API_DATA.query, symbol, date_from: dateFrom })
  .then(res => res.body)

const getInitialAllocation = ({ initialBalance, allocation }) => allocation.reduce((acc, stock) => {
  acc[stock.symbol] = stock.percentage * initialBalance
  acc.rest -= acc[stock.symbol]
  return acc
}, { rest: initialBalance })

/**
 * Given the history of a stock it will calculate how many shares you can buy
 * with the initialBalance on the open of the first day of stocks
 * Then it will calculate for each day how much your balance is with that
 * amount of stocks on the close of the day
 *
 * @param {Array} histroy
 * @param {Number} initialBalance
 *
 * @returns {Array} List of value of a stock per day
 */
const calculateStockPerformance = (history, initialBalance) => {
  let shares = 0
  return Object.entries(history).map(([key, value], idx) => {
    // Right now is relaying on the ordering of map but this is not reliable
    if (idx === 0) {
      shares = initialBalance / parseFloat(value.open)
    }
    return { date: key, value: shares * parseFloat(value.close) }
  })
}

const calculate = async ({ dateFrom, initialBalance, allocation = [] }) => {
  const initialAllocation = getInitialAllocation({ initialBalance, allocation })
  const stockHistory = await Promise.all(allocation.map(stock => fetchStockHistroy({ symbol: stock.symbol, dateFrom })))

  const performance = stockHistory.map(stock => {
    return {
      name: stock.name,
      performance: calculateStockPerformance(stock.history, initialAllocation[stock.name])
    }
  })

  return performance
}

module.exports = {
  fetchStockHistroy,
  getInitialAllocation,
  calculateStockPerformance,
  calculate
}
