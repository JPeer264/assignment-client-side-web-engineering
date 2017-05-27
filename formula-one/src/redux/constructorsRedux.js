import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  constructorsRequest: [],
  constructorsSuccess: ['constructors'],
  constructorsFailure: [],
  constructorsSetSelectedConstructors: ['selectedConstructors'],
});

export const constructorsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  constructors: [],
  selectedConstructors: [],
  isFetching: false,
  isFailure: false,
});

/* ------------- Reducers ------------- */

export const request = state => state.merge({
  isFetching: true,
});

export const success = (state, { constructors }) => state.merge({
  constructors,
  isFetching: false,
  isFailure: false,
});

export const failure = state => state.merge({
  isFetching: false,
  isFailure: true,
});

export const setSelectedConstructors = (state, { selectedConstructors }) => state.merge({
  selectedConstructors,
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONSTRUCTORS_REQUEST]: request,
  [Types.CONSTRUCTORS_SUCCESS]: success,
  [Types.CONSTRUCTORS_FAILURE]: failure,
  [Types.CONSTRUCTORS_SET_SELECTED_CONSTRUCTORS]: setSelectedConstructors,
});
