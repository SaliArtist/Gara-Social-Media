import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { masterReducer } from '../reducers/masterReducer';

export const store = createStore(
  masterReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);
