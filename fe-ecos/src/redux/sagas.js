import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import statusSagas from './master-data/status/saga';
import userSagas from './user/saga';
import roleSagas from './role/saga';
import permissonSagas from './permisson/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    statusSagas(),
    userSagas(),
    roleSagas(),
    permissonSagas()
  ]);
}
