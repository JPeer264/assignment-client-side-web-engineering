import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas/';

const constructorsReducer = require('./constructorsRedux').reducer;

export default () => {
  const rootReducer = combineReducers({
    constructorsStore: constructorsReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
