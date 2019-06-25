import React from 'react';

import Form from './Form';
import Results from './Results';

class PortfolioPerformance extends React.Component {
 state = {
   dateFrom: '',
   initialBalance: 100,
   allocation: [{
     symbol: '',
     percentage: 100,
   }],
   errors: {
     overAllocated: false,
   },
   results: [],
 };

 handleFormFieldChange = (field) => (evt) => {
   const newValue = evt.target ? evt.target.value : evt;
   this.setState({ [field]: newValue });
 }

 handleAddAllocation = () => {
  const newAllocation = this.state.allocation.reduce((acc, stock) => {
    acc.percentage -= parseFloat(stock.percentage);
    return acc;
  }, { symbol: '', percentage: 100 });

  if (newAllocation.percentage < 0) {
    this.setState({ errors: { ...this.state.errors, overAllocated: true } });
  } else {
    this.setState({ allocation: [...this.state.allocation, newAllocation]});
  }
 }

 handleSend = () => {
  const { dateFrom, initialBalance, allocation } = this.state;

  fetch('/api/calculate', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dateFrom,
      initialBalance,
      allocation: allocation
        .filter((a) => a.symbol !== '')
        .map(a => ({...a, percentage: a.percentage / 100 }))
    }),
  })
  .then(response => response.json())
  .then((results) => {
    this.setState({ results });
  });
 }

 render() {
   const { dateFrom, initialBalance, allocation, errors, results } = this.state;

   return (
     <div>
       <Form
        dateFrom={dateFrom}
        initialBalance={initialBalance}
        allocation={allocation}
        overAllocated={errors.overAllocated}
        onChange={this.handleFormFieldChange}
        onAddAllocation={this.handleAddAllocation}
        onSend={this.handleSend}
       />
       {results && !!results.length && <Results data={results} />}
     </div>
   );
 }
}

export default PortfolioPerformance;