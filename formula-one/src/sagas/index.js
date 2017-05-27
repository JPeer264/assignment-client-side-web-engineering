import { takeLatest } from 'redux-saga';

import api from '../services/api';

// Types
import { constructorsTypes } from '../redux/constructorsRedux';
import { driversTypes } from '../redux/driversRedux';

// Sagas
import { getConstructors } from './constructorsSagas';
import { getDriversByConstructorId } from './driversSagas';

const useApi = api();

export default function* root() {
  yield [
    takeLatest(constructorsTypes.CONSTRUCTORS_REQUEST, getConstructors, useApi),
    takeLatest(driversTypes.DRIVERS_REQUEST, getDriversByConstructorId, useApi),
  ];
}
