import React from 'react';

import PortfolioPerformance from './PortfolioPerformance';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Portfolio Performance</h1>
        <p>
          Do you ever wonder how much would you have made if you invested in
          thoese stocks that you where thinking of?
          <br /><br />
          Well if you like to dwell on the past this is the tool for you.
          <br /><br />
          Just input the amount you would have invested, the date and how would
          you divide the balance between thoese stocks and we will show you how
          much you missed or how lucky you were that you didnt do it.
        </p>
      </header>
      <PortfolioPerformance />
    </div>
  );
}

export default App;
