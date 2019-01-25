import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import statusSagas from './master-data/status/saga';
import codeSagas from './master-data/address/code/saga';
import countrySagas from './master-data/address/country/saga';
import userSagas from './users/user/saga';
import roleSagas from './users/role/saga';
import permissionSagas from './users/permission/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    statusSagas(),
    codeSagas(),
    countrySagas(),
    userSagas(),
    roleSagas(),
    permissionSagas()
  ]);
}
