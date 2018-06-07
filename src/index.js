import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import store, { history } from './store';
import './app.global.css';
import registerServiceWorker from './registerServiceWorker';

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);

registerServiceWorker();
