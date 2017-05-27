import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  driversRequest: ['constructorId'],
  driversSuccess: ['drivers'],
  driversFailure: [],
  driversFlush: [],
});

export const driversTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  drivers: [],
  isFetching: false,
  isFailure: false,
});

/* ------------- Reducers ------------- */

export const request = state => state.merge({
  isFetching: true,
});

export const success = (state, { drivers }) => state.merge({
  drivers,
  isFetching: false,
  isFailure: false,
});

export const failure = state => state.merge({
  isFetching: false,
  isFailure: true,
});

export const flush = state => state.merge(INITIAL_STATE);


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DRIVERS_REQUEST]: request,
  [Types.DRIVERS_SUCCESS]: success,
  [Types.DRIVERS_FAILURE]: failure,
  [Types.DRIVERS_FLUSH]: flush,
});
