import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas/';

const constructorsReducer = require('./constructorsRedux').reducer;
const driversReducer = require('./driversRedux').reducer;

export default () => {
  const rootReducer = combineReducers({
    constructorsStore: constructorsReducer,
    driversStore: driversReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
