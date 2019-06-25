import React from 'react';

import './Form.css';

const AllocationForm = ({ symbol, percentage, onChange }) =>
  <div className="form-field">
    <input type="text" placeholder="Stock Symbol" value={symbol} onChange={onChange('symbol')} />
    <input
      type="number"
      placeholder="Percentage"
      min={1}
      max={100}
      value={percentage}
      onChange={onChange('percentage')}
    />
  </div>

const Form  = ({ onChange, dateFrom, initialBalance, allocation, onAddAllocation, onSend }) => {
  const overAllocated = allocation.reduce((t, a) => t + parseFloat(a.percentage), 0) > 100;

  return (
    <div>
      <div className="Form-container">
        <div className="form-field">
          <label>Start Date</label>
          <input type="date" value={dateFrom} onChange={onChange('dateFrom')} />
        </div>
        <div className="form-field">
          <label>Initial Balance:</label>
          <input
            type="number"
            placeholder="Initial investment"
            value={initialBalance}
            onChange={onChange('initialBalance')}
            min={1}
          />
          <span className="hint">in USD</span>
        </div>
      </div>
      <div className="Form-container">
        <fieldset>
          <legend>Portfolio Allocation:</legend>

          {overAllocated && <p className="error">Wait a minute you are allocating more than 100%!</p>}

          {allocation.map((stock, idx) =>
            <AllocationForm key={idx} data={stock} onChange={(field) => (evt) => {
              onChange('allocation')([
                ...allocation.slice(0, idx),
                Object.assign({}, allocation[idx], {[field]: evt.target.value}),
                ...allocation.slice(idx + 1)
              ])
            }} />
          )}

          <input
            type="button"
            value="More"
            className="btn"
            onClick={onAddAllocation}
            disabled={overAllocated}
          />
        </fieldset>
      </div>
      <div className="Form-actions">
        <input className="btn" type="button" value="Send" disabled={overAllocated} onClick={onSend} />
      </div>
    </div>
  )
}


export default Form;
