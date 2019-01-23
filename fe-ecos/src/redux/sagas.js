import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import statusSagas from './master-data/status/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    statusSagas(),
  ]);
}
