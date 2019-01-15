import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import statusSaga from './master-data/status/saga';
import addressSaga from './master-data/address/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    statusSaga(),
    addressSaga(),
  ]);
}
