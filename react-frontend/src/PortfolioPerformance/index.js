import React from 'react';

import Form from './Form';

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

 }

 render() {
   const { dateFrom, initialBalance, allocation, errors } = this.state;

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
     </div>
   );
 }
}

export default PortfolioPerformance;