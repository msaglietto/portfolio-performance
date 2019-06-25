<h1 align="center">Welcome to Porfolio Performance Node Server 👋</h1>
<p>
  <a href="https://choosealicense.com/licenses/mit/">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> Small API that will calculate the value of a porfolio today given a date and initial balance

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

### Endpoints

`POST /api/calculate`

**body**

|Field                       | Type   |Description                                                            |
|----------------------------|--------|-----------------------------------------------------------------------|
| dateFrom                   | Date   | Day when you would have bought the stocks. Formate: 'YYYY-MM-DD'      |
| initialBalance             | Number | Balance you would have to buy stocks at the date from period on USD   |
| allocation                 | Array  | Portfolio distribution of the initial balance                         |
| allocation[item]           | Object |                                                                       |
| allocation[item].symbol    | String | Value of the stock, index or mutual fund you wish to return data for  |
| allocation[item].percentage| Number | Propotion of the intial balance for this stock. Value from 0 - 1      |


## Run tests

```sh
npm run test
```

## Author

👤 **Mauricio Saglietto**

* Github: [@msaglietto](https://github.com/msaglietto)

## 📝 License

Copyright © 2019 [Mauricio Saglietto](https://github.com/msaglietto).<br />
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
