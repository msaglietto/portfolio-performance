import React from 'react';

import './Form.css';

const Form  = ({ onChange, dateFrom, initialBalance, allocation }) =>
  <div>
    <div className="Form-container">
      <div className="form-field">
        <label>Start Date</label>
        <input type="date" />
      </div>
      <div className="form-field">
        <label>Initial Balance:</label>
        <input type="number" placeholder="Initial investment" />
        <span className="hint">in USD</span>
      </div>
    </div>
    <div className="Form-container">
      <fieldset>
        <legend>Portfolio Allocation:</legend>
        <div className="form-field">
          <input type="text" placeholder="Stock Symbol" />
          <input type="number" placeholder="Percentage" />
        </div>
        <input className="btn" type="button" value="More" />
      </fieldset>
    </div>
    <input className="btn" type="button" value="Send" />
  </div>

export default Form;
