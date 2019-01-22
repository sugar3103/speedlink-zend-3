import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import statusSaga from './master-data/status/saga';
import addressSaga from './master-data/address/saga';
import hubSaga from './master-data/hub/saga';
import branchSaga from './master-data/branch/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    statusSaga(),
    addressSaga(),
    hubSaga(),
    branchSaga(),
  ]);
}
