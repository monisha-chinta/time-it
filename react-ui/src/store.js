import { applyMiddleware, createStore, compose } from 'redux';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import reducer from './reducers';

const logger = createLogger();

export default createStore(reducer, compose(
  applyMiddleware(promise, thunk, logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
