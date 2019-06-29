# Portfolio Performance App

Here lies a simple demo app to calculate the performance of your investment portfolio.

You can enter the state of your assets portfolio at some day in the past and see how much money would be worth today.

**Example:**

- Start Date: 2013-03-20
- Initial Balance: $32500
- Portfolio Allocation:
  - AAPL: 20%
  - GOOG: 50%
  - VTI: 30%

It obtain the historical returns from the free API https://www.worldtradingdata.com/

## Tech

You have a node-backend made with [fastify-cli](https://github.com/fastify/fastify-cli)

And a react-frontend made with [create-react-app](https://github.com/facebook/create-react-app)

You may wonder why everything separated on different folders? well I intend to add other technologies and I want them all side by side so I can compare them.

## Not ready for prime time so be gentle 

Error handling and validation have been omitted for brevity sake 

** Check it out at https://portfolio-performanxe.herokuapp.com/ **
