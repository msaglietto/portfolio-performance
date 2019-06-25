import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';

describe('Form', () => {
  const defaultProps = {
    dateFrom: '2019-04-02',
    initialBalance: 100,
    allocations: [],
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Form {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});


