import { takeLatest } from 'redux-saga';

import api from '../services/api';

// Types
import { constructorsTypes } from '../redux/constructorsRedux';

// Sagas
import { getConstructors } from './constructorsSagas';

const useApi = api();

export default function* root() {
  yield [
    takeLatest(constructorsTypes.CONSTRUCTORS_REQUEST, getConstructors, useApi),
  ];
}
