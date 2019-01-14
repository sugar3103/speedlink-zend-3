import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import statusSaga from './master-data/status/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    statusSaga(),
  ]);
}
