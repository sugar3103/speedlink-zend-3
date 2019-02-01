import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import statusSagas from './master-data/status/saga';
import hubSagas from './master-data/hub/saga';
import branchSagas from './master-data/branch/saga';
import codeSagas from './master-data/address/code/saga';
import countrySagas from './master-data/address/country/saga';
import citySagas from './master-data/address/city/saga';
import districtSagas from './master-data/address/district/saga';
import wardSagas from './master-data/address/ward/saga';
import carrierSagas from './master-data/service-shipment/carrier/saga';
import userSagas from './system/users/user/saga'
import roleSagas from './system/users/role/saga';
import permissionSagas from './system/users/permission/saga';
import settingSagas from './system/setting/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    statusSagas(),
    hubSagas(),
    branchSagas(),
    codeSagas(),
    countrySagas(),
    citySagas(),
    districtSagas(),
    wardSagas(),
    userSagas(),
    roleSagas(),
    permissionSagas(),
    carrierSagas(),
    settingSagas()
  ]);
}
