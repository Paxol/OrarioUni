import dataReducer from './data';

import { createStore, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk'; 

export const store = createStore(dataReducer, applyMiddleware(ReduxThunk))