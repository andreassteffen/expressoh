import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart';
import './index.css';

injectTapEventPlugin();

ReactDOM.render(
  <Chart />,
  document.getElementById('root')
);
