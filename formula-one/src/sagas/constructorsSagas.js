import { call, put } from 'redux-saga/effects';

import constructorsActions from '../redux/constructorsRedux';

const getConstructors = function* (api) {
  const response = yield call(api.getConstructors);

  if (response.ok) {
    const constructorsArray = response.data.MRData.ConstructorTable.Constructors;

    yield put(constructorsActions.constructorsSuccess(constructorsArray));
  } else {
    yield put(constructorsActions.constructorsFailure());
  }
};

// export default JUST if there is one export,
// if there are 2 exports, delete the next line
export default getConstructors;
export {
  getConstructors,
};
