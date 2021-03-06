import { call, put } from 'redux-saga/effects';

import driversActions from '../redux/driversRedux';

const getDriversByConstructorId = function* (api, action) {
  const { constructorId } = action;

  const response = !constructorId
    ? { ok: false }
    : yield call(api.getDriversByConstructorId, constructorId);

  if (response.ok) {
    const driversArray = response.data.MRData.DriverTable.Drivers;

    yield put(driversActions.driversSuccess(driversArray));
  } else {
    yield constructorId === null
      ? put(driversActions.driversFlush())
      : put(driversActions.driversFailure());
  }
};

export {
  // eslint-disable-next-line
  getDriversByConstructorId,
};
